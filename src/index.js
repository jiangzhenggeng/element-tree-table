/* Automatically generated by './build/bin/build-entry.js' */

import TreeTable from './tree-table'

const components = [
  TreeTable
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

module.exports = {
  version: '1.0.5',
  install,
  TreeTable
}

module.exports.default = module.exports
