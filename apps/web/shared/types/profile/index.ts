export interface UserProfileType {
  user_id: string;
  username: string;
  email: string;
  address: string;
  address_detail: string;
  avatar?: string;
  points?: number;
  grade?: '씨앗' | '새싹' | '나무' | '숲' | '애벌레' | '돌멩이' | '흙';
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
