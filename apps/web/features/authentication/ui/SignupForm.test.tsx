import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SignupForm from './SignupForm';

// Mock the useSignup hook
const mockUseSignupReturn = {
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  address: '',
  addressDetail: '',
  fieldErrors: {},
  formError: '',
  isSubmitting: false,
  isCheckingEmail: false,
  isCheckingUsername: false,
  emailCheckStatus: 'idle',
  usernameCheckStatus: 'idle',
  onChangeEmail: vi.fn(),
  onChangePassword: vi.fn(),
  onChangePasswordConfirm: vi.fn(),
  onChangeUsername: vi.fn(),
  onChangeAddress: vi.fn(),
  onChangeAddressDetail: vi.fn(),
  onSubmit: vi.fn((e) => e.preventDefault()), // Prevent default form submission
  onEmailDuplicateCheck: vi.fn(),
  onUsernameDuplicateCheck: vi.fn(),
  onAddressSearch: vi.fn(),
  resetErrors: vi.fn(),
};

// Mock the useSignup hook
vi.mock('apps/web/hooks/useSignup', () => ({
  useSignup: vi.fn(() => mockUseSignupReturn),
}));

describe('SignupForm', () => {
  it('renders the form fields', () => {
    render(<SignupForm {...mockUseSignupReturn} />);
    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 확인')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /회원가입/i })).toBeInTheDocument();
  });
  it('calls onSubmit with correct data on submission', async () => {
    const mockOnSubmit = vi.fn((e) => e.preventDefault());

    render(
      <SignupForm
        {...mockUseSignupReturn}
        email="test@example.com"
        password="password123"
        confirmPassword="password123"
        username="testuser"
        onSubmit={mockOnSubmit}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /회원가입/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('shows loading state when submitting', () => {
    render(<SignupForm {...mockUseSignupReturn} isSubmitting={true} />);
    expect(screen.getByRole('button', { name: /회원가입/i })).toBeDisabled();
  });

  it('shows error message on submission failure', () => {
    const errorMessage = '회원가입 실패';
    render(<SignupForm {...mockUseSignupReturn} formError={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
