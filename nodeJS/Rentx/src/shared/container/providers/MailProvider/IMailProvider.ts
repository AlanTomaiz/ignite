interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    html: string,
    replyTo?: string,
  ): Promise<void>;
}

export { IMailProvider };
