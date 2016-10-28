'use strict';

var m = require('mithril');

console.log('api.js');

var api = {

  request: function(options) {

    options.config = function(xhr) {
      /* TODO change header */
      xhr.setRequestHeader('Authorization', 'authorization:Token ' + api.token());
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    };

    /* Want to clear token if we get a 401 on a request */
    options.extract = function(xhr) {
      var s = xhr.status;
      console.log('status: ' + status);
      if (s === 401) {
        console.log('clearing token on 401 request');
        api.token(null);
      }

      /* Standard response */
      return JSON.parse(xhr.responseText);
    };

    return m.request(options);
  },

  token: function(value) {
    if (arguments.length) {
      localStorage.setItem('token', value);
    }
    return localStorage.getItem('token');
  },

  hasValidToken: function() {
    return 'null' !== localStorage.getItem('token');
  }
};

module.exports = api;
