import Mock from 'mockjs'

export const columns = [
  {
    label: '合约编号',
    prop: 'code',
    width: '200px',
    align: 'left',
    fixed: true
  }, {
    label: '合约名称',
    prop: 'contractPlannedName',
    width: '280px'
  }, {
    label: '合同内容及范围',
    prop: 'content',
    width: '200px'
  }, {
    label: '规划金额',
    prop: 'plannedAmount',
    width: '186px'
  }
]

export function getMockTreeData () {
  let template = {
    code: 0,
    message: '获取成功',
    [`data|3-10`]: [
      {
        'code': '@ctitle',
        'contractPlannedName': '@cname',
        'content|1': ['@cname', '@name', '哈哈哈'],
        'plannedAmount|1': ['@cname', '@name', '哈哈哈'],
        'children|2-5': [
          {
            'code': '@ctitle',
            'contractPlannedName': '@cname',
            'content|1': ['@cname', '@name', '哈哈哈'],
            'plannedAmount|1': ['@cname', '@name', '哈哈哈'],
            'children|2-5': [
              {
                'code': '@ctitle',
                'contractPlannedName': '@cname',
                'content|1': ['@cname', '@name', '哈哈哈'],
                'plannedAmount|1': ['@cname', '@name', '哈哈哈']
              }
            ]
          }
        ]
      }
    ]
  }
  return Mock.mock(template)
}
