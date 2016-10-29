'use strict';

var m = require('mithril');
var api = require('./api');

console.log('login.js');

var password = m.prop()
var username = m.prop()

var Login = {

  submit: function(username, password) {
    var validCredentials = api.login(username, password);
    if (validCredentials) {
      /* show dashboard */
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
                oninput: m.withAttr("value", username),
                value: username()
              }),
              ":",
              m("span.logo", "UE")
            ])
          ]),
          m(".dark-inline", [
            m("input[type='password']", {
              oninput: m.withAttr("value", password),
              value: password()
            }),
            ":",
            m("span.logo", "PD")
          ])
        ]),
        m("div", [
          m("button[id='login-btn']", {
            onclick: function(){ Login.submit(username(), password()) }
          }, "Log on")
        ])
      ])
		]
  }
}

module.exports = Login
