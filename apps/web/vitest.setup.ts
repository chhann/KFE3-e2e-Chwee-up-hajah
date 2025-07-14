// vitest.setup.ts
import '@testing-library/jest-dom';

// Mock window.alert
window.alert = vi.fn();