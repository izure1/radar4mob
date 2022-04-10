const path = require('path')

const base = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}

const umd = {
  ...base,
  entry: {
    'umd/index': path.join(__dirname, 'src', 'umd', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: 'Radar4Mob'
    },
    globalObject: 'this'
  }
}

const esm = {
  ...base,
  experiments: {
    outputModule: true
  },
  entry: {
    'esm/index': path.join(__dirname, 'src', 'esm', 'index.ts')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    library: {
      type: 'module'
    }
  },
}

module.exports = [umd, esm]

