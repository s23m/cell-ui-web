'use strict';

var m = require('mithril');
var Logout = require('./logout');

console.log('dashboard.js');

module.exports = {
  view: function(vnode) {

    console.log('dashboard.js view function');

    return [
      m("h1", "Dashboard"),
      m("p", "Hello"),
      m(Logout)
    ];
  }
}
