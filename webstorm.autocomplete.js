// For enable autocomplete you need to add path to this file
// Preferences -> Languages & Frameworks -> JavaScript -> Webpack

const path = require('path');

module.exports = {
    resolve: {
        alias: {
            css: path.resolve(__dirname, 'src/assets/scss/')
        }
    }
};
