const AWS = require('aws-sdk');
const s3 = new AWS.S3();
//process.env.Author

exports.handler = (event, context, callback) => {
    
    console.log("Got event : " + JSON.stringify(event));
    console.log("Env variable author : " + process.env.Author);

    var bucket = event.bucket_name;

    if(bucket == null) {
        
        const response = {
            statusCode: 500,
            body: JSON.stringify('Bucket name not provided!')
        };

        callback(null, response);
    }
    else {

        var queryParams = {
            Bucket: bucket, 
            MaxKeys: 10
        };

        s3.listObjectsV2(queryParams, function(err, data) {
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
                    var S3ObjectKeysToDelete = [];

                    var deleteParams = {
                        Bucket: bucket,
                        Delete: {
                            Objects: []
                        }
                    };

                    contents.forEach(s3Object => {
                        //only get image files
                        if(!(s3Object.Key.endsWith(".png") || s3Object.Key.endsWith(".jpeg") || s3Object.Key.endsWith(".jpg") || s3Object.Key.endsWith(".gif"))) {
                            S3ObjectKeysToDelete.push(s3Object.Key); 
                            deleteParams.Delete.Objects.push({
                                Key: s3Object.Key
                            });;
                        }
                            

                    });
                    
                    if(S3ObjectKeysToDelete.length > 0 ){
                        console.log("Delete Params : " + JSON.stringify(deleteParams));
                        s3.deleteObjects(deleteParams, function(err, data) {
                            if (err) {
                                console.log("Error occured deleting files from S3" + err);
                                const response = {
                                    statusCode: 500,
                                    body: JSON.stringify('Error deleting files from S3!')
                                };
                        
                                callback(null, response);
                            }
                            else {
                                console.log("Files successfully delete from S3. Response : " + JSON.stringify(data));           // successful response
                                const response = {
                                    statusCode: 200,
                                    body: JSON.stringify(S3ObjectKeysToDelete)
                                };
                                callback(null, response); 
                            }    
                        });
                    }
                    else {
                        console.log("No files to delete");           // successful response
                        const response = {
                            statusCode: 200,
                            body: "No files to delete"
                        };
                        callback(null, response);                        
                    }



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