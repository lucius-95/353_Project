/* eslint-disable consistent-return */
// Router
const router = require('express').Router();

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
// model from moongodb
const Users = require('../../model/user');

// validate register input
const validateRegisterInputs = require('../../validation/register');
const validateLoginInputs = require('../../validation/login');

/**
 *  Post Request to register a new User
 *  Path: v1/api/user/register
 */
router.post('/register', (req, res, next) => {
  const { errors, isValid } = validateRegisterInputs(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Users.find({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        errors.email = 'Email exist';
        return res.status(409).json({ error: errors });
      }

      // hashsing password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const defaultAvatar =
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqlaxdI3EIEf2voJ56Ut0G_M9pXJhUYgQXQaKLMzL5yJ81cbUt';
        new Users({
          _id: mongoose.Types.ObjectId(),
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          date: req.body.date,
          avatar: defaultAvatar,
          password: hash,
          company: null
        })
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json({
              message: 'User Created',
              request: {
                type: 'POST',
                info: result,
              },
            });
          })
          .catch((er) => {
            console.log(er);
            res.status(500).json({
              error: er,
            });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
/**
 *  POST request to login user
 *  Path: v1/api/user/login
 */
router.post('/login', (req, res, next) => {
  const { errors, isValid } = validateLoginInputs(req.body);
  if (!isValid) {
    return res.status(409).json(errors);
  }
  Users.find({ email: req.body.email })
    .exec()
    .then((user) => {
      // check if user is already in database or not. return errors with status 401 if not found
      if (user.length < 1) {
        errors.email = ' User not found';
        return res.status(401).json(errors);
      }
      bcrypt.compare(req.body.password, user[0].password, (err, flag) => {
        if (err) {
          return res.status(500).json({
            message: ' Auth fail',
          });
        }
        if (flag) {
          const payload = {
            email: user[0].email,
            userId: user[0]._id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            avatar: user[0].avatar,
            company: user[0].company,
            requesting: user[0].requesting
          };
          const token = jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: 3600,
          });
          return res.status(200).json({
            message: 'auth success!',
            token: 'Bearer ' + token,
          });
        }
        errors.password = 'password is incorrect';
        return res.status(400).json(errors);
      });

      console.log(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
/**
 *  GET request to get current user
 */
router.get('/current', (req, res) => {
  // TODO
  res.json({
    id: 'checking',
  });
});

module.exports = router;
