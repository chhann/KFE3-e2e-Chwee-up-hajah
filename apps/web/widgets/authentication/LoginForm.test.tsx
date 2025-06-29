import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const defaultProps = {
    email: '',
    password: '',
    error: '',
    onSubmit: vi.fn(),
    onChangeEmail: vi.fn(),
    onChangePassword: vi.fn(),
  };

  it('should render correctly with initial props', () => {
    render(<LoginForm {...defaultProps} />);

    expect(screen.getByPlaceholderText('이메일 주소')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    const loginButtons = screen.getAllByRole('button', { name: '로그인', type: 'submit' });
    expect(loginButtons).toHaveLength(1);
    expect(loginButtons[0]).toBeInTheDocument();
    expect(screen.queryByText('비밀번호를 잊으셨나요?')).toBeInTheDocument();
    expect(screen.queryByText('계정이 없으신가요?')).toBeInTheDocument();
    expect(screen.queryByText('다른 계정으로 로그인')).toBeInTheDocument();
    expect(screen.queryByText('test error')).not.toBeInTheDocument();
  });

  it('should call onChangeEmail when email input changes', () => {
    render(<LoginForm {...defaultProps} />);
    const emailInput = screen.getByPlaceholderText('이메일 주소');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(defaultProps.onChangeEmail).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChangeEmail).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should call onChangePassword when password input changes', () => {
    render(<LoginForm {...defaultProps} />);
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(defaultProps.onChangePassword).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChangePassword).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should call onSubmit when login button is clicked and inputs are filled', async () => {
    const props = { ...defaultProps, email: 'test@example.com', password: 'password123' };
    render(<LoginForm {...props} />);
    const loginButton = screen.getByRole('button', { name: '로그인', type: 'submit' });
    fireEvent.click(loginButton);
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSubmit).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should display error message when error prop is provided', () => {
    const props = { ...defaultProps, error: 'test error' };
    render(<LoginForm {...props} />);
    expect(screen.getByText('test error')).toBeInTheDocument();
  });

  it('should disable login button when both email and password are empty', () => {
    const props = { ...defaultProps, email: '', password: '' };
    render(<LoginForm {...props} />);
    expect(screen.getByRole('button', { name: '로그인', type: 'submit' })).toBeDisabled();
  });

  it('should disable login button when email is empty', () => {
    const props = { ...defaultProps, email: '', password: 'password123' };
    render(<LoginForm {...props} />);
    expect(screen.getByRole('button', { name: '로그인', type: 'submit' })).toBeDisabled();
  });

  it('should disable login button when password is empty', () => {
    const props = { ...defaultProps, email: 'test@example.com', password: '' };
    render(<LoginForm {...props} />);
    expect(screen.getByRole('button', { name: '로그인', type: 'submit' })).toBeDisabled();
  });

  it('should enable login button when both email and password are filled', () => {
    const props = { ...defaultProps, email: 'test@example.com', password: 'password123' };
    render(<LoginForm {...props} />);
    expect(screen.getByRole('button', { name: '로그인', type: 'submit' })).not.toBeDisabled();
  });
});
