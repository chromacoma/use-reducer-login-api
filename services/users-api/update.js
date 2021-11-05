import handler from '../../libs/handler-lib';
import * as dynamoDbLib from '../../libs/dynamodb-lib';

export const main = handler(async (event, context, callback) => {
  const userId = event.requestContext.identity.cognitoAuthenticationProvider.split(':')[2];
  const data = JSON.parse(event.body);

  const email = data.email; // email must be present
  const preferences = data.preferences || null;
  const now = new Date().getTime();

  const updateParams = {
    TableName: 'users',
    Key: { userId },
    UpdateExpression: 'SET email = :email, preferences = :preferences, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':email': email,
      ':preferences': preferences,
      ':updatedAt': now,
    },
    ReturnValues: 'ALL_NEW',
  };
  const updateResult = await dynamoDbLib.call('update', updateParams);

  return updateResult.Attributes;
});
