var webpack = require('webpack');
var path = require('path');

var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcPath = path.resolve(__dirname, './src'),
    pagePath = path.resolve(srcPath, 'page'),
    releasePath = path.resolve(__dirname, './release');

var entries = {
    entry_one: path.join(pagePath, 'entry_one.js'),
    entry_two: path.join(pagePath, 'entry_two.js')
};

var htmls = [{
    template: path.join(pagePath, 'entry_one.html'),
    filename: 'entry_one.html',
    chunks: ['entry_one']
},{
    template: path.join(pagePath, 'entry_two.html'),
    filename: 'entry_two.html',
    chunks: ['entry_two']
}];

var plugins = [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
    }),
];

plugins = plugins.concat(
    htmls.map(function (item) {
        return new HtmlwebpackPlugin({
            filename: item.filename,
            template: item.template,
            chunks: item.chunks,
            inject: true
        });
    })
);

module.exports = {
    devtool: false,
    entry: entries,
    output: {
        filename: 'js/[name].js',
        chunkFilename: 'js/[id].bundle.js',
        path: releasePath,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }]
            })
        }]
    },
    plugins: plugins,
    resolve: {
        modules: [
            'node_modules'
        ],
        extensions: ['.js', '.jsx', '.json']
    }
};
