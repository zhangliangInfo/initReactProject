import { resolve } from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const mode = process.env.mode as 'production' | 'development'

const resolveRoot = (path: any) => resolve(__dirname, path)

const config: webpack.Configuration | webpack.WebpackOptionsNormalized = {
  mode,
  entry: {
    main: resolveRoot('main.tsx'),
  },
  output: {
    path: resolveRoot('dist'),
    filename: 'static/js/[name].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
    alias: {
      '@request': resolveRoot('src/request'),
      '@component': resolveRoot('src/component'),
      '@page': resolveRoot('src/page'),
      '@utils': resolveRoot('src/utils'),
      'router': resolveRoot('src/router.tsx'),
      '@': resolveRoot('src'),
      "@assets": resolveRoot("src/assets"),
    }
  },
  // cache: false,
  watch: false,
  devServer: {
    historyApiFallback: true,
  },
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: mode === 'development' ? [mode === 'development' && require.resolve('react-refresh/babel')].filter(() => true) : [],
            }
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(le|c)ss$/i,
        use: [
          mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader', {
          loader: 'less-loader',
          options: {
            lessOptions: { javascriptEnabled: true },
          }
        }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/image/[name].[hash][ext]',
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/font/[name].[hash][ext]',
        }
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolveRoot('index.html'),
      filename: 'index.html',
      minify: false,
      hash: true,
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css'
    }),
    new webpack.DefinePlugin({
      __HOSTLOGIN: `'//passport.jd.com/uc/login?ReturnUrl='`,
    })
  ].concat(mode === 'development' ? [new ReactRefreshWebpackPlugin() as unknown as HtmlWebpackPlugin] : []),
}

export default config