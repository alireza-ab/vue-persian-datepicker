const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: process.env.NODE_ENV === 'test' ? './test/main.js' : './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader',]
            },
            {
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader?indentedSyntax']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: [
                            'style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        sass: [
                            'style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    performance: {
        hints: false
    },
    optimization: {
        minimize: true
    },
    plugins: [new VueLoaderPlugin()],
    devtool: 'eval-source-map',
    mode: 'development'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
    module.exports.optimization.minimizer = [new TerserPlugin({
        terserOptions: {
            compress: {
            }
        }
    })]
}

if (process.env.NODE_ENV === 'common') {
    module.exports.entry = './src/components/DatePicker.vue'

    module.exports.output = {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'datepicker.common.js',
        library: 'datePicker',
        libraryTarget: 'umd'
    }

    module.exports.devtool = false

    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])

    module.exports.optimization.minimizer = [new TerserPlugin({
        terserOptions: {
            mangle: true,
            compress: {}
        }
    })]
}

if (process.env.NODE_ENV === 'unpkg') {
    module.exports.entry = './src/components/DatePicker.vue'
    module.exports.output = {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'datepicker.min.js',
        library: 'datePicker',
        libraryExport: 'default',
    }
    module.exports.devtool = false
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])

    module.exports.optimization.minimizer = [new TerserPlugin({
        terserOptions: {
            mangle: true,
            warnings: false,
            compress: {}
        }

    })]
}
