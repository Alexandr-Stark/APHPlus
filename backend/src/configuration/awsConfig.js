const AWS = require('aws-sdk');
// const fs = require('fs');
require('dotenv').config;

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACES_ENDPOINT);
const s3 = new AWS.S3({endpoint: spacesEndpoint, accessKeyId: process.env.DO_SPACES_KEY, secretAccessKey: process.env.DO_SPACES_SECRET, region: 'fra1'});

// const file = fs.readFileSync("D:/Photo/SPNWH.jpg");
// s3.putObject({Bucket: process.env.DO_SPACES_NAME, Key: "SPNWH.jpg", Body: file, ACL: "public"}, (err, data) => {
// if (err) return console.log(err);
// console.log("Your file has been uploaded successfully!", data);
// });

module.exports = s3;
