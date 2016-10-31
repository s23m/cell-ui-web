'use strict';

var m = require('mithril');
var api = require('./api');

console.log('logout.js');

var handleLogout = function() {
  api.logout();
  m.route.set('/');
};

var Logout = {
  view: function(vnode) {

    console.log('logout.js view function');

    return m(".logout", [
      m("button[id='logout-btn']", {
        onclick: handleLogout
      }, "Logout")
    ]);
  }
};

module.exports = Logout;
