/*
  updates a user when they signin
*/
import handler from '../../libs/handler-lib';
import * as dynamoDbLib from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  // console.log(event);

  if (!event.request.userAttributes) {
    // Nothing to do, the user's email ID is unknown
    console.error('Error: Missing User Attributes. Nothing was written to DDB or SQS');
    return context.done(null, event);
  }
  const userId = event.request.userAttributes.sub;
  const now = new Date().getTime();

  const params = {
    TableName: 'users',
    Key: { userId },
    UpdateExpression: 'SET lastSigninAt = :lastSigninAt, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':lastSigninAt': now,
      ':updatedAt': now,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW',
  };

  // Call DynamoDB
  await dynamoDbLib.call('update', params);
  console.log('User successfully updated:' + userId);
  context.done(null, event);
});
