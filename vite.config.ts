import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: './',
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less']
      },
      server: {
        port: 3000
      },
      css: {
        postcss: {
          plugins: [require('autoprefixer')]
        }
      },
      plugins: [
        react(),
        // createHtmlPlugin({
        //   entry: './main.tsx',
        //   inject: {
        //     data: {
        //       title: 'Vite App',
        //     }
        //   }
        // }),
        {
          name: 'html-transform',
          transformIndexHtml(html) {
            return {
              html: html.replace(
                /<title>(.*?)<\/title>/,
                `<title>Title replaced!</title>`,
              ),
              tags: [
                {
                  tag: 'script',
                  attrs: {
                    type: 'module',
                    src: 'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
                  },
                  injectTo: 'head',
                },
                {
                  tag: 'script',
                  attrs: {
                    type: 'module',
                    src: './main.tsx',
                  },
                  injectTo: 'body',
                }
              ],
            }
          }
        }
      ],
      define: {
        
      }
    }
  } else {
    return {}
  }
})

