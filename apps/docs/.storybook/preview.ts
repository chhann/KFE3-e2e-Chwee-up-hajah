import type { Preview } from '@storybook/nextjs';
import '@repo/ui/styles';
import '../app/globals.css';
import './fonts.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
