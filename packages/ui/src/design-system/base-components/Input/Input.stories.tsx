import type { Meta, StoryObj } from '@storybook/nextjs';
import { useEffect, useState } from 'react';
import { Input, InputProps } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Base Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    value: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

// 상태 관리용 wrapper + 외부 args.value 반영
const InputWithState = (args: InputProps) => {
  const [value, setValue] = useState(args.value ?? '');

  // props.value가 바뀌면 내부 상태도 동기화
  useEffect(() => {
    if (args.value !== undefined) {
      setValue(args.value);
    }
  }, [args.value]);

  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        args.onChange?.(e);

        // onChange 테스트: 5자 이상 입력하면 console.log
        if (newValue.length >= 5) {
          console.log(`입력 값: ${newValue}`);
        }
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'text',
    value: '',
  },
};

export const WithError: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    error: 'This field is required',
    value: '',
  },
};

export const WithPasswordToggle: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    leftIcon: 'password',
    value: '',
  },
};

export const WithEmailIcon: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Email',
    placeholder: 'email@example.com',
    type: 'email',
    leftIcon: 'email',
    value: '',
  },
};

export const Disabled: Story = {
  render: (args) => <InputWithState {...args} />,
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    disabled: true,
  },
};
