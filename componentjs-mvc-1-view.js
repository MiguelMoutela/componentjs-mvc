/*
**  ComponentJS-MVC -- Model-View-Controller Component Roles
**  Copyright (c) 2016 Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export default function (MVC) {
    /*  abstract class for components of role View  */
    return class View extends MVC.Component {
        /*  expose convenience reference to jQuery  */
        $ (...args) {
            return MVC.jQuery(...args)
        }

        /*  create a view mask with Vue  */
        mask (id, options) {
            if (!MVC.ComponentJS.plugin("vue"))
                throw new Error("mask: requires ComponentJS Vue plugin")
            if (typeof MVC.jQuery.markup !== "function")
                throw new Error("mask: requires jQuery Markup")
            let opts = Object.assign({
                template: MVC.jQuery.markup.render(id),
            }, options)
            MVC.hook("mask:vue-options", "none", { id: id, options: opts })
            var state = MVC.ComponentJS(this).state()
            var mask  = MVC.ComponentJS(this).vue(opts, state)
            MVC.hook("mask:vue-result", "none", { id: id, mask: mask })
            return mask
        }

        /*  pass-through other socket-related methods  */
        socket (...args) {
            return MVC.ComponentJS(this).socket(...args)
        }
        plug (...args) {
            return MVC.ComponentJS(this).plug(...args)
        }
    }
}

