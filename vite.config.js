// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Cho phép truy cập từ mọi địa chỉ
    port: 5173,        // Đảm bảo cổng không bị thay đổi
    open: true,        // Mở trình duyệt sau khi khởi chạy
  },
});
