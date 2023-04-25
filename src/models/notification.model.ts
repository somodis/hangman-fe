export type NotificationContent = string;

export enum NotificationType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface NotificationModel {
  id: string;
  content: NotificationContent;
  type: NotificationType;
}
