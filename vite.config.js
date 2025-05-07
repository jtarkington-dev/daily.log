import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ✅ This is the key line that fixes broken asset links in Electron
  plugins: [react()],
});
