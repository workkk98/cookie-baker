import { Vue, Component } from 'vue-property-decorator';
import openEditForm from './edit-cookie';
import { fetchAllCookie, removeCookie } from './api';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    ellipsis: true
  },
  {
    title: '值',
    dataIndex: 'value',
    key: 'value',
    width: 400,
    ellipsis: true
  },
  {
    title: '域名',
    dataIndex: 'domain',
    key: 'domain',
    width: 300,
    ellipsis: true
  },
  {
    title: '路径',
    key: 'path',
    dataIndex: 'path',
    ellipsis: true
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 160
  },
];

let data: Partial<chrome.cookies.Cookie>[];

@Component
export default class CookieTable extends Vue {
  private searchVal = '';

  created () {
    this.fetchData();
  }

  public filterData (value: string) {
    this.searchVal = value;
    // TODO: 这个正则事实上有些问题，包括对value无效字符的过滤等。
    const regex = new RegExp(value.replace('.', '\\.'));
    this.fetchData(regex);
  }

  public async fetchData (pattern?: RegExp) {
    const result = await fetchAllCookie();

    data = result
      .filter(val => pattern? pattern.test(val.domain) : true)
      .map((val, index) => {
      return {
        ...val,
        key: index
      }
    });
    this.$forceUpdate();
  }

  public removeCookie (cookie: chrome.cookies.Cookie) {
    removeCookie(cookie);

    // 删除成功后，重新搜索
    this.filterData(this.searchVal);
  }

  public render () {
    return <div>
      <a-input-search 
        style="width: 200px"
        placeholder="请输入域名"
        onSearch={this.filterData} />
      <a-table
        style="margin-top: 16px"
        columns={columns}
        data-source={data}
        scopedSlots={
          {
            action: this.createActionColumns()
          }
        }>
      </a-table>
    </div>
  }

  public createActionColumns () {
    return (text: string, record: chrome.cookies.Cookie) => {
      return <span>
        <a onClick={() => { openEditForm(record)} }>编辑</a>
        <a-divider type="vertical" />
        <a onClick={() => { this.removeCookie(record)} }>删除</a>
      </span>
    }
  }
}