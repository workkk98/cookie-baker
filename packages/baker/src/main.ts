import Vue from 'vue'
import 'ant-design-vue/dist/antd.css';
import './styles/global.css';

import { 
  Layout,
  Button,
  Menu,
  Icon,
  Table,
  Divider,
  Input,
  Modal,
  Form,
  message,
  Select,
  Radio,
  Tooltip
} from 'ant-design-vue';

Vue.config.productionTip = false

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Divider);
Vue.use(Input);
Vue.use(Form);
Vue.use(Modal);
Vue.use(Select);
Vue.use(Radio);
Vue.use(Tooltip);

Vue.prototype.$message = message;

import App from './App'

import './plugin/trace';

new Vue({
  render: h => h(App)
}).$mount('#app')
