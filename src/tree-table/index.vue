<template>
  <el-table
    border
    :data="data"
    :row-style="rowStyle"
    :max-height="_maxHeight"
    style="width: 100%"
  >
    <el-table-column
      v-for="(column, index) in columns"
      v-if="!column.hidden"
      :key="column.prop"
      :label="column.label"
      :width="column.width"
      :align="column.align"
      :fixed="!!column.fixed"
    >
      <template slot-scope="scope">
        <span
          v-if="spaceIconShow(index)"
          v-for="item in scope.row._level"
          :key="item"
          class="ms-tree-space"
        />
        <div
          v-if="toggleIconShow(index,scope.row)"
          class="show-child-btn"
          @click="toggle(scope.$index)"
        >
          <i
            :class="[
              'el-icon el-icon-arrow-right',
              scope.row._expanded?'down':''
            ]"
          />
        </div>
        <span v-else-if="index===0" class="ms-tree-space"/>
        {{ scope.row[column.prop] }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  name: 'ElementTreeTable',
  props: {
    // 是否使用树形结构
    treeStructure: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 需要展示的列，每列与el-table-column相同
    // {
    //   label: '',
    //   prop: '',
    //   width: '',
    //   align: '',
    //   fixed: false
    // }
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    // 数据源与 el-table 相同
    dataSource: {
      type: Array,
      default () {
        return []
      }
    },
    // 是否全部展开树形结构
    defaultExpandAll: {
      type: Boolean,
      default () {
        return false
      }
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default () {
        return '100%'
      }
    }
  },
  computed: {
    data () {
      if (this.treeStructure) {
        let data = this.createDate(this.dataSource, null, null, this.defaultExpandAll)
        return data
      }
      return this.dataSource
    },
    _maxHeight () {
      return this.maxHeight
    }
  },
  methods: {
    // 显示行
    rowStyle (args) {
      let row = args
      if (typeof args === 'object' && args.row){
        row = args.row
      } else {
        row = args
      }
      row._show = row._parent
        ? row._parent._expanded && row._parent._show
        : true
      return row._show ? '' : 'display:none;'
    },
    // 展开下级
    toggle (trIndex) {
      let record = this.data[trIndex]
      record._expanded = !record._expanded
    },
    // 显示层级关系的空格和图标
    spaceIconShow (index) {
      if (this.treeStructure && index === 0) {
        return true
      }
      return false
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow (index, record) {
      if (this.treeStructure && index === 0 && record.children && record.children.length > 0) {
        return true
      }
      return false
    },
    createDate (data, parent, level, expandedAll) {
      let tmp = []
      Array.from(data || []).forEach((record) => {
        if (typeof record._expanded === 'undefined') {
          this.$set(record, '_expanded', expandedAll)
        }
        if (parent) {
          this.$set(record, '_parent', parent)
        }
        let _level = 0
        if (typeof level !== 'undefined' && level !== null) {
          _level = level + 1
        }
        this.$set(record, '_level', _level)
        tmp.push(record)
        if (record.children && record.children.length > 0) {
          let children = this.createDate(record.children, record, _level, expandedAll)
          tmp = tmp.concat(children)
        }
      })
      return tmp
    }
  }
}
</script>
<style scoped lang="less">
  .show-child-btn {
    @height: 22px;
    display: inline-block;
    cursor: pointer;
    width: @height;
    height: @height;
    line-height: @height;
    text-align: center;
    border: 1px solid #c5c5c5;
    border-radius: 3px;
    user-select: none;
    .el-icon-arrow-right {
      transition: transform .2s ease-in-out;
      position: relative;
      top: -1px;
      &.down {
        transform: rotate(90deg);
      }
    }
  }

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
</style>
