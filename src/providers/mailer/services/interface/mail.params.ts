export default class MailParams {
  public toAddresses: string[];
  public body: string;
  public subject: string;

  constructor(to: string[], body: string, subject: string) {
    this.toAddresses = to;
    this.body = body;
    this.subject = subject;
  }
}
