import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeHighlight from 'rehype-highlight';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex, rehypeHighlight],
      providerImportSource: "@mdx-js/react"
    }),
    react()
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
          // Group MDX content
          if (id.includes('.mdx')) {
            return 'content';
          }
        }
      }
    }
  }
});