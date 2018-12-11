# element-tree-table

# [demos](https://jiangzhenggeng.github.io/element-tree-table/)

```bash
npm i -S element-tree-table
```
```javascript
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
      default(){
        return ''
      }
    },
    // 单元格渲染样式
    cellStyle: {
      type: Function,
      default(){
        return ''
      }
    }
  },
  
```
