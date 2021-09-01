<template>
  <div class="devtool__container">
    <div class="devtool__header">
      dmp-devtools~
    </div>
    <a-row :gutter="16"
           class="devtool__content">
      <a-col :span="8">
        <a-card v-for="item of stack"
                :key="item.time"
                :title="item.url"
                :bordered="false">
          <p>一些具体信息</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <button @click="excuteWrapper">excute {{ eventCount }}</button>
        <div v-for="item of stack"
             :key="item.time">
          <div>
            {{ item.time }}
          </div>
          <div>
            {{ item.value }}
          </div>
          <div>
            {{ item.type }}
          </div>
        </div>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
import { execute, eventBus } from './channel/index';
import { stack } from './detect/index.ts';

export default {
  name: 'devtool-panel',
  data () {
    return {
      eventCount: 0,
      stack: stack
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
  height: 100vh;
}

.devtool__header {
  height: 54px;
  line-height: 54px;
  background-color: white;
  box-shadow: 0 1px 2px hsla(0,0%,0%,0.05),0 1px 4px hsla(0,0%,0%,0.05),0 2px 8px hsla(0,0%,0%,0.05);
}

.devtool__content {
  margin: 16px 8px 0;
}
</style>