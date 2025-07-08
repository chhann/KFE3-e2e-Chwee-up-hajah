export interface LoginFormComponentProps {
  email: string;
  password: string;
  error?: string;
  isPending: boolean; // 추가
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialLoginSectionProps {
  onSocialLoginClick: () => void;
}
