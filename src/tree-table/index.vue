<template>
  <!-- medium / small / mini -->
  <el-table
    v-on="$listeners"
    v-bind="$attrs"
    :border="border"
    :data="data"
    :row-style="_rowStyle"
    :cell-style="_cellStyle"
    :max-height="_maxHeight"
    ref="ElTable"
  >
    <el-table-column
      v-for="(column, index) in columns"
      v-if="!column.hidden"
      :key="column.prop"
      :label="column.label"
      :width="column.width"
      :align="column.align"
      :fixed="column.fixed"
      :show-overflow-tooltip="!!column.overflowTooltip"
    >
      <template slot-scope="scope">
        <template v-if="treeStructure">
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
        </template>
        <slot
          :name="`cell-${column.prop}`"
          :scope="scope"
          :column="column"
          :index="index"
          :columns="columns"
        >
          {{ scope.row[column.prop] }}
        </slot>
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
      default: false
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
      default: false
    },
    // 表格最大高度
    maxHeight: {
      type: [String, Number],
      default: ''
    },
    // 是否有边框
    border: {
      type: Boolean,
      default: true
    },
    // 1树形结构数据，2扁平化数据结构
    dataType: {
      type: Number,
      default: 1
    },
    // 父子关系父键值
    parentKey: {
      type: String,
      default: 'parentid'
    },
    // 父子关系子键值
    idKey: {
      type: String,
      default: 'id'
    },
    // 行渲染样式
    rowStyle: {
      type: Function,
      default () {
        return ''
      }
    },
    // 单元格渲染样式
    cellStyle: {
      type: Function,
      default () {
        return ''
      }
    }
  },
  computed: {
    data () {
      if (this.treeStructure) {
        let tempData = this.dataSource
        if (this.dataType == 2) {
          tempData = this.createTreeStructureDate(this.dataSource)
        }
        let data = this.createDate(tempData, null, null, this.defaultExpandAll)
        return data
      }
      return this.dataSource
    },
    _maxHeight () {
      return this.maxHeight
    },
    _height () {
      return this.height
    }
  },
  methods: {
    // 显示行
    _rowStyle (...args) {
      let arg = args[0]
      let row = arg
      if (typeof arg === 'object' && arg.row) {
        row = arg.row
      } else {
        row = arg
      }
      row._show = row._parent
        ? row._parent._expanded && row._parent._show
        : true
      return (row._show ? '' : 'display:none;') + this.rowStyle(...args)
    },
    _cellStyle (...args) {
      return this.cellStyle(...args)
    },
    // 展开下级
    toggle (trIndex) {
      let record = this.data[trIndex]
      record._expanded = !record._expanded
      this.$nextTick(() => {
        this.$refs.ElTable.doLayout()
      })
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
    },
    createTreeStructureDate (list) {
      let temp = {}
      let tree = []
      list.forEach((item, index) => {
        temp[item[this.idKey]] = list[index]
      })

      for (let i in temp) {
        if (temp[i][this.parentKey]) {
          if (!temp[temp[i][this.parentKey]].children) {
            temp[temp[i][this.parentKey]].children = []
          }
          temp[temp[i][this.parentKey]].children.push(temp[i])
        } else {
          tree.push(temp[i])
        }
      }
      return tree
    }
  }
}
</script>
<style scoped lang="less">
  .show-child-btn {
    display: inline;
    padding: 1px 3px;
    cursor: pointer;
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

