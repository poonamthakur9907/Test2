# AWS Serverless Web application
This repository is the sample example that covers a complete web app built with AWS serverless architecture. If you wish to go through the summary of this take a look at [Building a web application using AWS serverless architecture](http://opensourceforgeeks.blogspot.com/2018/10/building-web-application-using-aws.html)

## AWS Services covered

* AWS Serverless 101(Building a web application): https://youtu.be/I5bW0Oi0tY4
* AWS Serverless 102(Understanding the UI code): https://youtu.be/dQJCr0r_RuM
* AWS Serverless 103(AWS Lambda): https://youtu.be/Kn86Lq29IMA
* AWS Serverless 104(API Gateway): https://youtu.be/yKI_UCYblio
* AWS Serverless 105(CI/CD with code pipeline): https://youtu.be/GEWrpZuBEkQ
* AWS Serverless 106(Cloudwatch Events): https://youtu.be/9gUB2n0hV7Q
* AWS Serverless 107(Step functions): https://youtu.be/rL6EqaMbC5U

## Directory Structure

```
├── buildspec_node.yml
├── lambdas
│   ├── clean-s3-data
│   │   ├── index.js
│   │   └── package.json
│   ├── eval-upload
│   │   ├── index.js
│   │   └── package.json
│   ├── fetch-s3-data
│   │   ├── index.js
│   │   └── package.json
│   ├── post-process-cleanup
│   │   ├── index.js
│   │   └── package.json
│   ├── process-gif
│   │   ├── index.js
│   │   └── package.json
│   ├── process-jpg
│   │   ├── index.js
│   │   └── package.json
│   ├── process-png
│   │   ├── index.js
│   │   └── package.json
│   └── start-step-func
│       ├── index.js
│       └── package.json
├── README.md
├── scripts
│   ├── cloudformation
│   │   ├── aws-serverless-cfn-parameter.json
│   │   └── samTemplate.yaml
│   └── node-lambdas.sh
├── step-functions
│   └── file-upload-processor.json
└── UI
    ├── ASSETS
    │   └── banner.png
    ├── CSS
    │   └── main.css
    ├── HTML
    │   └── index.html
    └── SCRIPTS
        └── main.js

```

UI directory contains all the UI code of the web application that is hosted on a static website in S3. Directory structure under UI is further divided as per it's contents. For example javascript files go under `SCRIPTS` folder. `buildspec_node.yml` file at the root directory is a configuration file provided to AWS code build project. This is used to build all our backend infrastructure. All the lambdas that form the backend of our web application lie inside `lambdas` directory. Each is a NPM module with `index.js` and `package.json` file. `scripts` folder contain all the scripts needed for CICD. `node-lambdas.sh` is a shell script file that is referenced by `buildspec_node.yml` for code build project. All scripts needed for cloud formation deployment go under `cloudformation` directory. `samTemplate.yaml` is the cloud formation template whereas `aws-serverless-cfn-parameter.json` contains the input placeholders that the SAM template references. This file would change for each user based on their AWS environment configurations. `step-functions` directory has the JSON file to create the state machine.

If you have any other questions please reach out to me at opensourceforgeeks@gmail.com.
