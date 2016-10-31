'use strict';

/* Only request function is used */
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

  /* Submits a login request and returns a reactive stream as the result */
  login: function(username, password) {
    var options = {
      method: 'POST',
      url: '/api/login',
      data: {
        'username': username,
        'password': password
      }
    };

    var processAttempt = function(result) {
      console.log('result: ' + JSON.stringify(result));

      var token = result.token;
      console.log('saving / updating token: ' + token);
      api.token(token);
      var validCredentials = api.hasValidToken();
      console.log('validCredentials: ' + validCredentials);
      return validCredentials;
    };

    return api.request(options).run(processAttempt);
  },

  /* Removes the token */
  logout: function() {
    api.token(null);
  },

  /* Gets or sets the token */
  token: function(value) {
    if (arguments.length) {
      if (value == null) {
        localStorage.removeItem('token');
      } else {
        localStorage.setItem('token', value);
      }
    }
    return localStorage.getItem('token');
  },

  /* Simply checks if a token exists, without inspecting what it contains */
  hasValidToken: function() {
    return localStorage.getItem('token') != null;
  }
};

module.exports = api;
