<template>
  <div class="devtool__container">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="Card title"
                :bordered="false">
          <p>content</p>
        </a-card>
      </a-col>
      <a-col :span="8"></a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'devtool-panel'
}
</script>

<style scoped>
.devtool__container {
  background-color: rgb(236, 236, 236);
  padding: 20px;
  height: 100vh;
}
</style>