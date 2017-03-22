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

/*  external requirements  */
import Latching          from "latching"

/*  import the API parts  */
import FactoryComponent  from "./componentjs-mvc-0-component"
import FactoryView       from "./componentjs-mvc-1-view"
import FactoryModel      from "./componentjs-mvc-2-model"
import FactoryController from "./componentjs-mvc-3-controller"
import FactoryPlugin     from "./componentjs-mvc-4-plugin"

/*  fatal error detection  */
const fatal = (err) => {
    return () => {
        throw new Error(err)
    }
}

/*  assemble the latchable API  */
const MVC = new Latching()
MVC.ComponentJS = global.ComponentJS || fatal("ComponentJS missing")
MVC.jQuery      = global.jQuery
MVC.Component   = FactoryComponent(MVC)
MVC.View        = FactoryView(MVC)
MVC.Model       = FactoryModel(MVC)
MVC.Controller  = FactoryController(MVC)
MVC.Plugin      = FactoryPlugin(MVC)

/*  export the API  */
export default MVC

