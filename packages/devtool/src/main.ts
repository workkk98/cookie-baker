import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';

import { Card, Row, Col, Button } from 'ant-design-vue';
import 'chrome-extension-async';
import './channel/index';

Vue.config.productionTip = false

Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Button.name, Button);

import App from './app.vue';

new Vue({
  render: h => h(App)
}).$mount('#app')