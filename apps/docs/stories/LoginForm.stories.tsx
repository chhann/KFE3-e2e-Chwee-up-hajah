import type { Meta, StoryObj } from '@storybook/nextjs';
import { LoginFormComponent } from '../../web/widgets/authentication/LoginFormComponent';

export default {
  component: LoginFormComponent,
} satisfies Meta<typeof LoginFormComponent>;

type Story = StoryObj<typeof LoginFormComponent>;

export const Default: Story = {
  args: {},
};
