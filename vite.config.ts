import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import mdx from 'vite-plugin-mdx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx() // Enable MDX support
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    // Generate static files
    outDir: 'dist',
    // Ensure we don't generate hashed filenames for blog content
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group vendor code
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          // Group auth related code
          if (id.includes('/auth/')) {
            return 'auth';
          }
          // Group payment related code
          if (id.includes('/payments/')) {
            return 'payments';
          }
        }
      }
    }
  },
  // Configure environment variables
  define: {
    'import.meta.VITE_AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
    'import.meta.VITE_AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
    'import.meta.VITE_AUTH0_AUDIENCE': JSON.stringify(process.env.AUTH0_AUDIENCE),
    'import.meta.VITE_STRIPE_PUBLIC_KEY': JSON.stringify(process.env.STRIPE_PUBLIC_KEY),
    'import.meta.VITE_API_ENDPOINT': JSON.stringify(process.env.API_ENDPOINT || '/api')
  }
});