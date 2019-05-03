const AWS = require('aws-sdk');

//process.env.Author

exports.handler = (event, context, callback) => {
    
  console.log("Got event : " + JSON.stringify(event));
  console.log("Env variable author : " + process.env.Author);

  console.log("Starting cleanup");
  //Do any cleanup needed
  console.log("Ending cleanup");

  callback(null, "Cleanup completed");

};