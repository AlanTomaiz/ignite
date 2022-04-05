import nodemailer, { Transporter } from 'nodemailer';

import { IMailProvider } from '../IMailProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch(err => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    html: string,
    replyTo?: string,
  ): Promise<void> {
    const message = await this.client.sendMail({
      to,
      html,
      subject,
      replyTo,
      from: 'Rentx <noreplay@rentx.com.br>',
    });

    console.log(`Message URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export { EtherealMailProvider };
