// import { Injectable } from '@nestjs/common';
// import Twilio from 'twilio';
// import config from 'config';
// import d from 'debug';

// const packageName = process.env.npm_package_name;
// const debug = d(`${packageName}:twilio`);

// @Injectable()
// export class TwilioService {
//   private twilioClient = Twilio(config.get('twilio.appSid'), config.get('twilio.authToken'));

//   sendSMS(phoneNumber: string, message: string) {
//     return this.twilioClient.messages.create({
//       to: phoneNumber,
//       body: message,
//       messagingServiceSid: config.get('twilio.messagingSeviceSid')
//     }).then(() => {
//       debug(`Message: ${message} is sent successfuly to: ${phoneNumber}`);
//     }).catch(err => {
//       debug(`Failed to send SMS to: ${phoneNumber}`);
//       debug(`Err: ${err}`);
//     });
//   }
// }
