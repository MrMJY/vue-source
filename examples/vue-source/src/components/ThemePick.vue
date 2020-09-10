<template>
  <header class="header">
    <el-button icon="el-icon-s-tools" circle @click="showConifg"></el-button>
    <el-dialog
      title="设置"
      width="200"
      :visible.sync="showConifgDia"
    >
      <el-form>
        <el-form-item label="选择主题">
          <el-select v-model="selectedTheme" @change="changeTheme">
            <el-option
              v-for="item in preTheme"
              :key="item.color"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义主题">
          <el-color-picker v-model="customTheme" :predefine="preTheme.map(item => item.color)"></el-color-picker>
        </el-form-item>
      </el-form>
    </el-dialog>
  </header>
</template>

<script>
import themePick from '../utils/changeTheme'
const preTheme = [
  { color: '#2BF511', name: 'spring', url: '/static/custom-themes/green/index.css' },
  { color: '#12DEA1', name: 'summer', url: '' },
  { color: '#F2E711', name: 'autumn', url: '' },
  { color: '#E2E9EE', name: 'winter', url: '' }
]
export default {
  name: 'ThemePick',
  data() {
    return {
      selectedTheme: '',
      customTheme: '#409EFF',
      preTheme,
      showConifgDia: false
    }
  },
  watch: {
    async customTheme(newVal, oldVal) {
      console.log(newVal, oldVal)
      if(!newVal) return
      let cssString = await themePick.getCSSString('https://unpkg.com/element-ui/lib/theme-chalk/index.css', oldVal)
      cssString = themePick.updateStyle(cssString, oldVal, newVal)
      themePick.setStyle(newVal, cssString)
      themePick.destoryStyle(oldVal)
    }
  },
  methods: {
    showConifg() {
      this.showConifgDia = true
    },
    changeTheme() {
      if (this.selectedTheme === 'summer') {
        const link = document.createElement('link')
        link.setAttribute('type', 'text/css')
        link.setAttribute('rel', 'stylesheet')
        link.setAttribute('id', 'summer')
        link.setAttribute('href', '/static/custom-themes/green/index.css')
        link.onload = function() { console.log('ok') }
        console.dir(link)
        document.getElementsByTagName('head')[0].appendChild(link)
      }
    }
  }
}
</script>

<style scoped>
.header {
  height: 60px;
  text-align: right;
}
</style>
