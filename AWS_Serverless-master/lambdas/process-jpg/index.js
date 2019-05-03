const AWS = require('aws-sdk');
//process.env.Author

exports.handler = (event, context, callback) => {
    
  console.log("Got event : " + JSON.stringify(event));
  console.log("Env variable author : " + process.env.Author);

  var bucket = event.result.bucket;
  var key = event.result.key;
  console.log("Starting processing jpg bucket " + bucket + " key : " + key);
  //do processing here
  console.log("Ending processing of jpg");
  callback(null, "Jpg processing finished");

};