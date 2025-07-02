export interface NotificationItem {
  id: string;
  title: string;
  content?: string;
  price?: number;
  misc?: string;
}

export interface NotificationSection {
  icon: React.ReactNode;
  title: string;
  items: NotificationItem[];
}
