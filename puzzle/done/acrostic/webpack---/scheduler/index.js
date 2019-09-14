'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/scheduler.production.min.js');
} else {
    module.exports = require('./cjs/scheduler.development.js');
}



//////////////////
// WEBPACK FOOTER
// ./~/scheduler/index.js
// module id = 23
// module chunks = 0