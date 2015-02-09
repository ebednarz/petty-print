'use strict';
var chalk;
var getToken;

if ('production' == process.env.NODE_ENV) {
    /**
     * @param {Array} item
     * @returns {string}
     */
    getToken = function (item) {
        return item[0];
    };
} else {
    chalk = require('chalk');
    /**
     * @param {Array} item
     * @returns {string}
     */
    getToken = function (item) {
        return chalk[item[1]](item[0]);
    };
}

/**
 * @param {Array|string} item
 * @returns {string}
 */
function map(item) {
    if ('string' != typeof item) {
        item = getToken(item);
    }

    return item;
}

/**
 * @param {Array} list
 * @param {string} [glue]
 * @returns {string}
 */
function format(list, glue) {
    var message;

    if ('string' != typeof glue) {
        glue = ' ';
    }

    message = list.map(map).join(glue);
    return message;
}

/**
 * @param {string} id
 * @returns {Function}
 */
function pettyPrint(id) {
    var prefix = format(['[', [id, 'yellow'], ']'], '');

    /**
     * @param {Array} message
     * @param {string} [glue]
     */
    function log(message, glue) {
        var isoDate = (new Date()).toISOString();
        console.log(prefix, format([[isoDate, 'gray']]), format(message, glue));
    }

    return log;
}

module.exports = pettyPrint;
