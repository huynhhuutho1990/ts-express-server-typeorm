export default interface IMailService {
  send(to: string[], body: string, subject: string): Promise<boolean>;
}
