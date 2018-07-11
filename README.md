# Portable Serverless App

An example of portable serverless app that can run on multiple platforms.

The core business logic (a simple "Hello World" application in this case) is isolated from the adapters required for running on:
- AWS Lambda, receving API calls from Amazon API Gateway
- AWS Lambda, processing messages from a queue managed by Amazon SQS
- as a web app, locally or in a Docker container.

Made with ❤️ by Danilo Poccia. Available on the [AWS Serverless Application Repository](https://aws.amazon.com/serverless).

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

## Testing

Some tests are focused on the business logic, other on the intergation with AWS Lambda or other platforms.

To run automated tests:

```
cd src/
npm test
```

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

Deploy using AWS SAM:

```
aws cloudformation package --s3-bucket <BUCKET> --s3-prefix <PREFIX> --template-file template.yaml --output-template-file packaged.yaml
aws cloudformation deploy --template-file packaged.yaml --stack-name PortableServerlessApp --capabilities CAPABILITY_IAM
aws cloudformation describe-stacks --stack-name PortableServerlessApp
```

The URL of the API is in the response of the describe-stack in Stacks -> Outputs. 

Try the plain URL or with a name adding at the end of the API Gateway endpoint `?name=Your%20Name`

## Container deployment

Build and run the container locally using the following commands (replace:

```
docker build -t not-so-serverless .
docker run -p 33000:3000 -d not-so-serverless
```
Try the local container using the following URLs (assuming port 33000):

- http://localhost:33000
- http://localhost:33000?name=Your%20Name
