'use strict';

var m = require('mithril');
var api = require('./api');

console.log('login.js');

var password = m.prop()
var username = m.prop()

/* See https://github.com/jpmonette/todomvc-mithril/blob/master/js/views/main-view.js */
var watchInput = function(ontype, onenter, onescape) {
  console.log('watchInput');
  return function(e) {
    console.log('e.keyCode: ' + e.keyCode);

    ontype(e);
    if (e.keyCode === 13 && onenter) onenter();
    if (e.keyCode === 27 && onescape) onescape();
  }
};

var handleLoginAttempt = function() {
  Login.submit(username(), password());
}

var Login = {

  submit: function(user, pass) {
    var validCredentials = api.login(user, pass);
    if (validCredentials) {
      /* clear fields and show dashboard */
      password('');
      username('');
      console.log('showing dashboard');
      m.route.set('/dashboard');
    } else {
      /* TODO: show validation error */
      console.log('invalid credentials');
    }
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
              m("input[type='text']", {
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
      ])
		]
  }
}

module.exports = Login
