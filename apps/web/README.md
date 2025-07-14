## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

To create [API routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers) add an `api/` directory to the `app/` directory with a `route.ts` file. For individual endpoints, create a subfolder in the `api` directory, like `api/hello/route.ts` would map to [http://localhost:3001/api/hello](http://localhost:3001/api/hello).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn/foundations/about-nextjs) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_source=github.com&utm_medium=referral&utm_campaign=turborepo-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Testing

This project uses [Vitest](https://vitest.dev/) for unit and integration testing.

### Setup

1.  **Install dependencies:**

    ```bash
    pnpm install
    ```

2.  **Configuration files:**

    *   `vitest.config.ts`: The main configuration file for Vitest.
    *   `vitest.setup.ts`: A setup file for Vitest to import necessary libraries like `@testing-library/jest-dom`.

### Running Tests

To run the tests, use the following command:

```bash
pnpm test
```

### Test Structure

Tests are located in the same directory as the files they are testing, with the `.test.ts` or `.test.tsx` extension.

Currently, tests are implemented for the following parts of the application:

*   **Stores (`stores/`):** Tests for Zustand stores (e.g., `auth.store.ts`).
*   **Utilities (`lib/utils/`):** Tests for utility functions (e.g., `time.ts`).
*   **Validators (`lib/validators/`):** Tests for Zod validation schemas (e.g., `auth.ts`).
*   **Hooks (`hooks/`):** Tests for custom React hooks (e.g., `useLogin.ts`).