/* eslint-disable consistent-return */
// Router
const router = require('express').Router();

// model from moongodb
const Users = require('../../model/user');

const Book = require('../../model/book');

const validateBookInputs = require('../../validation/book');

const multer = require('multer');
const isEmpty = require('../../validation/isempty');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, true);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post(
  '/',
  // passport.authenticate('jwt', { session: false }),
  upload.single('productImage'),
  (req, res, next) => {
    console.log(req.file);
    const { errors, isValid } = validateBookInputs(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const bookFields = {};
    // bookFields.donor = req.user[0].id;

    if (req.body.author) bookFields.author = req.body.author;
    bookFields.name = req.body.name;
    bookFields.bookImage = req.file.path;
    new Book(bookFields)
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: 'created book successfully',
          createdProduct: {
            name: result.name,
            price: result.author,
            _id: result._id,
            productImage: result.productImage,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/v1/book/' + result._id,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  }
);

module.exports = router;
