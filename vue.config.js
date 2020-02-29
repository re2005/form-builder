const path = require('path');

module.exports = {
    publicPath: './',
    configureWebpack: {
        resolve: {
            alias: {
                css: path.resolve(__dirname, 'src/assets/scss/'),
                images: path.resolve(__dirname, 'src/assets/images/')
            }
        }
    }
};
