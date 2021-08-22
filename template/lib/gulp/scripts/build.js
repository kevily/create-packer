const { Engine, ts, babel, clear } = require('1k-tasks')

function createTask({ format }) {
    const task = new Engine({ outputDir: format === 'esm' ? 'es' : 'cjs' })

    task.registry('clear', clear)
    task.registry('build: ts', ts, {
        genJs: false
    })
    task.registry('build: babel', babel, {
        format
    })

    return task
}

createTask({ format: 'auto' }).run({ sync: true, tip: 'Building cjs...\n' })
createTask({ format: 'esm' }).run({ sync: true, tip: 'Building esm...\n' })
