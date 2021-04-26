/**
 * @file 拷贝策略
 */

import type { CreateElement } from 'vue';
import Vue, { VNode } from 'vue';

interface CreateStrategyForm {
  originProtocol: string;
  targetProtocol: string;
  origin: string;
  name: string;
  target: string;
}

function createSelectOption (h: CreateElement, value: string) {
  return h('a-select-option', {
    props: {
      value
    }
  }, [value]);
}

// 创建目标url和源url的输入框
function createURLInput (h: CreateElement, form: CreateStrategyForm, key: 'origin' | 'target') {
  return h('a-input', {
      props: {
        value: form[key]
      },
      on: {
        'change.value': (value: string) => form[key] = value
      },
    },
    [
      h('a-select', 
        {
          slot: 'addonBefore',
          props: {
            // 'default-value': 'http://'
            value: form[(key+'Protocol' as 'originProtocol' | 'targetProtocol')]
          },
          on: {
            change: (val: string) => { 
              form[(key+'Protocol' as 'originProtocol' | 'targetProtocol')] = val;
            }
          }
        },
        [
          createSelectOption(h, 'https://'),
          createSelectOption(h, 'http://')
        ])
    ]);
}

interface CopyStrategyFormCtor extends Vue {
  form: CreateStrategyForm;
}

const CopyStrategyForm = {
  data () {
    return {
      form: {
        origin: '',
        originProtocol: 'https://',
        name: '',
        target: '',
        targetProtocol: 'https://'
      }
    }
  },
  methods: {
    isValid () {
      return true;
    }
  }
};

export default Vue.extend(CopyStrategyForm).extend({
  methods: {
    getFormData () {
      return this.form;
    }
  },
  render (h: CreateElement): VNode {
    const form = this.form;
    return h('a-form', {
      props: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 16
        }
      }
    },
      [
        h('a-form-item', {
          props: {
            label: '源url'
          }
        }, [createURLInput(h, form, 'origin')]),

        h('a-form-item', {
          props: {
            label: 'name'
          }
        }, [h('a-input', {
          props: {
            value: form.name
          },
          on: {
            'change.value': (value: string) => form.name = value
          }
        })]),

        h('a-form-item', {
          props: {
            label: '目标url'
          }
        }, [createURLInput(h, form, 'target')])
      ]);
  }
});