// cdk is basically the friendly way of writting normal code to describe what to do with the cloud

import * as cdk from 'aws-cdk-lib'; //this is the core tool
import { Construct } from 'constructs'; // basically the building block CDK uses
import * as lambda from 'aws-cdk-lib/aws-lambda'; //so that we can make lambda functions
import * as apigw from 'aws-cdk-lib/aws-apigateway'; // to create api gateway

export class StockSentimentStack extends cdk.Stack { // stack = one group of AWS resources that get created together. in our case ne Lambda and one API Gateway

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props); // the parent cdk stack constructor

    // Lambda function
    const helloFn = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,

      // this is the code we will execute
      code: lambda.Code.fromInline(` 
        exports.handler = async function(event) {
          console.log("request:", JSON.stringify(event, undefined, 2));
          return { statusCode: 200, body: "Hello from Lambda!" };
        };
      `),
      handler: 'index.handler'
    });

    // API Gateway REST API exposing the Lambda
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloFn
    });
  }
}
