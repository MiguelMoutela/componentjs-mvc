
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
# with the help of the NPM package manager (primary approach)
$ npm install componentjs-mvc

# with the help of the YARN package manager (alternative approach)
$ yarn add componentjs-mvc

# with the help of the Bower package manager (obsolete approach)
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

- `mvc.latch("establish:post-create", ({ id, comp, obj }) => { ... })`:<br/>
  Hook into the `mvc.Component::establish()` method after each component
  was created. Use this to post-adjust created components. The `comp`
  is the created component, `obj` the attached backing object derived from the
  arguments to `mvc.Component::establish()`.

- `mvc.latch("establish:pre-destroy", ({ id, comp, obj }) => { ... })`:<br/>
  Hook into the `mvc.Component::demolish()` method before each component
  will be destroyed. Use this to pre-process components. The `comp`
  is the created component, `obj` the attached backing object derived from the
  arguments to `mvc.Component::establish()`.

### Classes:

- `class Component extends mvc.Component { ... }`:<br/>
  Define an application Component class based on ComponentJS-MVC's Component class
  (usually not directly used in regular applications, but exposed for completeness reasons).

- `class View extends mvc.View { ... }`:<br/>
  Define an application View class based on ComponentJS-MVC's View class.
  The `mvc.View` class inherits from the `mvc.Component` class.

- `class Model extends mvc.Model { ... }`:<br/>
  Define an application Model class based on ComponentJS-MVC's Model class.
  The `mvc.Model` class inherits from the `mvc.Component` class.

- `class Controller extends mvc.Controller`:<br/>
  Define an application Controller class based on ComponentJS-MVC's Controller class.
  The `mvc.Controller` class inherits from the `mvc.Component` class.

### Methods (Component/View/Model/Controller Classes):

- `mvc.Component::cs(...): ComponentJS`:<br/>
  Use the configured ComponentJS by just passing-through execution
  to ComponentJS. Use this in case you want to directly access the
  ComponentJS API from within a ComponentJS-MVC component.

- `mvc.Component::establish(anchor?: Component, tree: String, classes: Object|Object[], autoincrease?: Boolean = true, autodecrease?: Boolean = false): mvc.Component`:<br/>
  This is a convenience wrapper around `ComponentJS::create()`.
  It internally basically calls `mvc.ComponentJS(this[, anchor]).create(tree, classes.map((Clz) => typeof Clz === "function" ? new Clz() : Clz))`
  and remembers the created components by their id for forthcoming use via `mvc.Component::my()`.
  It also calls `ComponentJS::state_auto_increase(autoincrease)`
  and `ComponentJS::state_auto_decrease(autodecrease)` on all created components.

- `mvc.Component::demolish(id?: String): mvc.Component`:<br/>
  This is a convenience wrapper around `ComponentJS::destroy()`.
  It either destroys just the specified component (by id) or all
  components previously created with `mvc.Component::establish()`.

- `mvc.Component::my(id: String): ComponentJS`:<br/>
  This fetches (by id) a particular component previously created with `mvc.Component::establish()`.

- `mvc.Component::exists(id: String): ComponentJS`:<br/>
  This checks (by id) whether a particular component previously was
  created with `mvc.Component::establish()` and was still not destroyed
  with `mvc.Component::demolish()`.

- `mvc.Component::state(...args: any[]): ComponentJS`:<br/>
  This is a convenience wrapper around `ComponentJS::state()`. The
  `args` positional arguments are just passed-through. The return value
  is the value of `ComponentJS::state()`.

- `mvc.Component::guard(...args: any[]): ComponentJS`:<br/>
  This is a convenience wrapper around `ComponentJS::guard()`. The
  `args` positional arguments are just passed-through. The return value
  is the value of `ComponentJS::guard()`.

- `mvc.Component::await(...args: any[]): ComponentJS`:<br/>
  This is a convenience wrapper around `ComponentJS::await()`. The
  `args` positional arguments are just passed-through. The return value
  is the value of `ComponentJS::await()`.

