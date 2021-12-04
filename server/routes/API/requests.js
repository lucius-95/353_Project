const router = require('express').Router();

const passport = require('passport');
const isEmpty = require('../../validation/isempty')

const mongoose = require('mongoose');

const Company = require('../../model/company');
const User = require('../../model/user')

const Request = require('../../model/request')




router.post("/",
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const errors = {}
        if (req.user[0].requesting.length >= 1){
            errors.request = "you already sent a request"
            return res.status(400).json(errors)
        }
        const {staffRequest,customerRequest,company} = req.body
        // console.log(user,staffRequest,customerRequest,company)
        const request= new Request({
            staffRequest,customerRequest}
        )
        Company.findById((company._id))
            .populate({
                path:'staff.user',
                model: 'User'
            })
            .exec((err,foundCompany) =>{
                if (err) {
                    errors.noCompany = "Could not find Company"
                    return res.status(432).json(errors);
                }
                // check if user already in staff list. if not process. If it is return error
                if (foundCompany.staff.filter(anyStaff => anyStaff.user.id === req.user[0].id).length === 0) {
                    //if the user is not in staff list, can send request

                    // update request
                    // request.user = user._id
                    request.user = req.user[0]
                    request.firstname = req.user[0].firstname,
                    request.lastname = req.user[0].lastname,
                    request.avatar = req.user[0].avatar,
                    request.company = foundCompany

                    // push request into an array of request
                    foundCompany.requests.push(request)
                    console.log(foundCompany)
                    request.save(err =>{
                        if (err) {
                            errors.saveProblem = "cannot save request"
                            return res.json(errors)
                        }
                        console.log("working!!!")
                        // update and save company
                        foundCompany.save()
                        // update user
                        User.updateOne(
                            { _id: req.user[0].id },
                            { $push: { requesting: request } },(err) => {
                                errors.updateUser = "problem with update User"
                            return errors}
                        );
                        return res.json(request)
                    })
                }
                else{
                    // if the user is already in the staff list return error
                    errors.alreadystaff =  'User is already a staff this post'
                    return res.status(400).json(errors);
                }
            })


})



router.get('/',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const errors = {}
        if ((req.user[0].company === null )){
            errors.company = "User is not a current staff"
            return res.status(400).json(errors)
        }
        else {
            Company
                .findOne({id: req.user[0].company.id})
                .populate({
                    path:'requests._id',
                    model: 'Request'
                })
                .then(company => {
                        return res.status(200).json(company.requests)})
                .catch(err =>{
                errors.something = err
                return res.status(404).json(errors)
            })
        }
})



// API accept request from customer to be staff
router.post(
    '/acceptrequest/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const {id} = req.params
        Request
            .findById({_id: id})
            .then((foundRequest) =>{
                Company.findOne({_id: foundRequest.company},(err,company) =>{
                    if(err) {
                        return res.status(400).json(err)
                    }
                    const removeIndex = company.requests
                        .map(item => item._id.toString())
                        .indexOf(id);
                    // splice request out of array
                    const newUser = {user: foundRequest.user}
                    company.staff.unshift(newUser)
                    company.requests.splice(removeIndex, 1);
                    company.save().then(result =>console.log(result))
                    //update User
                    User.findOne(
                        {_id: foundRequest.user},(err,user)=>{
                            if(err){
                                return res.status(400).json(err)
                            }
                            user.company = company._id
                           // remove the request
                            user.requesting.splice(0, 1);
                            user.save().then(result => console.log(result))
                        }
                    )
                })
                // splice comment out of array
              
                res.json(foundRequest)
            })
            .catch(err => {return res.status(444).json(err)})

    })


// rest API call to deny request
router.post(
    '/denyrequest/:id',
    passport.authenticate('jwt', { session: false }),
    (req,res)=>{
        const {id} = req.params
        Request
            .findById({_id: id})
            .then((foundRequest) =>{
                Company.findOne({_id: foundRequest.company},(err,company) =>{
                    if(err) {
                        return res.status(400).json(err)
                    }
                    const removeIndex = company.requests
                        .map(item => item._id.toString())
                        .indexOf(id);
                    // splice request out of array
                    company.requests.splice(removeIndex, 1);
                    company.save().then(result =>console.log(result))
                    //update User
                    User.findOne(
                        {_id: foundRequest.user},(err,user)=>{
                            if(err){
                                return res.status(400).json(err)
                            }
                            // remove the request
                            user.requesting.splice(0, 1);
                            user.save().then(result => console.log(result))
                        }
                    )
                })
                res.json(foundRequest)
            })
            .catch(err => {return res.status(444).json(err)})

    })
module.exports = router;
