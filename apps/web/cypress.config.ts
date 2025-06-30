import { defineConfig } from 'cypress';
// npx cypress run --record --key ecd61d54-71b2-4852-a4e8-4235f942d832
export default defineConfig({
  projectId: 'az4nf3',
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false, // 이 줄을 추가합니다.
  },
});
