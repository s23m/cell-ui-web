'use strict';

var m = require('mithril');
var Layout = require('./components/layout');
var Login = require('./components/login');
var Dashboard = require('./components/dashboard');
var api = require('./components/api');

console.log('app.js');

m.route(document.body, '/', {
  '/': {
    render: function() {
      console.log('/ render called');
      return m(Layout, m(Login));
    }
  },

  '/dashboard': {
    onmatch: function(resolve) {
      if (api.hasValidToken()) {
        console.log('has valid token - show dashboard');
        resolve(Dashboard);
      } else {
        console.log('no valid token - show login');
        /* redirect to login */
        m.route.set('/');
      }
    },
    
    render: function() {
      console.log('/dashboard render called');
      return m(Layout, m(Dashboard));
    }
  }
})
