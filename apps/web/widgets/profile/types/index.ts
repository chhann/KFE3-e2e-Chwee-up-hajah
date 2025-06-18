export interface UserProfileType {
  id: string;
  name: string;
  email: string;
  location: string;
  temperature: number;
  credits: number;
  profileImageUrl: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}
