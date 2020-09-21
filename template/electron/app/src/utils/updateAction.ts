import { autoUpdater } from 'electron-updater'
const log = require('electron-log')

export interface updaterInfoType {
    message: string
    status: 'error' | 'checking' | 'notAvailable' | 'startDownload' | 'download' | 'downloaded'
    percent?: string | number
}

export default {
    listenUpdater(onChange: (info: updaterInfoType) => void) {
        autoUpdater.on('checking-for-update', () => {
            onChange({ message: '正在检查更新...', status: 'checking' })
        })
        autoUpdater.on('error', () => {
            onChange({ message: '检查更新出错', status: 'error' })
        })
        autoUpdater.on('update-not-available', () => {
            onChange({ message: '未检查到新版本!', status: 'notAvailable' })
        })
        autoUpdater.on('update-available', () => {
            onChange({ message: '检查到新版本，正在下载...', status: 'startDownload' })
        })
        autoUpdater.on('download-progress', (progress: any) => {
            onChange({
                message: '下载进度',
                status: 'download',
                percent: progress.percent,
            })
        })
        autoUpdater.on('update-downloaded', () => {
            onChange({ message: '下载完成', status: 'downloaded' })
        })
        // 记录失败日志到本地
        // ----------------------------------------------------------------------
        log.transports.file.level = 'error'
        autoUpdater.logger = log
    },
}
