/*
handles sending custom emails for email verifications
*/
export const main = (event, context, callback) => {
  console.log(event.triggerSource);
  if (
    event.triggerSource === 'CustomMessage_SignUp' ||
    event.triggerSource === 'CustomMessage_UpdateUserAttribute' ||
    event.triggerSource === 'CustomMessage_VerifyUserAttribute'
  ) {
    const link =
      event.triggerSource === 'CustomMessage_SignUp'
        ? '__APP_SIGNUP_COMFIRMATION_URI__'
        : '__APP_CHANGE_EMAIL_COMFIRMATION_URI__'; // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent

    event.response.smsMessage =
      'Welcome to the use-reducer-login! Your confirmation code is ' + event.request.codeParameter;
    event.response.emailSubject = 'use-reducer-login verification code';
    event.response.emailMessage = `
  <table style="width: 100%; height: 100%; padding: 0; margin: 0; border-collapse: collapse; font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 10pt;">
  <tr>
    <td colspan="3" height="10%" style="background-color: #f8f8f8;"></td>
  </tr>
  <tr>
    <td width="10%" style="background-color: #f8f8f8;"></td>
    <td width="80%" height="80%" style="background-color: white; padding: 3%; vertical-align: top;">
      <p style="text-align: center;">&nbsp;</p>
      <p>Hello from use-reducer-login!</p>
      <p>Your email verification code is <strong>${event.request.codeParameter}</strong></p>
      <p>And here's the link to the confirmation page, in case you closed the window already:</p>
      <p><a href="${link}">${link}</a></p>
      <p>See you soon!</p>
    </td>
    <td width="10%" style="background-color: #f8f8f8;"></td>
  </tr>
  <tr>
    <td colspan="3" height="10%" style="background-color: #f8f8f8;"></td>
  </tr>
</table>`;
  }

  callback(null, event);
};
