export interface ISubscriber {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  lastNotificationTime?: Date;
}
