'use strict';

var m = require('mithril');

console.log('login.js');

var password = m.prop()
var username = m.prop()

var Login = {

  submit: function(username, password) {
    console.log('submit(' + username + ', ' + password + ')');
    
    var data = JSON.stringify({"username": username, "password": password});
    
    console.log('data: '+ data);
  
    var req = m.request({
      method: "POST",
      url: "/api/login",
      data: {"username": username, "password": password}
    });
    
    console.log('error: ' + req.error());
    req.run(function(result) {
      console.log('result: ' + JSON.stringify(result));
    });
    
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
          m("button[id='login-btn']", {onclick: function(){ Login.submit(username(), password()) } }, "Log on")
        ])
      ])
		]
  }
}

module.exports = Login