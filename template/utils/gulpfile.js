const gulp = require('gulp')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const path = require('path')

const copySuffix = ['scss', 'css', 'less', 'jpg', 'jpeg', 'gif', 'png']
const jsSuffix = ['ts', 'js']

function createBabelConfig(before) {
    const config = {
        presets: [['@babel/preset-env', {}]],
        plugins: ['lodash']
    }
    if (typeof before === 'function') {
        return before(config)
    }
    return config
}

function task_ts({ babelConfig, output }) {
    const copyFiles = copySuffix.map((s) => path.join(__dirname, `src/**/*.${s}`))
    const ignore = path.join(__dirname, '**/node_modules/**/*.*')
    const src = jsSuffix.map((s) => path.join(__dirname, `src/**/*.${s}`))
    // 解析ts文件
    // ------------------------------------------------------------------------
    const tsProject = ts.createProject('tsconfig.json')
    const tsTask = gulp.src(src, { ignore }).pipe(tsProject())
    // 并发当前任务
    // ------------------------------------------------------------------------
    return gulp.parallel([
        function ts() {
            return tsTask.js.pipe(babel(babelConfig)).pipe(gulp.dest(output))
        },
        function genTsDt() {
            return tsTask.dts.pipe(gulp.dest(output))
        },
        function copy() {
            return gulp.src(copyFiles, { ignore }).pipe(gulp.dest(output))
        }
    ])
}

exports.default = gulp.series(
    task_ts({
        babelConfig: createBabelConfig(),
        output: path.join(__dirname, 'lib')
    }),
    task_ts({
        babelConfig: createBabelConfig((config) => {
            config.presets[0][1].modules = false
            return config
        }),
        output: path.join(__dirname, 'es')
    })
)
