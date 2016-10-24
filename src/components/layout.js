'use strict';

var m = require('mithril');

console.log('layout.js');

module.exports = {
  view: function(vnode) {
  
    console.log('layout.js view function');
    
    return m(".layout", vnode.children)
  }
}