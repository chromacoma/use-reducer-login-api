import handler from '../../libs/handler-lib';
import * as dynamoDbLib from '../../libs/dynamodb-lib';

import config from '../../config';

const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ apiVersion: '2016-04-18' });

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoAuthenticationProvider.split(':')[2];
  const userPoolId = config.userPoolId;
  const now = new Date().getTime();

  await dynamoDbLib.getUser({ userId });

  const updateParams = {
    TableName: 'users',
    Key: { userId },
    UpdateExpression: 'SET userStatus = :userStatus, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':userStatus': 'deleted',
      ':updatedAt': now,
    },
    ReturnValues: 'ALL_NEW',
  };
  await dynamoDbLib.call('update', updateParams);

  // disable the user in cognito user pool
  const userParams = { UserPoolId: userPoolId, Username: userId };
  await cognito.adminDisableUser(userParams).promise();

  return { status: true };
});
