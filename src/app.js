'use strict';

var m = require('mithril');
var Layout = require('./components/layout');
var Login = require('./components/login');

console.log('app.js');

m.route(document.body, '/', {
  '/': {
    render: function() {
      console.log('render called');
      return m(Layout, m(Login));
    }
  }
})