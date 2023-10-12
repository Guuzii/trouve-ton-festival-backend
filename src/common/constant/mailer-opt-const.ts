import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { NodeEnvEnum } from './enums/node-env.enum';
/**
 * configuration mailer
 *
 */
export const mailerOpt: MailerOptions = {
  transport: {
    className: process.env.MAIL_DRIVER,
    host: process.env.MAIL_SMTP_HOST,
    port: process.env.MAIL_SMTP_PORT,
    auth: {
      user: process.env.MAIL_SMTP_USER,
      pass: process.env.MAIL_SMTP_PASSWORD,
    },
    secure: process.env.NODE_ENV == NodeEnvEnum.production ? true : false,
    logger: process.env.NODE_ENV == NodeEnvEnum.production ? false : true,
    debug: process.env.NODE_ENV == NodeEnvEnum.production ? false : true,
  },
  defaults: {
    from: `nest-modules<${process.env.MAIL_ACCOUNT_SENDER!}>`,
  },
  template: {
    dir: join(__dirname, '..', '..', `${process.env.MAIL_TEMPLATE_DIRECTORY}`),
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  options: {
    partials: {
      dir: join(
        __dirname,
        '..',
        '..',
        `${process.env.MAIL_TEMPLATE_DIRECTORY}`,
        `${process.env.MAIL_PARTIAL_DIRECTORY}`,
      ),
      options: {
        strict: true,
      },
    },
  },
};
