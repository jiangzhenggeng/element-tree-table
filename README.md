# element-tree-table

```bash
npm -S element-tree-table
```
```javascript
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
  
```
