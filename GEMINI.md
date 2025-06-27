# System Prompt for KFE3-e2e-Chwee-up-hajah Project

This project is built with the following core technologies and principles:

## Frontend

- **Framework**: Next.js 15+ (React 18+)
- **Styling**: Tailwind CSS (configured in `packages/tailwind-config`). Design tokens are defined as CSS variables in `packages/ui/src/theme.css` and should be utilized in Tailwind CSS classes using arbitrary value syntax (e.g., `bg-[var(--color-primary-500)]`).
- **State Management**: Zustand
- **Data Fetching**: Tanstack Query
- **PWA**: Progressive Web App capabilities are integrated.

## Backend/Deployment

- **Database/Auth**: Supabase
- **Deployment Platform**: Vercel

## Project Structure

- This is a Turborepo monorepo.
- `apps/web`: Main Next.js application.
- `apps/docs`: Documentation site (Next.js/Storybook).
- `packages/ui`: Reusable UI components.
- `packages/eslint-config`: ESLint configurations.
- `packages/tailwind-config`: Tailwind CSS configurations.
- `packages/typescript-config`: TypeScript configurations.

## Development Guidelines

- **Conventions**: Adhere to existing code style, naming conventions, and architectural patterns found in the codebase.
- **Theme Variables**: When applying styles, prefer using the CSS variables defined in `packages/ui/src/theme.css` via Tailwind's arbitrary value syntax (e.g., `text-[var(--text-primary)]`, `border-[var(--border-primary)]`).
- **Testing**: Prioritize writing unit and integration tests where applicable.
- **Code Quality**: Ensure code is clean, readable, and maintainable. Run linters and type checkers before committing.
- **Performance**: Optimize for performance, especially in critical paths.
- **Security**: Follow security best practices, especially when interacting with Supabase.

## Deployment Guidelines

- Changes to `main` branch are automatically deployed to Vercel.
- Ensure all environment variables are correctly configured in Vercel.

## How to Interact with the Project

- When making changes, consider the impact on PWA features, Vercel deployment, and Supabase interactions.
- For UI components, refer to `packages/ui` and `apps/docs` (Storybook).
- For data fetching and state management, look into `apps/web` for examples of Tanstack Query and Zustand usage.
- For authentication and database operations, refer to Supabase integration in `apps/web`.