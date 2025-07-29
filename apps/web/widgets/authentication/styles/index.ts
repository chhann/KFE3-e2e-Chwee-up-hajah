export const LoginFormComponentStyles = {
  form: 'flex flex-col space-y-4',
  error: 'mt-2 text-[var(--text-error)]',
  reset_password: 'justify-between text-center text-sm text-[var(--text-tertiary)]',
  reset_password_link: 'text-[var(--text-tertiary)] hover:underline',
};

export const SignupFormComponentStyles = {
  container: 'mx-auto w-full rounded-lg bg-white p-4',
  title: 'mb-14 text-center text-2xl font-bold',
  form: 'space-y-4',
  emailInputSection: {
    label: 'text-sm text-gray-500',
    inputGroup: 'mt-1 flex items-center space-x-2',
  },
  passwordInputSection: {
    label: 'text-sm text-gray-500',
  },
  usernameInputSection: {
    label: 'text-sm text-gray-500',
    inputGroup: 'flex flex-col space-y-2 md:flex-row md:items-start md:space-x-2 md:space-y-0',
  },
  addressInputSection: {
    label: 'text-sm text-gray-500',
    inputGroup: 'mt-1 flex items-center space-x-2',
  },
  formError: 'text-center text-sm text-red-500',
  loginLinkContainer: 'mt-8 text-center',
  loginLink: 'text-gray-500 hover:underline',
};

export const SocialLoginSectionStyles = {
  container: 'mt-4 text-center',
  title: 'text-center text-gray-500',
  icons: 'mt-4 flex items-center justify-center space-x-3',
  avatar: 'inline-block align-middle',
  avatarStyle: { marginLeft: '8px', cursor: 'pointer' },
};

export const SignUpLinkComponentStyles = {
  container: 'mt-12 text-center',
  link: 'text-gray-500 hover:underline',
};

export const logoutSectionStyles = {
  nav: 'cursor-pointer rounded-[6px] bg-[var(--color-primary-50)] px-[14px] py-[16px] text-sm text-neutral-30 flex items-center',
  logoutIcon: 'size-6 mr-2',
};
