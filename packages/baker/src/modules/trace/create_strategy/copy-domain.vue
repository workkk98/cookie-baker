<template>
  <a-form-model ref="formModel"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 16 }"
                :model="form"
                :rules="rules">
    <a-form-model-item label="源url"
                 prop="origin">
        <a-input v-model="form.origin">
          <a-select v-model="form.originProtocol"
                    slot="addonBefore">
            <a-select-option value="https://">
              https://
            </a-select-option>

            <a-select-option value="http://">
              http://
            </a-select-option>
          </a-select>
        </a-input>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { FormModel } from 'ant-design-vue';

@Component
export default class CopyDomainCtor extends Vue {
  @Ref() private formModel!: FormModel;

  // 部分属性是多余的，仅仅是补全
  private form = {
    origin: '',
    originProtocol: 'https://',
    name: '我全都要',
    targetProtocol: '',
    target: '剪贴板'
  }

  private rules = {
    origin: [
      { required: true, message: 'Please input Origin URL', trigger: 'change' }
    ]
  }

  public isValid () {
    return new Promise((resolve, reject) => {
      this.formModel.validate(valid => {
        if (valid) {
          resolve(valid);
        } else {
          reject();
        }
      });
    });
  }

  public getFormData () {
    return this.form;
  }
}
</script>

<style>

</style>