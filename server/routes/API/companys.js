// create company
// private
// Router
const router = require('express').Router();

const isEmpty = require('../../validation/isempty');
// model from mongoose
const Company = require('../../model/company');

const User = require('../../model/user');

const Profile = require('../../model/profile');

const Request = require('../../model/request');

const passport = require('passport');

const validateCompanyInputs = require('../../validation/company');

const validateCurrencyInputs = require('../../validation/currency');

const mongoose = require('mongoose');

/**
 * REST API to create a company
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyInputs(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let companyFields= {}
    companyFields.owner = req.user[0].id;
    companyFields.name = req.body.name;
    if (req.body.description) companyFields.description = req.body.description;
    Company.findOne({owner: req.user[0].id}).then(result =>{
        if(result){
            Company.findOneAndUpdate(
                {owner: req.user[0].id},
                { $set: companyFields },
                { new: true }
            ).then(company=> res.status(200).json(company))
        }else{
            // create new company
                new Company({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    owner: req.user[0].id,
                    description: req.body.description,
                    staff : {user: req.user[0].id}
                })
                .save()
                .then((result) => {
                    // Update user with new company
                    User.findOneAndUpdate(
                        {email: req.user[0].email},
                        {company:result._id},
                        {new: true}
                    ).then(user => console.log(user))
                    // console.log(result)
                    // console.log(req.user[0])

                    // Update profile with new company
                    Profile.findOne(
                        {user: req.user[0].id}
                    ).then(profile =>{
                        const comp = {
                            company : result
                        }
                        profile.companies.unshift(comp)
                        profile.save().then(result =>res.status(200).json(result))
                    }).catch(err => res.status(404).json(err))

                }).catch(err => { res.status(404).json(err)})


            }
        })
  }
);
/**
 * Rest API to get a company invoke by getCurrentCompany (for onwer only)
 */
router.get('/',passport.authenticate('jwt', { session: false }),
    (req, res) => {
  Company.findOne({owner: req.user[0].id})
    .then((company) => res.json(company))
    .catch((err) =>
      res.status(404).json({ nocompanyfound: 'No company found ' })
    );
});


/**
 * Rest API to get a company invoke by getCurrentCompanyByStaff (for staffs only)
 */
router.get('/staff',passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {}
        // check if user is a staff
        // find company by auth user
        if (isEmpty(req.user[0].company.id)){
            errors.company = "User is not a current staff"
            return res.status(400).json(errors)
        }
        else
        {
            Company.findOne({id: req.user[0].company.id})
                .populate({
                    path:'staff.user',
                    model: 'User'
                })
                .then((company) => res.json(company))
                .catch((err) =>{
                        errors.err = err
                        res.status(404).json(errors)
                    }
                );
        }
    });

router.get('/all',
    (req, res) => {
        Company
            .find()
            .then((company) => res.json(company))
            .catch((err) =>
                res.status(404).json({ nocompanyfound: 'No company found ' })
            );
    });



/**
 * rest API to get company by id
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Company.findById(req.params.id)
    .then((company) =>
      res.json(company)
    )
    .catch((err) =>
      res.status(404).json({
        nocompanyfound: `No company found with that + ${id}`,
      })
    );
});

/**
 * Rest API to delete company
 */

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
      Company.findOne({owner: req.user[0].id})
          .populate({
              path:'requests._id',
              model: 'Request'
          })
        .then((company) => {
            company.staff
                .map(item => {
                    User.findOneAndUpdate({_id: item.user},{"$set":{"company": null}})
                        .exec((err,success)=>{
                            if(err) {
                                return res.status(400).json(err)
                            }
                            else{
                                // console.log(success)
                            }

                        })
                })
            company.requests
                .map(item => {
                    console.log(item)
                    User.findOneAndUpdate(
                        {_id: item._id.user},
                        {requesting: []},
                        {new: true}).then(user=>console.log("user is: "+user))

                })
          company.remove().then(() => res.status(204).json({ success: true }));
        }).catch(err=>{res.status(404).json(err)})
  }
);

/**
 * REST API to get staffs and customer data from staff
 */


// manage company by owner

router.put('/:id',passport.authenticate('jwt', { session: false }), function(req, res) {
    const errors = {}
    const id = req.params.id
    const user = req.user[0]
    Company
        .findById({_id: user.company})
        .then(company=>{
            // get remove index
            const removeIndex = company.staff
                .map(item => item.user.toString())
                .indexOf(id);
            User.findOneAndUpdate(
                {_id: id},
                {"company": null},
                {new: true}
            ).then(result => console.log(result))

            // splice comment out of array
            company.staff.splice(removeIndex, 1);
            company.save().then(result => res.json(result))
        })
        .catch(err =>{
            errors.removeerrors = err
            return res.status(400).json(errors)
        })


});


/**
 * Rest API to get a company invoke by getCurrentCompanyByStaff (for staffs only)
 */
router.post('/donate',passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { amount,companyId } = req.body
        const { errors, isValid } = validateCurrencyInputs(amount);
        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }
        console.log(amount,companyId)
        // check if user is a staff
        // find company by auth user
        Company.findById({_id: companyId})
            .populate({
                path:'donation.user',
                model: 'User'
            })
            .then((company) =>{
                    company.donation.unshift(
                        {user:req.user[0]._id,
                                firstname: req.user[0].firstname,
                                lastname: req.user[0].lastname,
                                amount: amount })
                    console.log(company)
                    company.save()
                    return res.json(company)
            })
            .catch((err) =>{
                    errors.err = err
                    return res.status(400).json(errors)
                }
            );
        })



/**
 * REST API to accept customer
 */

module.exports = router;
