<template>
  <a-form-model ref="formModel"
                :labelCol="{ span: 5 }"
                :wrapperCol="{ span: 16 }"
                :model="form"
                :rules="rules">
    <a-form-model-item label="源url"
                       prop="origin">
      <a-input v-model="form.origin">
        <a-select slot="addonBefore"
                  v-model="form.originProtocol">
          <a-select-option value="https://">
            https://
          </a-select-option>

          <a-select-option value="http://">
            http://
          </a-select-option>
        </a-select>
      </a-input>
    </a-form-model-item>

    <a-form-model-item label="name"
                       prop="name">
      <a-input v-model="form.name"></a-input>
    </a-form-model-item>

    <a-form-model-item label="目标url"
                       prop="target">
      <a-input v-model="form.target">
        <a-select slot="addonBefore"
                  v-model="form.targetProtocol">
          <a-select-option value="https://">https://</a-select-option>

          <a-select-option value="http://">http://</a-select-option>
        </a-select>
      </a-input>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator';
import { FormModel } from 'ant-design-vue';

@Component
export default class CopyStrategyCtor extends Vue {
  @Ref() private formModel!: FormModel;

  private form = {
    origin: '',
    originProtocol: 'https://',
    name: '',
    target: '',
    targetProtocol: 'https://'
  }

  private rules = {
    origin: [
      { required: true, message: 'Please input Origin URL', trigger: 'change' }
    ],
    name: [{ required: true, message: 'Please select Activity zone', trigger: 'change' }],
    target: [{ required: true, message: 'Please input Target URL', trigger: 'change' }]
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
