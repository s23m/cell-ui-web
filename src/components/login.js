'use strict';

var m = require('mithril');

console.log('login.js');

module.exports = {
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
              m("input[type='text'][value='Joe Bloggs']"),
              ":",
              m("span.logo", "UE")
            ])
          ]),
          m(".dark-inline", [
            m("input[type='password'][value='abc']"),
            ":",
            m("span.logo", "PD")
          ])
        ]),
        m("div", [
          m("button[id='login-btn']", "Log on")
        ])
      ])
		]
  }
}