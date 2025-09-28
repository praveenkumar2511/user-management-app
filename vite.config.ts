
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["src/setupTests.ts"],
    coverage: {
      reporter: ["text", "html"],
      exclude: ["node_modules/", "src/main.tsx"]
    }
  }
});