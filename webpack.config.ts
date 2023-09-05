import { resolve } from 'path'
import * as webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
// import HelloWorldPlugin from '../webpackplugin/index'

const mode = process.env.mode as 'production' | 'development'

const resolveRoot = (path: any) => resolve(__dirname, path)

const config: webpack.Configuration = {
  mode,
  entry: {
    main: resolveRoot('main.tsx'),
  },
  output: {
    path: resolveRoot('dist'),
    filename: '[name].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'],
    alias: {
      '@': resolveRoot('src'),
    }
  },
  // cache: false,
  watch: true,
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
          'style-loader', 'css-loader', {
          loader: 'less-loader',
          options: {
            lessOptions: { javascriptEnabled: true },
          }
        }],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
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
    // new HelloWorldPlugin()
  ].concat(mode === 'development' ? [new ReactRefreshWebpackPlugin() as HtmlWebpackPlugin] : []),
}

export default config