'use strict';

var m = require('mithril');
var api = require('./api');
var error = require('./error');

console.log('login.js');

var password = m.prop()
var username = m.prop()

var validationError = m.prop()

/* See https://github.com/jpmonette/todomvc-mithril/blob/master/js/views/main-view.js */
var watchInput = function(ontype, onenter, onescape) {
  console.log('watchInput');
  return function(e) {
    ontype(e);
    if (e.keyCode === 13 && onenter) {
      console.log('enter key pressed');
      onenter();
    }
    if (e.keyCode === 27 && onescape) onescape();
  }
};

var handleLoginAttempt = function() {
  Login.submit(username(), password());
}

var errorView = function() {
  return validationError() ? m(error, {text: validationError()}) : null;
}

var Login = {

  submit: function(user, pass) {
    var req = api.login(user, pass);

    req.run(function(validCredentials) {
      console.log('in login - validCredentials: ' + validCredentials);
      if (validCredentials) {
        // clear fields and errors
        password('');
        username('');
        validationError('');

        // show dashboard
        console.log('showing dashboard');
        m.route.set('/dashboard');
      } else {
        console.log('invalid credentials');
        validationError('Invalid credentials');
      }
    });

    req.error.run(function(data) {
      if (data) {
        console.log('in login - error: ' + data);
        validationError('Error communicating with the server');
      }
    })
  },

  view: function(vnode) {

    console.log('login.js view function');

    return [
      m(".outer-container.dark", [
        m("span.title", "S23M Production Root"),
        ":",
        m("span.logo", "RY"),
        m(".light", [
          m("span.title", "2016/01/01 20:25"),
          ":",
          m("span.logo", "SN"),
          m("div", [
            m(".dark-inline", [
              m('input[type="text"]', {
                oncreate: function(el, init) {
                  console.log('in oncreate: ' + init);
                  if (!init) {
                    el.dom.focus();
                  }
                },
                oninput: m.withAttr('value', username),
                value: username()
              }),
              ":",
              m("span.logo", "UE")
            ])
          ]),
          m(".dark-inline", [
            m("input[type='password']", {
              onkeypress: watchInput(
                m.withAttr('value', password),
                handleLoginAttempt
              ),
              value: password()
            }),
            ":",
            m("span.logo", "PD")
          ])
        ]),
        m("div", [
          m("button[id='login-btn']", {
            onclick: handleLoginAttempt
          }, "Log on")
        ])
      ]),
      errorView()
    ]
  }
}

module.exports = Login
