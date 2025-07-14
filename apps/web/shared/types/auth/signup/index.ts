import React from 'react';

export interface EmailInputSectionProps {
  email: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailDuplicateCheck: () => void;
  isCheckingEmail: boolean;
  emailCheckStatus?: '' | 'checking' | 'success' | 'error';
  error?: string;
}

export interface PasswordInputSectionProps {
  password: string;
  confirmPassword: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePasswordConfirm: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError?: string;
  confirmPasswordError?: string;
}

export interface UsernameInputSectionProps {
  username: string;
  onChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUsernameDuplicateCheck: () => void;
  isCheckingUsername: boolean;
  usernameCheckStatus?: '' | 'checking' | 'success' | 'error';
  error?: string;
}

export interface AddressInputSectionProps {
  address: string;
  addressDetail: string;
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddressDetail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface SubmitButtonProps {
  isSubmitting: boolean;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  emailError?: string;
}
