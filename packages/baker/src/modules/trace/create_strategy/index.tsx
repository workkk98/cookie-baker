/**
 * @file 创建create的form表单
 */

import { Vue, Component, Ref } from 'vue-property-decorator';
import { StrategyForm, strategyStorage } from '../api';
import copyThenPaste, { copyAllCookies } from '../api/copy-paste';
import CopyStrategyCtor from './copy';
import CopyDomainCtor from './copy-domain';

interface CreateStrategyForm extends StrategyForm {
  originProtocol: string;
  targetProtocol: string;
}

interface StrategyFormCtor {
  getFormData(): CreateStrategyForm;
}


// 策略窗口
@Component({
  components: {
    CopyStrategyForm: CopyStrategyCtor,
    CopyDomainForm: CopyDomainCtor
  }
})
export default class StrategyModalCtor extends Vue {


  @Ref() private copyForm!: Vue & typeof CopyStrategyCtor;

  @Ref() private copyDomainForm!: CopyDomainCtor;

  private visible = false;

  private form = {
    strategy: 'copy'
  };

  public openModal () {
    this.visible = true;
  }

  private getFormData <T> (ctor: T extends StrategyFormCtor ? StrategyFormCtor : any) {
    const strategy = this.form.strategy;
    const { origin, originProtocol, name, target, targetProtocol }  = ctor.getFormData();
    return {
      origin: originProtocol + origin,
      name,
      target: targetProtocol + target,
      strategy
    }
  }

  private async mutationCookie (origin: string) {
    const result = await copyAllCookies(origin);
    result ? this.$message.success('复制成功') :
      this.$message.success('复制失败');
  }

  private async submit () {
    const ctor = this.form.strategy === 'copy' ? this.copyForm : this.copyDomainForm;

    // try {
    //   // 待补全
    //   await ctor.isValid();
    // } catch (err) {
    //   console.error(err);
    //   return;
    // }

    // 取值
    const form = this.getFormData(ctor);
    console.log(form);
    const { origin, name, target, strategy } = form;

    // 将这条规则写入到stroage中
    await strategyStorage.set({
      origin,
      name,
      target,
      strategy
    });

    // 立即生效此条规则
    this.form.strategy === 'copy' ?
      await copyThenPaste(origin, target, name) :
      await this.mutationCookie(origin);

    this.$message.success('策略创建成功');
    this.$emit('createStrategySuccess');
    this.visible = false;
  }

  private hideModal () {
    this.visible = false;
  }

  private createComponent (strategy: string) {
    return strategy === 'copy' ?
      <copy-strategy-form ref="copyForm" /> :
      <copy-domain-form ref="copyDomainForm" />
  }

  render () {
    const ctor = this.createComponent(this.form.strategy);
    return <a-modal title="创建策略"
                    visible={this.visible}
                    onOk={this.submit}
                    onCancel={this.hideModal}>
      <a-form labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}>
        <a-form-item label="策略名称">
          <a-radio-group button-style='solid'
                         value={this.form.strategy}
                         onInput={(val: string) => this.form.strategy = val}>
            <a-radio-button value="copy">
              拷贝策略
            </a-radio-button>

            <a-radio-button value="copy-domain">
              拷贝域名
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
      </a-form>

      <keep-alive>
        {ctor}
      </keep-alive>
    </a-modal>
  }
}