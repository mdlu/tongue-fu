'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/react.production.min.js');
} else {
    module.exports = require('./cjs/react.development.js');
}



//////////////////
// WEBPACK FOOTER
// ./~/react/index.js
// module id = 1
// module chunks = 0