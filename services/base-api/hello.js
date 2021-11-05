import handler from '../../libs/handler-lib';
import AWS from '../../libs/aws-sdk';
import config from '../../config';

const ses = new AWS.SES();

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);
  const { name, email, subject, message } = data;

  const contactEmail = config.contactEmail;

  if (!(email && name && subject && message)) {
    throw new Error("Missing parameters! Make sure to add parameters 'email', 'name', 'subject', 'message'.");
  }

  const emailParams = {
    Source: contactEmail,
    Destination: { ToAddresses: [contactEmail] },
    ReplyToAddresses: [email],
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Message sent from ${email} by ${name} \n\n${message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `[__APP NAME__] ${subject}`,
      },
    },
  };
  const sending = await ses.sendEmail(emailParams).promise();
  return sending;
});
