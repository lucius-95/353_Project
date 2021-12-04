const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require("custom-env").env("dev");

// aws.config.update({
//     secretAccessKey: "eUzpLEBSbWFkqStxANSY+vGrSyuQ4SgO/BK6fTac",
//     accessKeyId: "AKIA3FUZUOTRNN6KKTVE",
//     region: 'ca-central-1'
// });

const s3 = new aws.S3({
    secretAccessKey: "eUzpLEBSbWFkqStxANSY+vGrSyuQ4SgO/BK6fTac",
    accessKeyId: "AKIA3FUZUOTRNN6KKTVE",
    region: 'ca-central-1'
});

s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
};

const upload = multer({
    fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'cmpt353bucket',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function(req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

module.exports = upload;