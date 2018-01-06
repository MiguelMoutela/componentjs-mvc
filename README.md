
ComponentJS MVC
===============

Model-View-Controller Component Roles.

<p/>
<img src="https://nodei.co/npm/componentjs-mvc.png?downloads=true&stars=true" alt=""/>

<p/>
<img src="https://david-dm.org/rse/componentjs-mvc.png" alt=""/>

About
-----

[ComponentJS](https://componentjs.com/) is a generic hierarchical
component orchestration library. It has no direct notion of any
component roles, although it was designed with the roles of Ralf S.
Engelschall's Model-View-Controller/Component-Tree (MVC/CT) pattern
in mind. ComponentJS MVC is an opinionated companion library to
[ComponentJS](https://componentjs.com/), providing ECMAScript 6 abstract
classes for implementing the classes of ComponentJS backing objects
by using the distinct Model, View or Controller roles of the MVC/CT
pattern. The abstract classes map the major and essential parts of the
ComponentJS API onto local methods which then provide the ComponentJS
functionality in a way which is slightly adjusted for convenience
reasons and their distinct usage under MVC/CT. ComponentJS MVC is
intended to simplify the programming of HTML5 Single-Page-Apps (SPA) in
an Object-Oriented Programming (OOP) manner.

Installation
------------

```shell
# with the help of the NPM package manager
$ npm install componentjs-mvc

# with the help of the YARN package manager
$ yarn add componentjs-mvc

# with the help of the Bower package manager
$ bower install componentjs-mvc
```

Usage
-----

### Main Procedure:

```js
import $   from "jquery"
import cs  from "componentjs"
import          "componentjs/component.plugin.vue.js"
import mvc from "componentjs-mvc"

class App {
    static main () {
        cs.bootstrap()

        mvc.jQuery      = $
        mvc.ComponentJS = cs
        mvc.Plugin()

        mvc.latch("mask:vue-options", ({ id, options }) => {
            /*  example: provide id to Vue-I18Next Vue plugin  */
            options.i18nextNamespace = id
        })
        mvc.latch("mask:vue-result", ({ id, mask }) => {
            /*  example: integrate Perfect-Scroll-Bar jQuery plugin  */
            $(".perfect-scroll-bar", mask.$el).perfectScrollbar({})
        })
    }
}

```

### Dialog Component:

```js
import mvc from "componentjs-mvc"

class View extends mvc.View {
    ...
}
class Model extends mvc.Model {
    ...
}
class Controller extends mvc.Controller {
    ...
}
```

Application Programming Interface (API)
---------------------------------------

### Globals:

- `import mvc from "componentjs-mvc"`:<br/>
  Load the ComponentJS-MVC library.

- `mvc.ComponentJS = ...`:<br/>
  Configure ComponentJS-MVC to use a particular instance of the mandatory ComponentJS framework.
  By default ComponentJS-MVC uses the global symbol `ComponentJS`.

- `mvc.jQuery = ...`:<br/>
  Configure ComponentJS-MVC to use a particular instance of the optional
  jQuery library. By default ComponentJS-MVC uses the global symbol
  `jQuery`. jQuery is necessary only if the `mvc.View::$()` method
  should be used. jQuery and jQuery-Markup are necessary only if the
  `mvc.View::mask()` method should be used with neither `template` nor
  `render` options.

- `mvc.Plugin()`:<br/>
  Hook into ComponentJS as an `mvc` plugin to automatically mark
  dynamically created ComponentJS-MVC-based components with the proper
  marker for the ComponentJS debugger without having to override the
  `create()` method and this way cause a `super.create()` burden on the
  users of the ComponentJS-MVC classes. Call this once in your main
  procedure if you want proper colors in the ComponentJS debugger for
  ComponentJS-MVC-based components.

### Hooks:

- `mvc.latch("mask:vue-options", (({ id, options }) => { ... })`:<br/>
  Hook into the `mvc.View::mask()` method just before `mask = ComponentJS::vue(options)`
  is called internally. Use this to set particular options for VueJS.
  For instance, use `mvc.latch("mask:vue-options", ({ id, options }) => { options.i18nextNamespace = id })`
  to set the I18N namespace when using VueJS and the Vue-I18Next plugin together.

- `mvc.latch("mask:vue-result", (({ id, result }) => { ... })`:<br/>
  Hook into the `mvc.View::mask()` method just after `mask
  = ComponentJS::vue(options)` is called internally. Use
  this to post-process the VueJS instance. For instance,
  use `mvc.latch("mask:vue-result", (({ id, result }) => {
  $(".perfect-scroll-bar", mask.$el).perfectScrollbar({ ... }) })` to
  apply the jQuery Perfect-Scrollbar plugin.

### Classes:

- `class Component extends mvc.Component { ... }`:<br/>
  Define an application Component class based on ComponentJS-MVC's Component class
  (usually not used in regular applications, but exposed for completeness reasons).

- `class View extends mvc.View { ... }`:<br/>
  Define an application View class based on ComponentJS-MVC's View class.

- `class Model extends mvc.Model { ... }`:<br/>
  Define an application Model class based on ComponentJS-MVC's Model class.

- `class Controller extends mvc.Controller`:<br/>
  Define an application Controller class based on ComponentJS-MVC's Controller class.

### Methods:

- `mvc.View::$(selector: String, baseElement?: DOMElement): jQuery`:<br/>
  Use the configured jQuery by just passing-through execution to jQuery.
  Use this in case you want to directly manipulate the DOM via jQuery
  from within a View component. Use with caution, as jQuery and VueJS
  can conflict.

- `mvc.View::mask(id: String, options?: any): VueJS`:<br/>
  Create a UI Mask with the help of VueJS. The `id` has to be unique
  within the UI, although it is not directly used by ComponentJS-MVC
  itself. It is intended to be passed through to the `mask:vue-options`
  hook and used there accordingly. The `options` are just passed-through
  to the `ComponentJS::vue()` method. Hence, this method requires the
  ComponentJS `vue` plugin to be loaded first.

- `mvc.View::socket(ctx: Object, plug: Function, unplug: Function): Number`:<br/>
  `mvc.View::socket(options: { ctx: Object, plug?: Function, unplug?: Function, ... }): Number`:<br/>
  This is a convenience wrapper around `ComponentJS::socket()`. The
  `ctx`, `plug` and `unplug` positional arguments are just converted
  to the `options` form of method calling. If the `options` argument
  has no `spool` field, it is automatically created with the value of
  `mvc.ComponentJS(this).state()`. The return value is the value of
  `ComponentJS::socket()`.

- `mvc.View::link(target: Object, socket: String): Number`:<br/>
  `mvc.View::link(options: { target: Object, socket: String, ... }): Number`:<br/>
  This is a convenience wrapper around `ComponentJS::link()`. The
  `target` and `socket` positional arguments are just converted
  to the `options` form of method calling. If the `options` argument
  has no `spool` field, it is automatically created with the value of
  `mvc.ComponentJS(this).state()`. The return value is the value of
  `ComponentJS::link()`.

- `mvc.View::plug(object: Object): Number`:<br/>
  `mvc.View::plug(options: { object: Object, ... }): Number`:<br/>
  This is a convenience wrapper around `ComponentJS::plug()`. The
  `object` positional argument is just converted
  to the `options` form of method calling. If the `options` argument
  has no `spool` field, it is automatically created with the value of
  `mvc.ComponentJS(this).state()`. The return value is the value of
  `ComponentJS::plug()`.

License
-------

Copyright (c) 2016-2017 Ralf S. Engelschall (http://engelschall.com/)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

