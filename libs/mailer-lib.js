import AWS from './aws-sdk';
import config from '../config';

const ses = new AWS.SES();

export const sendEmail = async ({ email, template, templateData }) => {
  const fromEmail = config.contactEmail;

  // dev can only send to verified emails
  const stage = config.stage;
  const toEmail = stage === 'prod' ? email : fromEmail;

  const emailParams = {
    Source: fromEmail,
    Destination: { ToAddresses: [toEmail], BccAddresses: [fromEmail] },
    Template: `${template}_${config.resourcesStage}`,
    TemplateData: JSON.stringify(templateData),
  };
  const sending = await ses.sendTemplatedEmail(emailParams).promise();
  return sending;
};

// templates are in services/recordings-api/ses-email-templates
