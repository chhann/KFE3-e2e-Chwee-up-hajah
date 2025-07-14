import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
  esbuild: {
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  define: {
    'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(
      'https://kqyspmbkzwmwfufzydly.supabase.co'
    ),
    'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxeXNwbWJrendtd2Z1Znp5ZGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzEzMzIsImV4cCI6MjA2NTY0NzMzMn0.rQmQhfb1tSjkSv8mw3HLqqJc29Rtw1C5hL-_PahoR6k'
    ),
  },
});
