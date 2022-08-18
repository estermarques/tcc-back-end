import { user } from '../../../models/index.js';
import { v4 as uuid } from 'uuid';
import CognitoIdentityServiceProvider from 'aws-sdk';

const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

/**
 * @name CreateUser
 * @command serverless invoke local -f CreateUser -p src/user/create/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    eventBody.id = uuid();

    const newUser = await user.create(eventBody);

    const params = {
      UserPoolId: "us-east-1_aELCHI62m",
      Username: eventBody.id
    };

    await cognitoIdentityServiceProvider.adminConfirmSignUp(params).promise();

    statusCode = 201;
    body.message = "Success to create new user";
    body.user = newUser.id;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to create new user';
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'X-Amz-Security-Token',
    }
  };
}