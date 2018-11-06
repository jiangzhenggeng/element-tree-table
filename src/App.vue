<style>

</style>
<template>
  <div>
    <element-tree-table
      :columns="columns"
      :data-source="dataSource"
      :tree-structure="true"
      :default-expand-all="true"
    />
  </div>
</template>
<script>
import {columns,getMockTreeData} from './mock'
export default {
  data(){
    return {
      columns,
      dataSource: getMockTreeData().data
    }
  }
}
</script>
