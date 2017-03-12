/*
**  ComponentJS-MVC -- Model-View-Controller Component Roles
**  Copyright (c) 2016-2017 Ralf S. Engelschall <rse@engelschall.com>
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
    /*  abstract class for components of any role  */
    return class Component {
        /*  expose reference to ComponentJS main function  */
        cs (...args) {
            return MVC.ComponentJS(...args)
        }

        /*  establish/demolish/lookup own child/descendant components  */
        establish (...args) {
            if (!this.__ComponentJS_MVC_comp)
                this.__ComponentJS_MVC_comp = {}
            if (!(typeof args[0] === "string" && typeof args[1] === "string"))
                args.unshift("")
            let [ anchor, tree, classes, autoincrease = true, autodecrease = false ] = args
            if (!(typeof classes === "object" && classes instanceof Array))
                classes = [ classes ]
            let objs = classes.map((Clz) =>
                typeof Clz === "function" ? new Clz() : Clz)
            let comp = (anchor !== "" ? MVC.ComponentJS(this, anchor) : MVC.ComponentJS(this))
            comp.create(tree, ...objs)
            objs.forEach((obj) => {
                let comp = MVC.ComponentJS(obj)
                let id = comp.name()
                this.__ComponentJS_MVC_comp[id] = obj
                comp.state_auto_increase(autoincrease)
                comp.state_auto_decrease(autodecrease)
                MVC.hook("establish:post-create", "none", { id, comp, obj })
            })
            return this
        }
        demolish (id) {
            if (!this.__ComponentJS_MVC_comp)
                this.__ComponentJS_MVC_comp = {}
            if (id === undefined)
                Object.keys(this.__ComponentJS_MVC_comp).forEach((id) =>
                    this.unconstruct(id))
            else {
                if (this.__ComponentJS_MVC_comp[id] === undefined)
                    throw new Error(`demolish: no such component "${id}"`)
                let obj = this.__ComponentJS_MVC_comp[id]
                let comp = MVC.ComponentJS(obj)
                MVC.hook("demolish:pre-destroy", "none", { id, comp, obj })
                comp.destroy()
                delete this.__ComponentJS_MVC_comp[id]
            }
            return this
        }
        my (id) {
            if (!this.__ComponentJS_MVC_comp)
                this.__ComponentJS_MVC_comp = {}
            if (this.__ComponentJS_MVC_comp[id] === undefined)
                throw new Error(`my: no such component "${id}"`)
            return this.__ComponentJS_MVC_comp[id]
        }

        /*  1:1 pass-through state-related methods  */
        state (...args) {
            return MVC.ComponentJS(this).state(...args)
        }
        guard (...args) {
            return MVC.ComponentJS(this).guard(...args)
        }

        /*  wrap model-related methods  */
        observe (name, func, options) {
            if (!(typeof name === "object" && name instanceof Array))
                name = [ name ]
            name.forEach((name) => {
                let opts = Object.assign({}, {
                    spool:   MVC.ComponentJS(this).state(),
                    noevent: true
                }, options, {
                    name:    name,
                    func:    func
                })
                if (MVC.ComponentJS(this).marked("controller"))
                    return MVC.ComponentJS(this, "model").observe(opts)
                else
                    return MVC.ComponentJS(this).observe(opts)
            })
            return this
        }
        value (...args) {
            if (MVC.ComponentJS(this).marked("controller"))
                return MVC.ComponentJS(this, "model").value(...args)
            else
                return MVC.ComponentJS(this).value(...args)
        }
        touch (...args) {
            if (MVC.ComponentJS(this).marked("controller"))
                return MVC.ComponentJS(this, "model").touch(...args)
            else
                return MVC.ComponentJS(this).touch(...args)
        }

        /*  wrap event-related methods  */
        subscribe (name, func, options) {
            if (!(typeof name === "object" && name instanceof Array))
                name = [ name ]
            name.forEach((name) => {
                let opts = Object.assign({}, {
                    spool:     MVC.ComponentJS(this).state(),
                    noevent:   true,
                    capturing: false,
                    spreading: false,
                    bubbling:  true
                }, options, {
                    name:      name,
                    func:      func
                })
                return MVC.ComponentJS(this).subscribe(opts)
            })
            return this
        }
        publish (name, args, options) {
            let argv = args
            if (!(typeof args === "object" && args instanceof Array))
                argv = [ args ]
            let opts = Object.assign({}, {
                directresult: true,
                capturing:    true,
                spreading:    false,
                bubbling:     true
            }, options, {
                name:         name,
                args:         argv
            })
            return MVC.ComponentJS(this).publish(opts)
        }

        /*  wrap service-related methods  */
        register (name, func, options) {
            if (!(typeof name === "object" && name instanceof Array))
                name = [ name ]
            name.forEach((name) => {
                let opts = Object.assign({}, {
                    spool:     MVC.ComponentJS(this).state(),
                    capturing: false,
                    spreading: false,
                    bubbling:  true
                }, options, {
                    name:      name,
                    func:      func
                })
                return MVC.ComponentJS(this).register(opts)
            })
            return this
        }
        call (name, args, options) {
            let argv = args
            if (!(typeof args === "object" && args instanceof Array))
                argv = [ args ]
            let opts = Object.assign({}, {
                capturing: true,
                spreading: false,
                bubbling:  true
            }, options, {
                name:      name,
                args:      argv
            })
            return MVC.ComponentJS(this).call(opts)
        }
    }
}

