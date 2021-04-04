/**
 * @file 创建create的form表单
 */

import { Vue } from 'vue-property-decorator';
import { Modal } from 'ant-design-vue';
import { CreateElement } from 'vue';
import { StrategyForm, strategyStorage } from '../api';
import copyThenPaste from '../api/copy-paste';
import { validateForm } from '../api/validate/index';

interface CreateStrategyForm extends StrategyForm {
  originProtocol: string;
  targetProtocol: string;
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
    }
  }, [
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
        createSelectOption(h, 'http://'),
        createSelectOption(h, 'https://')
      ])
  ]);
}

//创建策略名称radio
function createStrategyRadio (h: CreateElement, form: StrategyForm, key: keyof StrategyForm) {
  return h('a-radio-group', {
    props: {
      value: form[key]
    },
    attrs: {
      'button-style': 'solid',
    },
    on: {
      input: (val: string) => form[key] = val
    }
  }, [
    h('a-radio-button', {
      attrs: {
        value: 'copy'
      }
    }, ['拷贝策略'])
  ])
}
function createModalContentFn (form: CreateStrategyForm) {
  return function (h: CreateElement) {
    return h('a-form', 
    {
      props: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
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
      }, [createURLInput(h, form, 'target')]),

      h('a-form-item', {
        props: {
          label: '策略名称',
          value: form.strategy
        }
      }, [createStrategyRadio(h, form, 'strategy')]),
    ]);
  }
}

export default function openCreateModal (successCb: () => void) {

  // 这里这么做是因为select组件，originProtocol变成响应式后select选中的值才会更新上去
  const form = Vue.observable({
    origin: '',
    originProtocol: 'http://',
    name: '',
    target: '',
    strategy: 'copy',
    targetProtocol: 'http://'
  });
  return Modal?.confirm({
    title: '创建策略',
    width: 600,
    content: createModalContentFn(form),
    onOk: async () => {
      console.log(form);
      const { origin, originProtocol, name, target, strategy, targetProtocol } = form;

      if (!validateForm(name, origin, target)) {
        Vue.prototype.$message.error('请检查form表单');
        return;
      }

      // 将这条规则写入到stroage中
      await strategyStorage.set({
        origin: originProtocol + origin,
        name,
        target: targetProtocol + target,
        strategy
      });

      // 立即生效此条规则
      copyThenPaste(originProtocol + origin, targetProtocol + target, name);
      Vue.prototype.$message.success('策略创建成功');

      successCb();
    }
  });
}