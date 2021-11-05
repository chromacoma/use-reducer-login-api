const stage = process.env.stage;
const resourcesStage = process.env.resourcesStage;

const stageConfigs = {
  dev: {
    userPoolId: 'us-west-2_i8bIHQauY',
    filesBucket: 'use-reducer-login-files-dev-uploads-92g5zjgvdwju',
    contactEmail: 'jadair@change.org',
    contactEmailArn: '__DEV_CONTACT_EMAIL_ARN__',
  },
  prod: {
    userPoolId: '__PROD_USER_POOL_ID__',
    filesBucket: '__PROD_S3_FILES_BUCKET__',
    contactEmail: '__PROD_CONTACT_EMAIL__',
    contactEmailArn: '__PROD_CONTACT_EMAIL_ARN__',
  },
};

const config = stageConfigs[stage] || stageConfigs.dev;

export default {
  stage,
  resourcesStage,
  ...config,
};
