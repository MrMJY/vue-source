import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) // Vue.prototype._init
// Vue.prototype.$data、Vue.prototype.$props 添加 getter 不允许 setter
// Vue.prototype.$set、Vue.prototype.$delete、Vue.prototype.$watch
// $set、$delete 在 observer/index 中定义
// $watch 在 state 中定义
stateMixin(Vue)
// Vue.prototype.$on、Vue.prototype.$once、Vue.prototype.$off、Vue.prototype.$emit
// 全部在 events 中定义
eventsMixin(Vue)
// Vue.prototype._update、Vue.prototype.$forceUpdate、Vue.prototype.$destroy
// 全部在 lifecycle 中定义
lifecycleMixin(Vue)
// Vue.prototype.$nextTick、Vue.prototype._render
// 全部在 render 中定义
renderMixin(Vue)

export default Vue
