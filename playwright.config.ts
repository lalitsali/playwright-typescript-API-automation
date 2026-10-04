import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  timeout: Number(process.env.API_TIMEOUT) || 30000,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    baseURL: process.env.BASE_URL,
  },

  fullyParallel: true,
});