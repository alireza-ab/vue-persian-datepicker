const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
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
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
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
        sourceMap: false,
        terserOptions: {
            warnings: false,
            compress: {
            }
        }
    })]
}

if (process.env.NODE_ENV === 'umd') {
    module.exports.entry = './src/components/DatePicker.vue'

    module.exports.output = {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'datepicker.umd.js',
        library: 'VuePersianRangeDatePicker',
        libraryTarget: 'umd'
    }

    module.exports.devtool = ''

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
        sourceMap: false,
        terserOptions: {
            mangle: true,
            warnings: false,
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
        library: 'VuePersianRangeDatePicker',
        libraryExport: 'default',
    }
    module.exports.devtool = ''
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
        sourceMap: false,
        terserOptions: {
            mangle: true,
            warnings: false,
            compress: {}
        }

    })]
}
