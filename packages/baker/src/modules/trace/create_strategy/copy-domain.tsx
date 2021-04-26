/**
 * 拷贝某个域名下的所有域名
 */

import { Input } from "ant-design-vue";
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Component, Ref, Vue} from "vue-property-decorator";

@Component
export default class CopyDomainForm extends Vue {
  @Ref() private originInput!: Input;

  private formCtor!: WrappedFormUtils;

  // 部分属性是多余的，仅仅是补全
  private form = {
    origin: '',
    originProtocol: 'https://',
    name: '我全都要',
    targetProtocol: '',
    target: '剪贴板'
  }

  public getFormData () {
    return this.form;
  }

  created () {
    this.formCtor = this.$form.createForm(this);
  }

  mounted () {
    // jsx不知道咋写change.value这个事件
    this.originInput.$on('change.value', (value: string) => {
      this.form.origin = value;
    });
  }

  render () {
    return <a-form labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}>
        <a-form-item label="源url">
          <a-input ref="originInput"
                   value={this.form.origin}>
            <a-select value={this.form.originProtocol}
                      slot="addonBefore">
              <a-select-option value="https://">
                <span>https://</span>
              </a-select-option>

              <a-select-option value="http://">
                <span>https://</span>
              </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
      </a-form>
  }

  public isValid () {
    return true
  }
}