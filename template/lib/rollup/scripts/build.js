const { Engine,rollup,clear } = require('1k-tasks')

const task = new Engine()

task.registry('clear', clear)
task.registry('build', rollup)

task.run()
