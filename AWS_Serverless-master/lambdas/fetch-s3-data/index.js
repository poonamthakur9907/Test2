const AWS = require('aws-sdk');
const s3 = new AWS.S3();
//process.env.Author

exports.handler = (event, context, callback) => {
    
    console.log("Got event : " + JSON.stringify(event));
    console.log("Env variable author : " + process.env.Author);

    var bucket = event.params.path.bucket;

    if(bucket == null) {
    
        const response = {
            statusCode: 500,
            body: JSON.stringify('Bucket name not provided!')
        };

        callback(null, response);
    }
    else {

        var params = {
            Bucket: bucket, 
            MaxKeys: 10
        };

        s3.listObjectsV2(params, function(err, data) {
            if(err) {
                const response = {
                    statusCode: 500,
                    body: JSON.stringify('Error getting data from S3!')
                };
        
                callback(null, response);
            } 
            else {
                console.log("Got data from S3: " + JSON.stringify(data));
                var contents = data.Contents;
                if(contents!= null && Array.isArray(contents) && contents.length > 0) {
                    var S3ObjectKeys = [];
                    contents.forEach(s3Object => {
                        //only get image files
                        if(s3Object.Key.endsWith(".png") || s3Object.Key.endsWith(".jpeg") || s3Object.Key.endsWith(".jpg") || s3Object.Key.endsWith(".gif"))
                        S3ObjectKeys.push(s3Object.Key); 
                    });
                    const response = {
                        statusCode: 200,
                        body: JSON.stringify(S3ObjectKeys)
                    };
            
                    callback(null, response); 
                }
                else {
                    const response = {
                        statusCode: 500,
                        body: JSON.stringify('No contents found in S3!')
                    };
            
                    callback(null, response);
                }
            }
        });
    }
};