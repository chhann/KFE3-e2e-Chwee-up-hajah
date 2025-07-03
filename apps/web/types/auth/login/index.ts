export interface LoginFormComponentProps {
  email: string;
  password: string;
  error?: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SocialLoginSectionProps {
  onSocialLoginClick: () => void;
}
