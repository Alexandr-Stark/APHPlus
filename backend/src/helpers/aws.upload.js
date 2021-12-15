const fs = require('fs');
require('dotenv').config;
const s3 = require('../configuration/awsConfig');

async function uploadFile(filePath) {

    const fileContent = await fs.readFileSync(filePath);

    const params = {
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: filePath.slice(filePath.lastIndexOf('/') + 1),
        Body: fileContent
    };
    
    s3.upload(params, function(err, data) {
        if (err) throw err;
        console.log(`File uploaded successfully. *****${data}***** ${data.Location}`);
    });

}

module.exports = uploadFile;