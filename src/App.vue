<style>

</style>
<template>
  <div>
    <element-tree-table
      :columns="columns"
      :max-height="maxHeight"
      :data-source="dataSource"
      :row-style="rowStyle"
      :tree-structure="true"
      :default-expand-all="true"
      :data-type="2"
    >
      <span slot-scope="{ scope,column }">{{ scope.row[column.props] }}scs</span>
    </element-tree-table>
  </div>
</template>
<script>
import { columns,getMockTreeData } from './mock'
import $ from 'jquery'

export default {
  data () {
    return {
      maxHeight: '100%',
      columns,
      dataSource: getMockTreeData().data
    }
  },
  mounted(){
    $(window).resize(() => {
      this.maxHeight = $(window).height() - 30
    })
  },
  methods: {
    rowStyle(scs){

    }
  }
}
</script>
