'use strict';

var m = require('mithril');

console.log('api.js');

var api = {

  /* Replacement for m.request when the API is involved */
  request: function(options) {

    options.config = function(xhr) {
      /* TODO change header */
      xhr.setRequestHeader('Authorization', 'authorization:Token ' + api.token());
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    };

    /* Want to clear token if we get a 401 on any request */
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

  /* Submits a login request and returns a boolean indicating whether the attempt was successful */
  login: function(username, password) {
    console.log('login(' + username + ', ' + password + ')');

    var data = {"username": username, "password": password};
    var options = {method: "POST", url: "/api/login", data: data, async: false};

    var requestValue = api.request(options).run(function(result) {
      console.log('result: ' + JSON.stringify(result));

      var token = result.token;
      console.log('saving / updating token: ' + token);
      api.token(token);
      var validCredentials = api.hasValidToken();
      console.log('validCredentials: ' + validCredentials);
      return validCredentials;
    }).catch(function(e) {
      console.log('error: ' + e);
      return false;
    }).valueOf();

    console.log('requestValue: ' + requestValue);
    return requestValue;
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
