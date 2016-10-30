'use strict';

var m = require('mithril');

console.log('error.js');

/* https://github.com/lhorie/mithril.js/blob/rewrite/docs/components.md#via-vnodestate */

var ComponentWithDynamicState = {
    oninit: function(vnode) {
        vnode.state.data = vnode.attrs.text
    },
    view: function(vnode) {
        return m("div.error", vnode.state.data)
    }
};

module.exports = ComponentWithDynamicState;
