(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ComponentJSMVC = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var Latching=function(){this._reg={},this._cnt=0,this._proc={},this.proc("none",function(){},function(){}),this.proc("pass",function(n){return n[0]},function(n,t){return t}),this.proc("or",function(){return!1},function(n,t){return n||t}),this.proc("and",function(){return!0},function(n,t){return n&&t}),this.proc("mult",function(){return 1},function(n,t){return n*t}),this.proc("add",function(){return 0},function(n,t){return n+t}),this.proc("append",function(){return""},function(n,t){return n+t}),this.proc("push",function(){return[]},function(n,t){return n.push(t),n}),this.proc("concat",function(){return[]},function(n,t){return n.concat(t)}),this.proc("insert",function(){return{}},function(n,t){return n[t]=!0,n}),this.proc("assign",function(){return{}},function(n,t){Object.keys(t).forEach(function(r){n[r]=t[r]})})};Latching.prototype={proc:function(n,t,r){if(3!==arguments.length)throw new Error("proc: invalid number of arguments");if("string"!=typeof n)throw new Error("proc: invalid name argument (has to be string)");if("function"!=typeof t)throw new Error("proc: invalid init argument (has to be function)");if("function"!=typeof r)throw new Error("proc: invalid step argument (has to be function)");return this._proc[n]={init:t,step:r},this},at:function(){return this.latch.apply(this,arguments)},latch:function(n,t,r,i){if(arguments.length<2||arguments.length>4)throw new Error("latch: invalid number of arguments");void 0===this._reg[n]&&(this._reg[n]=[]);var o=this._cnt++,e={id:o,cb:t,ctx:r};return i?this._reg[n].unshift(e):this._reg[n].push(e),o},unlatch:function(n,t){if(2!==arguments.length)throw new Error("unlatch: invalid number of arguments");if(void 0===this._reg[n])throw new Error('unlatch: no such hook "'+n+'"');for(var r=-1,i=0;i<this._reg[n].length;i++)if(this._reg[n][i].id===t){r=i;break}if(r===-1)throw new Error("unlatch: no such latched callback");return this._reg[n].splice(r,1),this},hook:function(n,t){if(arguments.length<2)throw new Error("hook: invalid number of arguments");if(void 0===this._proc[t])throw new Error("hook: no such result processing defined");var r=Array.prototype.slice.call(arguments,2),i=this._proc[t].init.call(null,r);if(void 0!==this._reg[n])for(var o=0;o<this._reg[n].length;o++){var e=this._reg[n][o],c=!1,u=function(){c=!0},h=e.cb.apply(e.ctx,r.concat([i,u]));if(i=this._proc[t].step.call(null,i,h),c)break}return i}},module.exports=Latching;
},{}],2:[function(_dereq_,module,exports){
"use strict";function _toConsumableArray(n){if(Array.isArray(n)){for(var e=0,o=Array(n.length);e<n.length;e++)o[e]=n[e];return o}return Array.from(n)}function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},_createClass=function(){function n(n,e){for(var o=0;o<e.length;o++){var t=e[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,o,t){return o&&n(e.prototype,o),t&&n(e,t),e}}();exports.default=function(n){return function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"cs",value:function(){return n.ComponentJS.apply(n,arguments)}},{key:"establish",value:function(){var e=this;this.__ComponentJS_MVC_comp||(this.__ComponentJS_MVC_comp={});for(var o=arguments.length,t=Array(o),r=0;r<o;r++)t[r]=arguments[r];"string"==typeof t[0]&&"string"==typeof t[1]||t.unshift("");var a=t[0],i=t[1],s=t[2],u=t[3],c=void 0===u||u,p=t[4],l=void 0!==p&&p;"object"===(void 0===s?"undefined":_typeof(s))&&s instanceof Array||(s=[s]);var f=s.map(function(n){return"function"==typeof n?new n:n}),m=""!==a?n.ComponentJS(this,a):n.ComponentJS(this);return m.create.apply(m,[i].concat(_toConsumableArray(f))),f.forEach(function(o){var t=n.ComponentJS(o),r=t.name();e.__ComponentJS_MVC_comp[r]=o,t.state_auto_increase(c),t.state_auto_decrease(l),n.hook("establish:post-create","none",{id:r,comp:t,obj:o})}),this}},{key:"demolish",value:function(e){var o=this;if(this.__ComponentJS_MVC_comp||(this.__ComponentJS_MVC_comp={}),void 0===e)Object.keys(this.__ComponentJS_MVC_comp).forEach(function(n){return o.unconstruct(n)});else{if(void 0===this.__ComponentJS_MVC_comp[e])throw new Error('demolish: no such component "'+e+'"');var t=this.__ComponentJS_MVC_comp[e],r=n.ComponentJS(t);n.hook("demolish:pre-destroy","none",{id:e,comp:r,obj:t}),r.destroy(),delete this.__ComponentJS_MVC_comp[e]}return this}},{key:"my",value:function(n){if(this.__ComponentJS_MVC_comp||(this.__ComponentJS_MVC_comp={}),void 0===this.__ComponentJS_MVC_comp[n])throw new Error('my: no such component "'+n+'"');return this.__ComponentJS_MVC_comp[n]}},{key:"state",value:function(){var e;return(e=n.ComponentJS(this)).state.apply(e,arguments)}},{key:"guard",value:function(){var e;return(e=n.ComponentJS(this)).guard.apply(e,arguments)}},{key:"observe",value:function(e,o,t){var r=this;return"object"===(void 0===e?"undefined":_typeof(e))&&e instanceof Array||(e=[e]),e.forEach(function(e){var a=Object.assign({},{spool:n.ComponentJS(r).state(),noevent:!0},t,{name:e,func:o});return n.ComponentJS(r).marked("controller")?n.ComponentJS(r,"model").observe(a):n.ComponentJS(r).observe(a)}),this}},{key:"value",value:function(){var e,o;return n.ComponentJS(this).marked("controller")?(e=n.ComponentJS(this,"model")).value.apply(e,arguments):(o=n.ComponentJS(this)).value.apply(o,arguments)}},{key:"touch",value:function(){var e,o;return n.ComponentJS(this).marked("controller")?(e=n.ComponentJS(this,"model")).touch.apply(e,arguments):(o=n.ComponentJS(this)).touch.apply(o,arguments)}},{key:"subscribe",value:function(e,o,t){var r=this;return"object"===(void 0===e?"undefined":_typeof(e))&&e instanceof Array||(e=[e]),e.forEach(function(e){var a=Object.assign({},{spool:n.ComponentJS(r).state(),noevent:!0,capturing:!1,spreading:!1,bubbling:!0},t,{name:e,func:o});return n.ComponentJS(r).subscribe(a)}),this}},{key:"publish",value:function(e,o,t){var r=o;"object"===(void 0===o?"undefined":_typeof(o))&&o instanceof Array||(r=[o]);var a=Object.assign({},{directresult:!0,capturing:!0,spreading:!1,bubbling:!0},t,{name:e,args:r});return n.ComponentJS(this).publish(a)}},{key:"register",value:function(e,o,t){var r=this;return"object"===(void 0===e?"undefined":_typeof(e))&&e instanceof Array||(e=[e]),e.forEach(function(e){var a=Object.assign({},{spool:n.ComponentJS(r).state(),capturing:!1,spreading:!1,bubbling:!0},t,{name:e,func:o});return n.ComponentJS(r).register(a)}),this}},{key:"call",value:function(e,o,t){var r=o;"object"===(void 0===o?"undefined":_typeof(o))&&o instanceof Array||(r=[o]);var a=Object.assign({},{capturing:!0,spreading:!1,bubbling:!0},t,{name:e,args:r});return n.ComponentJS(this).call(a)}}]),e}()};
},{}],3:[function(_dereq_,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();exports.default=function(e){return function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return _inherits(n,t),_createClass(n,[{key:"$",value:function(){return e.jQuery.apply(e,arguments)}},{key:"mask",value:function t(n,r){if(!e.ComponentJS.plugin("vue"))throw new Error("mask: requires ComponentJS Vue plugin");if("function"!=typeof e.jQuery.markup)throw new Error("mask: requires jQuery Markup");var o=Object.assign({template:e.jQuery.markup.render(n)},r);e.hook("mask:vue-options","none",{id:n,options:o});var u=e.ComponentJS(this).state(),t=e.ComponentJS(this).vue(o,u);return e.hook("mask:vue-result","none",{id:n,mask:t}),t}},{key:"socket",value:function(){var t;return(t=e.ComponentJS(this)).socket.apply(t,arguments)}},{key:"plug",value:function(){var t;return(t=e.ComponentJS(this)).plug.apply(t,arguments)}}]),n}(e.Component)};
},{}],4:[function(_dereq_,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();exports.default=function(e){return function(t){function n(){return _classCallCheck(this,n),_possibleConstructorReturn(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return _inherits(n,t),_createClass(n,[{key:"model",value:function(){var t;return(t=e.ComponentJS(this)).model.apply(t,arguments)}}]),n}(e.Component)};
},{}],5:[function(_dereq_,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();exports.default=function(e){return function(t){function r(){return _classCallCheck(this,r),_possibleConstructorReturn(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return _inherits(r,t),_createClass(r,[{key:"sv",value:function(){return e.ComponentJS(this).property("sv")}}]),r}(e.Component)};
},{}],6:[function(_dereq_,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o};exports.default=function(o){return function(){o.ComponentJS.plugin("mvc",function(t){t.latch("ComponentJS:comp-created",function(t){var e=t.obj();null!==e&&"object"===(void 0===e?"undefined":_typeof(e))&&(e instanceof o.View?t.mark("view"):e instanceof o.Model?t.mark("model"):e instanceof o.Controller&&t.mark("controller"))})})}};
},{}],7:[function(_dereq_,module,exports){
(function (global){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _latching=_dereq_("latching"),_latching2=_interopRequireDefault(_latching),_componentjsMvc0Component=_dereq_("./componentjs-mvc-0-component"),_componentjsMvc0Component2=_interopRequireDefault(_componentjsMvc0Component),_componentjsMvc1View=_dereq_("./componentjs-mvc-1-view"),_componentjsMvc1View2=_interopRequireDefault(_componentjsMvc1View),_componentjsMvc2Model=_dereq_("./componentjs-mvc-2-model"),_componentjsMvc2Model2=_interopRequireDefault(_componentjsMvc2Model),_componentjsMvc3Controller=_dereq_("./componentjs-mvc-3-controller"),_componentjsMvc3Controller2=_interopRequireDefault(_componentjsMvc3Controller),_componentjsMvc4Plugin=_dereq_("./componentjs-mvc-4-plugin"),_componentjsMvc4Plugin2=_interopRequireDefault(_componentjsMvc4Plugin),fatal=function(e){return function(){throw new Error(e)}},MVC=new _latching2.default;MVC.ComponentJS=global.ComponentJS||fatal("ComponentJS missing"),MVC.jQuery=global.jQuery||fatal("jQuery missing"),MVC.Component=(0,_componentjsMvc0Component2.default)(MVC),MVC.View=(0,_componentjsMvc1View2.default)(MVC),MVC.Model=(0,_componentjsMvc2Model2.default)(MVC),MVC.Controller=(0,_componentjsMvc3Controller2.default)(MVC),MVC.Plugin=(0,_componentjsMvc4Plugin2.default)(MVC),exports.default=MVC;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./componentjs-mvc-0-component":2,"./componentjs-mvc-1-view":3,"./componentjs-mvc-2-model":4,"./componentjs-mvc-3-controller":5,"./componentjs-mvc-4-plugin":6,"latching":1}]},{},[2,3,4,5,6,7])(7)
});