/* @flow */

import * as nodeOps from 'web/runtime/node-ops'
import { createPatchFunction } from 'core/vdom/patch'
import baseModules from 'core/vdom/modules/index'
import platformModules from 'web/runtime/modules/index'

// the directive module should be applied last, after all
// built-in modules have been applied.
// baseModules 是对 directives 和 ref 相关的函数 包括 创建、更新、删除
// platformModules 是跟平台相关的在这里指的是浏览器平台，包括
// attrs, klass, events, domProps, style, transition
// 对这些特性的操作函数，创建、更新、删除
const modules = platformModules.concat(baseModules)

// nodeOps 原生操作 dom 的方法，包括
// createElement、createTextNode、createComment...
// 以及对 dom 节点的删除，追加，设置内容...
export const patch: Function = createPatchFunction({ nodeOps, modules })
