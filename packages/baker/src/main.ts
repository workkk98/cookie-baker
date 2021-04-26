import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import './styles/global.css';

import Antd from 'ant-design-vue';

Vue.config.productionTip = false

Vue.use(Antd);

import App from './App'

import './plugin/trace';

new Vue({
  render: h => h(App)
}).$mount('#app')
