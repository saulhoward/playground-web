var debug = require('debug')('app:service:playground');

module.exports = function() {
    var chars = [];
    var choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++) {
        chars.push(choices.charAt(Math.floor(Math.random() * choices.length)));
    }
    return chars.join('');
}
