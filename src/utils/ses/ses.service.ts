import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SES } from 'aws-sdk';

import confirmTemplate from './email-templates/confirm-email.html';
import welcomeTemplate from './email-templates/welcome.html';
import passwordForgotTemplate from './email-templates/password-forgot.html';
import passwordResetTemplate from './email-templates/password-reset.html';
import teamInvitationTemplate from './email-templates/team-invitation.html';
import teamInvitationRegisterTemplate from './email-templates/team-invitation-register.html';

interface EmailTemplate {
  actionurl?: string;
  username?: string;
  name?: string;
  timehours?: string;
  operatingsystem?: string;
  browsername?: string;
  invitesendername?: string;
  invitesenderteamname?: string;
}


export enum SESBody {
  CONFIRM_EMAIL = 'confirm-email',
  WELCOME = 'welcome',
  PASSWORD_FORGOT = 'password-forgot',
  RESET_PASSWORD = 'password-reset',
  TEAM_INVITATION = 'team-invitation',
  TEAM_INVITATION_REGISTER = 'team-invitation-register',
}

@Injectable()
export class SesService {
  constructor(private configService: ConfigService) { }

  private ses = new SES({
    accessKeyId: this.configService.get('SD_AWS_ACCSES_KEY'),
    secretAccessKey: this.configService.get('SD_AWS_SECRET_KEY'),
    region: this.configService.get('SD_AWS_ACSESS_REGION')
  });

  sendEmail({ to, subject, body, data }: { to: string, subject: string, body: SESBody, data?: EmailTemplate }) {

    let emailTemplate = '';
    switch (body) {
      case 'confirm-email':
        emailTemplate = confirmTemplate;
        break;
      case 'welcome':
        emailTemplate = welcomeTemplate;
        break;
      case 'password-forgot':
        emailTemplate = passwordForgotTemplate;
        break;
      case 'password-reset':
        emailTemplate = passwordResetTemplate;
        break;
      case 'team-invitation':
        emailTemplate = teamInvitationTemplate;
        break;
      case 'team-invitation-register':
        emailTemplate = teamInvitationRegisterTemplate;
        break;
      default:
        emailTemplate = welcomeTemplate;
    }

    emailTemplate = emailTemplate
      .split('{{product}}')
      .join('hello-name') //Urun adi, Ornek: hello-name
      .split('{{actionurl}}')
      .join(data.actionurl) //Button link urlsi
      .split('{{username}}')
      .join(data.username) //Projedeki kullanici adi
      .split('{{name}}')
      .join(data.name) //Kullaninin adi
      //request log
      .split('{{timehours}}')
      .join(data.timehours) //Ornek: 2 saat
      .split('{{operatingsystem}}')
      .join(data.operatingsystem) //Istegi atilan kisinin isletim sistemi
      .split('{{browsername}}')
      .join(data.browsername) //Gonderigi yerin tarayici adi
      //invite
      .split('{{invitesendername}}')
      .join(data.invitesendername) //Gonderen kisinin adi
      .split('{{invitesenderteamname}}')
      .join(data.invitesenderteamname) //Eklenen takim adi
      //Proje ile ilgililer
      .split('{{supportemail}}')
      .join('support@hello.com') //Projenin destek e posta adresi
      .split('{{supporturl}}')
      .join('https://hello.com/') //Projenin destek e posta adresi
      .split('{{livechaturl}}')
      .join('https://hello.com/') //Projenin Canli destek site urlsi
      .split('{{unsubscribeurl}}')
      .join('https://hello.com/') //e posta almamak icin iptal senecek url linki
      .split('{{startdate}}')
      .join(new Date().toLocaleString()) //date
      .split('{{documentationurl}}')
      .join('https://hello.com/'); //documentation


    const emailParams = Object.assign({}, {
      Destination: {
        ToAddresses: [to]
      },
      Message: {
        Body: {
          Html: {
            Data: emailTemplate
          }
        },
        Subject: {
          Data: subject
        }
      },
      Source: 'no-reply@hello.com'
    });
    console.log(this.configService.get('SD_AWS_ACCSES_KEY'))

    return this.ses.sendEmail(emailParams).promise().then((res) => {
      console.log(res)
    });
  }
}
