import AWS from './aws-sdk';
import config from '../config';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// generic db functions
export const call = (action, params) => {
  // Parameterize table names with stage name
  if (action.match(/^batch.*/)) {
    // table names are stored as keys of params.RequestItems
    Object.keys(params.RequestItems).forEach((key) => {
      const values = params.RequestItems[key];
      const newKey = `${config.resourcesStage}-${key}`;
      params.RequestItems[newKey] = values;
      delete params.RequestItems[key];
    });
    return dynamoDb[action](params).promise();
  }
  // easier
  return dynamoDb[action]({
    ...params,
    TableName: `${config.resourcesStage}-${params.TableName}`,
  }).promise();
};

export const parseBatchResponse = (result) => {
  // De-parameterize results from stage name
  const envRegex = new RegExp(`^${config.resourcesStage}-(.*)`);
  Object.keys(result.Responses).forEach((key) => {
    const newKey = key.match(envRegex) ? key.match(envRegex)[1] : key;
    const values = result.Responses[key];
    result.Responses[newKey] = values;
    delete result.Responses[key];
  });
  return result;
};

// shorthand for fetching objects

export const getUser = async ({ userId, email }) => {
  let user;
  if (userId) {
    const userGet = {
      TableName: 'users',
      Key: { userId },
    };
    const userResult = await call('get', userGet);
    user = userResult.Item;
  }
  if (!user && email) {
    const userQuery = {
      TableName: 'users',
      IndexName: 'users_email_gsi',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    };
    const userResult = await call('query', userQuery);
    user = userResult.Items[0];
  }
  if (!user) throw new Error('User not found.');
  return user;
};
