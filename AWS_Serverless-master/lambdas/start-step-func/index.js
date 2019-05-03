const AWS = require('aws-sdk');
const step_function = new AWS.StepFunctions();
//process.env.Author

exports.handler = (event, context, callback) => {
    
  console.log("Got event : " + JSON.stringify(event));
  console.log("Env variable author : " + process.env.Author);
  console.log("Env variable state machine ARN : " + process.env.STATE_MACHINE_ARN);
    

  // Get the object from the event and show its content type
  var bucket = event.Records[0].s3.bucket.name;
  var key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  console.log("bucket " + bucket + " key : " + key);

  var param = {};
  var input = {};
  input.srcBucket = bucket;
  input.srcKey = key;
  param.input = JSON.stringify(input);
  param.stateMachineArn = process.env.STATE_MACHINE_ARN;
  step_function.startExecution(param, function(err, data){
      if(err){
          console.log("Error starting step function - " + err);
      }
      else {
          console.log("Step function successfully started. Data - " + data);
      }
  });

};