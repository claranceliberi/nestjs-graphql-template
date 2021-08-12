// import { Injectable, Logger } from '@nestjs/common';
// import * as admin from 'firebase-admin';
// import config from 'config';

// @Injectable()
// export class FirebaseService {
//   private logger = new Logger('Firebase Service', true);
//   constructor() {
//     const firebase = config.get('firebase');
//     if (typeof firebase !== 'undefined') {
//       try {
//         admin.initializeApp({
//           credential: admin.credential.cert(firebase),
//           databaseURL: ''
//         });
//       } catch (e) {
//         this.logger.error('Unable to initialize firebase, skipping! Reason:', e.message);
//       }
//     } else {
//       this.logger.error('Firebase credentials not configured!');
//     }
//   }

//   sendPushNotification(obj: any): any {
//     if (!obj.tokens) {
//       this.logger.debug('Not sending notification. No token or topic', obj);
//       return null;
//     }
//     const updatedObj = { ...obj };
//     if (updatedObj.data) {
//       updatedObj.data = {};
//       for (const key of Object.keys(obj.data)) {
//         updatedObj.data[key] = typeof obj.data[key] === 'string'
//           ? obj.data[key]
//           : JSON.stringify(obj.data[key]);
//       }
//     }
//     this.logger.debug('sending', JSON.stringify(updatedObj));
//     return admin.messaging().send(updatedObj)
//       .then((result) => {
//         this.logger.debug('sent', result);
//         return result;
//       })
//       .catch((error) => {
//         this.logger.error('error', error);
//         throw error;
//       });
//   }

// }
