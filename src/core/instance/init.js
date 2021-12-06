/* @flow */

import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'

let uid = 0

// Vue.prototype._init
export function initMixin (Vue: Class<Component>) {
  // 初始化new Vue() / 初始化组件，继承自Vue的子构造器
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options 合并配置项
    // 组件实例时，_isComponent = true
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      // 优化内部组件实例化，因为组件选项合并非常慢，而且没有任何内部组件选项的需要特殊处理
      initInternalComponent(vm, options)
    } else {
      // 构造函数上的一些 options, 用户传入的 options 合并到 vm.$options 上
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    // 为 vm 初始化 $parent、$root、$children、$refs、_watcher、_inactive、_directInactive
    // _isMounted、_isDestroyed、_isBeingDestroyed 设置默认值
    initLifecycle(vm)
    // 为 vm 初始化 _events、_hasHookEvent、对 vm 做一些事件的监听，添加，删除操作
    initEvents(vm)
    // 为 vm 初始化 _vnode、_staticTrees、$slots、$scopedSlots、_c、$createElement、$attrs、$listeners
    initRender(vm)
    callHook(vm, 'beforeCreate')
    // 将 $options 中的 inject(注入) 混入到 vm 上
    initInjections(vm) // resolve injections before data/props
    // 为 vm 初始化 _watchers、_data、_props、watch、computed、methods
    // 将 $options 中的 methods 代理到 vm 上并且绑定 this 为 vm
    // 将 $options 中的 props 代理到 vm 上，以及在 vm 上挂载 _props
    // 将 $options 中的 data 代理到 vm 上，以及在 vm 上挂载 _data
    // 将 $options 中的每个 computed 创建 watcher 监视，并且挂在到 vm 上
    // 将 $options 中的每个 watch 创建 watcher 监视
    initState(vm)
    // 将 $options 中的 provide 挂在到 vm._provide 上
    initProvide(vm)
    callHook(vm, 'created')
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
    // 开始渲染
    // 如果是组件，$options.el 没有值，mount 操作交还给组件
    if (vm.$options.el) {
      vm.$mount(vm.$options.el) // 渲染
    }
  }
}
// 初始化组件
// 为组件实例添加$options，并且继承子构造器上的静态options、_renderChildren
// 为vm.$options添加parent、_parentVnode、propsData、_parentListeners、_componentTag等
export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  const opts = vm.$options = Object.create(vm.constructor.options)
  // doing this because it's faster than dynamic enumeration.
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}

// 获取构造器上的options，必要条件下更新options
export function resolveConstructorOptions (Ctor: Class<Component>) {
  // Ctor 构造器（构造函数- Vue、Sub ）
  let options = Ctor.options
  // 如果是组件，那么构建组件的构造器 Sub 内会有 super 属性，指向 Vue
  if (Ctor.super) {
    const superOptions = resolveConstructorOptions(Ctor.super)
    const cachedSuperOptions = Ctor.superOptions
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions
      // check if there are any late-modified/attached options (#4976)
      const modifiedOptions = resolveModifiedOptions(Ctor)
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions)
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  let modified
  const latest = Ctor.options
  const sealed = Ctor.sealedOptions
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  return modified
}