- `mvc.Component::observe(name: String|String[], func: Function, options?: Object): mvc.Component`:<br/>
  This is a convenience wrapper around `ComponentJS::observe()`.
  It internally basically calls `mvc.ComponentJS(this[, "model"])
  .observe({ name, func, spool: mvc.ComponentJS(this).state(), noevent:
  true, ...options })`. The twists of this wrapper are: it performs
  automatical spooling, uses no event argument in the `func` callback
  and automatically steps down to a `model` child if `this` is a
  `mvc.Controller`. Additionally, instead of a single `name`, it allows
  you to pass an array of names.

- `mvc.Component::value(...args: any[]): any`:<br/>
  This is a convenience wrapper around `ComponentJS::value()`. It
  internally basically calls `mvc.ComponentJS(this[, "model"])
  .value(...args)`. The main twist of this wrapper is: it automatically
  steps down to a `model` child if `this` is a `mvc.Controller`.

- `mvc.Component::touch(...args: any[]): mvc.Component`:<br/>
  This is a convenience wrapper around `ComponentJS::touch()`. It
  internally basically calls `mvc.ComponentJS(this[, "model"])
  .touch(...args)`. The main twist of this wrapper is: it automatically
  steps down to a `model` child if `this` is a `mvc.Controller`.

- `mvc.Component::subscribe(name: String|String[], func: Function, options?: Object): mvc.Component`:<br/>
  This is a convenience wrapper around `ComponentJS::subscribe()`. It
  internally basically calls `mvc.ComponentJS(this).subscribe({ name,
  func, spool: mvc.ComponentJS(this).state(), noevent: true, capturing:
  false, spreading: false, bubbling: true, ...options })`. The twists
  of this wrapper are: it performs automatical spooling, uses no event
  argument in the `func` callback, disables capturing and spreading, and
  enables bubbling. Additionally, instead of a single `name`, it allows
  you to pass an array of names.

- `mvc.Component::publish(name: String, args: any[], options?: Object): any`:<br/>
  This is a convenience wrapper around `ComponentJS::publish()`. It
  internally basically calls `mvc.ComponentJS(this).publish({ name,
  args, directresult: true, capturing: true, spreading: false, bubbling:
  true, ...options })`. The twists of this wrapper are: enables direct
  results, enables capturing and bubbling and disables spreading.

- `mvc.Component::register(name: String|String[], func: Function, options?: Object): mvc.Component`:<br/>
  This is a convenience wrapper around `ComponentJS::register()`.
  It internally basically calls `mvc.ComponentJS(this).register({
  name, func, spool: mvc.ComponentJS(this).state(), capturing: false,
  spreading: false, bubbling: true, ...options })`. The twists of this
  wrapper are: it performs automatical spooling, disables capturing and
  spreading, and enables bubbling. Additionally, instead of a single
  `name`, it allows you to pass an array of names.

- `mvc.Component::call(name: String, args: any[], options?: Object): any`:<br/>
  This is a convenience wrapper around `ComponentJS::call()`. It
  internally basically calls `mvc.ComponentJS(this).call({ name, args,
  capturing: true, spreading: false, bubbling: true, ...options })`. The
  twists of this wrapper are: it enables capturing, disabled spreading
  and enables bubbling.

### Methods (View Class):

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

### Methods (Model Class):

- `mvc.Model::model(spec: Object): Void`:<br/>
  This just passes-through `spec` to the `ComponentJS::model()` method.

### Methods (Controller Class):

- `mvc.Controller::sv(): Object`:<br/>
  This is a short-hand for `mvc.ComponentJS(this).property("sv")`
  and simplifys the fetching of the underlying Service API, which
  beforehand should be placed into a property on the root component via
  `mvc.ComponentJS("/").property("sv", value)`.

License
-------

Copyright (c) 2016-2018 Ralf S. Engelschall (http://engelschall.com/)

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

