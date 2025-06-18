import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginForm from '../../web/features/authentication/ui/LoginForm';

export default {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
