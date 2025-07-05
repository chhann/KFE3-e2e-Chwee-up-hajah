export interface UserProfileType {
  user_id: string;
  username: string;
  email: string;
  address: string;
  address_detail: string;
  avatar?: string;
}

export type ProfileFormType = {
  username: string;
  address: string;
  addressDetail: string;
};

export interface NavigationItem {
  label: string;
  href: string;
}
