import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

import { MailTemplateEnum } from '../common/constant/enums/mail-template.enum';
/**
 * service d'envoi des emails
 */
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  /**
   * envoi un email de réinitialisation de mot de passe
   * @param email envoyé à
   * @param token jeton de réinitialisation
   * @param host adresse de la page au front-end
   * @param controller controler du front-end
   */
  public sendResetPassword(
    email: string,
    token: string,
    host: string,
    controller: string,
  ) {
    this.mailerService
      .sendMail({
        to: email,
        from: `account password control<${process.env.MAIL_ACCOUNT_SENDER}>`, // sender address
        subject: 'Réinitialisation de votre mot de passe demandée', // Subject line
        template: MailTemplateEnum.resetPassword, // l'extension est ajoutée automatiquement
        encoding: 'utf-8',
        context: {
          host,
          controller,
          email,
          token,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
