import { Vue, Component } from 'vue-property-decorator';
import CookieTable from './modules/cookie/index';
import TraceTable from './modules/trace/index';

const menu = [
  {
    icon: 'user',
    title: 'cookie'
  },
  {
    icon: 'video-camera',
    title: '追踪策略'
  }
];

@Component({
  components: {
    CookieTable,
    TraceTable
  }
})
export default class App extends Vue {
  private collapsed = false;

  private ctorKey = '0';

  public render () {
    const menu = this.createMenu();

    return <a-layout>
      <a-layout-sider collapsed={this.collapsed}
                      trigger={null}
                      collapsible>
        { menu }
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff;">
          <a-icon
            class="trigger"
            type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => (this.collapsed = !this.collapsed)}
          />
        </a-layout-header>
        <a-layout-content style="margin: 24px 16px; padding: 24px; background: rgb(255, 255, 255); min-height: calc(100vh - 112px)">
          { this.createComponent() }
        </a-layout-content>
      </a-layout>
    </a-layout>;
  }

  public createMenu () {
    const children = menu.map((val,index) => {
      return <a-menu-item 
        key={index.toString()}>
        <a-icon type={val.icon} />
        <span>{val.title}</span>
      </a-menu-item>
    });

    return <a-menu
      theme="dark"
      mode="inline"
      default-selected-keys={['0']}
      onClick={this.selectComponent}>
      {children}
    </a-menu>;
  }

  public createCookie () {
    return <cookie-table />;
  }

  public createTrace () {
    return <trace-table></trace-table>;
  }

  public createComponent () {
    const createFnList = [this.createCookie, this.createTrace];
    return createFnList[Number(this.ctorKey)]();
  }

  public selectComponent (value: { key: string }) {
    this.ctorKey = value.key; 
    this.$forceUpdate();
  }
}