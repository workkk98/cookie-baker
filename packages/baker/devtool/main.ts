import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';

import { Card, Row, Col } from 'ant-design-vue';

Vue.config.productionTip = false

Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);

import App from './src/app.vue';

new Vue({
  render: h => h(App)
}).$mount('#app')