import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (mode !== 'docs') {
    return {
      plugins: [vue()],
      server: {
        port: 8888
      },
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          formats: ['es'],
          fileName: () => `index.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            }
          }
        }
      }
    }
  } else {
    return {
      plugins: [vue()],
      build: {
        outDir: 'docs'
      },
      base: './'
    }
  }
})