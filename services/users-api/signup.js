/*
creates a user in a dynamodb users table when they succesfully sign up for the app.
triggered by cognito PostConfirmation event
based off a script at https://github.com/vbudilov/cognito-to-dynamodb-lambda
*/
import handler from '../../libs/handler-lib';
import * as dynamoDbLib from '../../libs/dynamodb-lib';
// import AWS from '../../libs/aws-sdk';
// import config from '../../config';

export const main = handler(async (event, context) => {
  // limit to post signups
  if (event.triggerSource !== 'PostConfirmation_ConfirmSignUp') {
    console.log('Not a Confirm Signup event. Exiting.');
    return context.done(null, event);
  }
  // console.log(event);
  if (!event.request.userAttributes) {
    // Nothing to do, the user's email ID is unknown
    console.error('Error: Missing User Attributes. Nothing was written to DDB or SQS');
    return context.done(null, event);
  }
  const userId = event.request.userAttributes.sub;
  const email = event.request.userAttributes.email;
  const now = new Date().getTime();

  // first put data into DDB
  const createParams = {
    TableName: 'users',
    Item: {
      userId,
      globalSort: 1,
      email,
      createdAt: now,
      updatedAt: now,
      lastSigninAt: now,
    },
  };
  // Call DynamoDB
  await dynamoDbLib.call('put', createParams);
  console.log('User successfully created:' + userId);

  context.done(null, event);
});
