import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from './config'
import { resolve } from 'path'
import { viteExternalsPlugin } from 'vite-plugin-externals'

const resolveRoot = (path: string) => resolve(__dirname, path)
const mode = process.env.mode as 'production' | 'development'
const proxyEnv = mode === 'production' ? config.prod : config.dev

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      root: '.',
      mode: 'development',
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
        alias: {
          '@request': resolveRoot('src/request'),
          '@component': resolveRoot('src/component'),
          '@page': resolveRoot('src/page'),
          '@utils': resolveRoot('src/utils'),
          'router': resolveRoot('src/router.tsx'),
          "@assets": resolveRoot("src/assets"),
          '@': resolveRoot('src'),
        }
      },
      server: {
        port: 3000,
        proxy: {
          '/ediservice': {
            target: `${proxyEnv.protocol}://${proxyEnv.host}:${proxyEnv.port}`,
            changeOrigin: true,
            // rewrite: path => path.replace(/^\/ediService/, '')
          },
          '/chainetc': {
            target: `${proxyEnv.protocol}://${proxyEnv.host}:${proxyEnv.port}`,
            changeOrigin: true,
            // rewrite: path => path.replace(/^\/ediService/, '')
          },
        }
      },
      css: {
        postcss: {
          plugins: [require('autoprefixer')]
        }
      },
      plugins: [
        viteExternalsPlugin({
          // react: 'React',
          // 'react-dom': 'ReactDOM',
        }),
        react({
          babel: {
            plugins: [
              '@babel/plugin-transform-nullish-coalescing-operator',
              '@babel/plugin-transform-optional-chaining'
            ]
          }
        }),
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
              html,
              tags: [
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
        __HOSTLOGIN: `'//passport.jd.com/uc/login?ReturnUrl='`,
      }
    }
  } else {
    return {}
  }
})

