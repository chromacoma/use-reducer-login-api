# Serverless Starter API

### Description

Starter API for a serverless project running on AWS. Uses Cognito for auth, DynamoDB for a users table, API gateway for a rest API.

#### Usage

To use this repo locally you need to have the [Serverless framework](https://serverless.com) installed.

```bash
$ npm install serverless -g
```

Clone this repo.

```bash
$ git clone https://github.com/chromacoma/serverless-starter-api
```

Go to one of the services in the `services/` dir.

And run this to deploy to your AWS account.
z

```bash
$ serverless deploy
```

The services are dependent on the resources that are created [in this accompanying repo](https://github.com/chromacoma/serverless-starter-serverless-resources).

Replace the following constants:

```bash
__PACKAGE_NAME__
__APP_NAME__
__AWS_REGION__
__DEV_USER_POOL_ID__
__DEV_S3_FILES_BUCKET__
__DEV_CONTACT_EMAIL__
__DEV_CONTACT_EMAIL_ARN__
__PROD_USER_POOL_ID__
__PROD_S3_FILES_BUCKET__
__PROD_CONTACT_EMAIL__
__PROD_CONTACT_EMAIL_ARN__
__APP_SIGNUP_COMFIRMATION_URI__
__APP_CHANGE_EMAIL_COMFIRMATION_URI__
```

Go to one of the services in the `services/` dir.

And run this to deploy to your AWS account.

```bash
$ serverless deploy
```

SES Templates are deployed locally from the base service directory.

% sls ses-template deploy --removeMissed --aws-profile **AWS_PROFILE**

#### Maintainers

Comments and / or pull requests are welcomed!

[email]: mailto:john@minml.net
