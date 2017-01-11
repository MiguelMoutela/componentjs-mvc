
ComponentJS MVC
===============

[STILL WORK IN PROGRESS -- USE WITH CAUTION]

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
Engelschall's Model-View-Controller/Component-Tree (MVC/CT) pattern in
mind, of course. ComponentJS MVC is an opinionated companion library to
[ComponentJS](https://componentjs.com/), providing ECMAScript 6 abstract
classes for implementing the classes of ComponentJS backing objects
by using the distinct Model, View or Controller roles of the MVC/CT
pattern. The abstract classes map the major parts of the ComponentJS
API onto local methods which then provide the ComponentJS functionality
in a way which is slightly adjusted for convenience reasons and their
distinct usage under MVC/CT.

Installation
------------

```shell
$ npm install componentjs-mvc
```

Usage
-----

```js
import $   from "jquery"
import cs  from "componentjs"
import mvc from "componentjs-mvc"

mvc.jQuery      = $
mvc.ComponentJS = cs

mvc.latch("mask:vue-options", ({ id, options }) => {
    /*  example: provide id to Vue-I18Next Vue plugin  */
    options.i18nextNamespace = id
})
mvc.latch("mask:vue-result", ({ id, mask }) => {
    /*  example: integrate Perfect-Scroll-Bar jQuery plugin  */
    $(".perfect-scroll-bar", mask.$el).perfectScrollbar({})
})
```

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

This is still missing.
In the meantime check the source code, please!

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

