export default interface INotification {
  title: string;
  message?: string;
  image_url?: string;
  payload?: { [key: string]: string };
}
