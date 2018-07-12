# Portable Serverless App

An example of portable [serverless](https://aws.amazon.com/serverless/) app that can run on multiple platforms.

The core business logic (a simple "Hello World" application in this case) is isolated from the adapters required for running on:
- [AWS Lambda](https://aws.amazon.com/lambda/), receiving API calls from [Amazon API Gateway](https://aws.amazon.com/api-gateway/)
- AWS Lambda, processing messages from a queue managed by [Amazon SQS](https://aws.amazon.com/sqs/)
- as a web app, locally or in a Docker [container](https://aws.amazon.com/containers/).

```
.
├── LICENSE                     <-- Apache License 2.0
├── README.md                   <-- This instructions file
├── src                         <-- Source code for the app
│   ├── Greetings.js            <-- "Hello World" business logic
│   ├── adapterAPI.js           <-- AWS Lambda handler for Amazon API Gateway
│   ├── adapterSQS.js           <-- AWS Lambda handler for Amazon SQS
│   ├── app.js                  <-- Express web app
│   ├── package.json            <-- NodeJS dependencies
│   └── test                    <-- Tests
│       ├── test_Greetings.js   <-- Testing business logic
│       ├── test_API.js         <-- Testing API Gateway adapter
│       ├── test_SQS.js         <-- Testing SQS adapter
│       └── test_app.js         <-- Testing web app
└── template.yaml               <-- SAM template
└── Dockerfile                  <-- To deploy web app in a container
```

Made with ❤️ by Danilo Poccia. Available on the [AWS Serverless Application Repository](https://aws.amazon.com/serverless).

## Local execution

To run the wep app locally:

```
cd src/
npm install
npm start
```

Try the local execution using the following URLs (assuming default port 3000):

- http://localhost:3000
- http://localhost:3000?name=Your%20Name

## Serverless deployment

Deploy using [AWS SAM](https://github.com/awslabs/serverless-application-model):

```
aws cloudformation package --s3-bucket <BUCKET> --s3-prefix <PREFIX> --template-file template.yaml --output-template-file packaged.yaml
aws cloudformation deploy --template-file packaged.yaml --stack-name PortableServerlessApp --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name PortableServerlessApp
```

The URL of the API is in the response of the describe-stack in Stacks -> Outputs. 

Try the plain URL or with a name adding at the end of the API Gateway endpoint `?name=Your%20Name`

## Container deployment

Build and run the container locally using the following commands:

```
docker build -t not-so-serverless .
docker run -p 33000:3000 -d not-so-serverless
```
Try the local container using the following URLs (assuming port 33000):

- http://localhost:33000
- http://localhost:33000?name=Your%20Name

## Testing

Some tests are focused on the business logic, other on the integration with AWS Lambda or other platforms. The separation of concerns between business logic and adapters improves the testability of the solution.

To run automated tests:

```
cd src/
npm test
```
