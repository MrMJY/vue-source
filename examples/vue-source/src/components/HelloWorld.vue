<template>
  <div class="hello">
    <h1>展示组件主题</h1>
    <el-button type="primary">按钮</el-button>
    <el-link type="primary">主要链接</el-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
