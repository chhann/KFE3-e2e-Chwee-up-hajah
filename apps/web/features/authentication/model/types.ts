// apps/web/features/authentication/model/types.ts

export interface SignupData {
  email: string;
  password: string;
  username: string;
  address: string;
  addressDetail?: string;
}

export interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
  address?: string;
}

export interface UseSignupReturn {
  // Form state
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  address: string;
  addressDetail: string;

  // Error state
  fieldErrors: ValidationErrors;
  formError: string;

  // Loading state
  isSubmitting: boolean;
  isCheckingEmail: boolean;
  isCheckingUsername: boolean; 

  // check state
  emailCheckStatus: 'idle' | 'checking' | 'success' | 'error';
  usernameCheckStatus: 'idle' | 'checking' | 'success' | 'error';

  // Form handlers
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;

  // Action handlers
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onEmailDuplicateCheck: () => Promise<boolean>;
  onUsernameDuplicateCheck: () => Promise<boolean>;
  onAddressSearch: () => void;

  // Utility
  resetErrors: () => void;
}