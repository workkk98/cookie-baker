<template>
  <div class="devtool__container">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="Card title"
                :bordered="false">
          <p>content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <button @click="excuteWrapper">excute {{ eventCount }}</button>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import { execute, eventBus } from './channel/index';

export default {
  name: 'devtool-panel',
  data () {
    return {
      eventCount: 0
    };
  },
  methods: {
    excuteWrapper () {
      execute('excute in devtool page');
    }
  },
  mounted () {
    eventBus.subscribe('reload', (data) => {
      this.eventCount++;
      const name = 'tencent',
            value = 'abc123';
      
      chrome.devtools.inspectedWindow.eval(
        // 表达式
        `
          localStorage.setItem("${name}", "${value}");
          console.log(${data});
        `
      );
    });
  }
}
</script>

<style scoped>
.devtool__container {
  background-color: rgb(236, 236, 236);
  padding: 20px;
  height: 100vh;
}
</style>