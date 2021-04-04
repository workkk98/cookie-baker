import Vue from 'vue';
import { Modal } from 'ant-design-vue';
import { CreateElement } from 'vue/types/umd';
import { setCookie } from '../api/index';

type CookieKey = 'name' | 'value' | 'domain' | 'path';

function createInput (h: CreateElement, key: CookieKey, form: chrome.cookies.Cookie, options?: any) {
  return h('a-input', {
    props: {
      value: form[key],
      disabled: options?.disabled
    },
    on: {
      'change.value': (value: string) => form[key] = value
    }
  });
}

function createModalContentFn (form: chrome.cookies.Cookie) {
  return function (h: CreateElement) {
    return h('a-form', {
      props: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
      }
    }, [
      h('a-form-item', {
        props: {
          label: '名称'
        }
      }, [createInput(h, 'name', form)]),

      h('a-form-item', {
        props: {
          label: '值'
        }
      }, [createInput(h, 'value', form)]),

      h('a-form-item', {
        props: {
          label: '域名'
        }
      }, [createInput(h, 'domain', form, { disabled: true })]),

      h('a-form-item', {
        props: {
          label: '路径'
        }
      }, [createInput(h, 'path', form, { disabled: true })])
    ])
  }
}

export default function openEditModal (cookie: chrome.cookies.Cookie) {
  const form = Object.assign({}, cookie);
  return Modal?.confirm({
    title: '编辑cookie',
    width: 600,
    content: createModalContentFn(form),
    onOk: async () => {
      try {
        await setCookie(form)
        Vue.prototype.$message.success('设置cookie成功');
      } catch (error) {
        Vue.prototype.$messagee.error('编辑cookie失败');
      }
    }
  });
}