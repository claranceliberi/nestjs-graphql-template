const template = `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
    <meta charset="utf-8">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Roboto:400,700&amp;amp;display=swap" rel="stylesheet" media="screen">
    <!--[if mso]>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
    <style>
      td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
    </style>
  <![endif]-->
    <style>
      @media (max-width: 600px) {
        .button {
          text-align: center !important;
          width: 100% !important;
        }
      }

      @media (prefers-color-scheme: dark) {

        body,
        .email-body,
        .email-body_inner {
          border-radius: 8px;
        }

        .email-content,
        .email-wrapper,
        .email-footer {
          background-color: #333333 !important;
          color: #ffffff !important;
        }

        p,
        h1,
        h3 {
          color: #ffffff !important;
        }

        .attributes_content {
          background-color: #222222 !important;
        }

        .email-masthead_name {
          text-shadow: none !important;
        }
      }

      @media (max-width: 600px) {
        .sm-w-full {
          width: 100% !important;
        }
      }
    </style>
  </head>

  <body style="margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #f2f4f6;">
    <div role="article" aria-roledescription="email" aria-label="" lang="en">
      <table class="email-wrapper" style="background-color: #f2f4f6; font-family: 'Nunito Sans', -apple-system, 'Segoe UI', sans-serif; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center">
            <table class="email-content" style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td align="center" style="font-size: 16px; padding-top: 25px; padding-bottom: 25px; text-align: center;">
                  <img width="80" height="80" src="https://hello.com/hello-name-logo.png" alt="" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle;">
                  <a href="https://hello.com" class="email-masthead_name" style="text-shadow: 0 1px 0 #ffffff; font-weight: 700; font-size: 16px; color: #a8aaaf; text-decoration: none;">
                    hello-name
                  </a>
                </td>
              </tr>
              <tr>
                <td class="email-body" style="width: 100%;">
                  <table align="center" class="email-body_inner sm-w-full" style="background-color: #ffffff; border-radius: 1rem; margin-left: auto; margin-right: auto; box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow); width: 570px;" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding: 45px;">
                        <div style="font-size: 16px;">
                          <h1 style="font-weight: 700; font-size: 24px; margin-top: 0; text-align: left; color: #333333;">Welcome, {{name}}!</h1>
                          <p style="font-size: 16px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">
                            Thanks for trying {{product}}. We're thrilled to have you on board. To get the most out of {{product}}, do this primary next step:
                          </p>
                          <table align="center" style="margin-top: 30px; margin-bottom: 30px; margin-left: auto; margin-right: auto; text-align: center; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td align="center">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td align="center" style="font-size: 16px;">
                                      <a href="{{actionurl}}" class="button" target="_blank" style="display: inline-block; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16); background-color: #059669; border-color: #059669; border-style: solid; border-width: 16px 32px;">Let's go!</a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size: 16px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">
                            For reference, here's your login information:
                          </p>
                          <table style="margin-bottom: 21px; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="attributes_content" style="background-color: #f4f4f7; padding: 16px;">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="font-size: 16px;">
                                      <strong style="color: #51545e;">Login Page:</strong> {{actionurl}}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="font-size: 16px;">
                                      <strong style="color: #51545e;">Username:</strong> {{username}}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size: 16px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">
                            You've started a free. You can upgrade to a paying account or cancel any time.
                          </p>
                          <table style="margin-bottom: 21px; width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td class="attributes_content" style="background-color: #f4f4f7; padding: 16px;">
                                <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                  <tr>
                                    <td style="font-size: 16px;">
                                      <strong style="color: #51545e;">Start Date:</strong> {{startdate}}
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <p style="font-size: 16px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">
                            If you have any questions, feel free to <a href="mailto:{{supportemail}}" style="color: #3869d4;">email our customer success team</a>.
                            (We're lightning quick at replying.) We also offer <a href="{{livechaturl}}" style="color: #3869d4;">live chat</a> during business hours.
                          </p>
                          <p style="font-size: 16px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">
                            Thanks,
                            <br>{{product}} Team
                          </p>
                          <p style="font-size: 16px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">
                            <strong>P.S.</strong> Need immediate help getting started? Check out our <a href="{{documentationurl}}" style="color: #3869d4;">help documentation</a>.
                            Or, just reply to this email, the {{product}} support team is always ready to help!
                          </p>
                          <table style="border-top-width: 1px; margin-top: 25px; padding-top: 25px; border-top-color: #eaeaec; border-top-style: solid;" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                              <td>
                                <p style="font-size: 13px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">If you're having trouble with the button above, copy and paste the URL below into your web browser.</p>
                                <p style="font-size: 13px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; color: #51545e;">{{actionurl}}</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table align="center" class="email-footer sm-w-full" style="margin-left: auto; margin-right: auto; text-align: center; width: 570px;" cellpadding="0" cellspacing="0" role="presentation">
                    <th style="padding-top: 60px;">
                      <p style="font-weight: 500; font-size: 13px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; text-align: center; color: #a8aaaf;"> hello-name at the touch of a button! Download our app for:</p>
                      <table align="center" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td style="padding-left: 8px; padding-right: 8px;">
                            <a href="https://apps.apple.com/us/app/hello-name/id1494667688?mt=8">
                              <img src="https://firebasestorage.googleapis.com/v0/b/hello-name-6c111.appspot.com/o/badge%2Fapp-store-badge.png?alt=media&token=5d65533d-f181-427c-b71e-8794d5c2454e" alt="App Store" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle;">
                            </a>
                          </td>
                          <td style="padding-left: 8px; padding-right: 8px;">
                            <a href="https://play.google.com/store/apps/details?id=com.hob.hello-name&amp;amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                              <img src="https://firebasestorage.googleapis.com/v0/b/hello-name-6c111.appspot.com/o/badge%2Fgoogle-play-badge.png?alt=media&token=acba10eb-c2eb-4c25-a798-e00ed2251f24" alt="Google Play" style="border: 0; line-height: 100%; max-width: 100%; vertical-align: middle;">
                            </a>
                          </td>
                        </tr>
                      </table>
                    </th>
                    <tr>
                      <td align="center" style="font-size: 16px; padding: 32px;">
                        <p style="font-size: 13px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; text-align: center; color: #a8aaaf;">&copy; 2021 hello-name. All rights reserved.</p>
                        <p style="font-size: 13px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; text-align: center; color: #a8aaaf;">
                          hello.com
                        </p>
                        <p style="font-size: 13px; line-height: 24px; margin-top: 6px; margin-bottom: 20px; text-align: center; color: #a8aaaf;">
                          Don't want andy more emails from
                          <a href="{{unsubscribeurl}}" style="color: #059669;"> Unsubscribe </a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>

</html>
`;

export default template;
