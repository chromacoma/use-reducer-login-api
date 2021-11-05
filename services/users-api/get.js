import handler from '../../libs/handler-lib';
import * as dynamoDbLib from '../../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const userId = event.requestContext.identity.cognitoAuthenticationProvider.split(':')[2];
  const user = await dynamoDbLib.getUser({ userId });
  return user;
});
