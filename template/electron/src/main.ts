import { app, ipcMain, session } from 'electron'
import log from 'electron-log'
import AppWin from './lib/AppWin'

const appWin: AppWin = new AppWin()

//  ipcMain
// ------------------yarn start------------------------------------------------------
ipcMain.on('quit-app', function () {
    app.quit()
    app.exit()
})
// appListen
// ----------------------------------------------------------------------
app.on('window-all-closed', async () => {
    await session.defaultSession.clearCache()
    app.quit()
    app.exit()
})

if (process.env.NODE_ENV === 'development') {
    app.on('web-contents-created', function (e, webContents) {
        webContents.openDevTools({
            mode: 'detach'
        })
    })
}
app.once('ready', () => {
    appWin.open()
})
app.on('gpu-process-crashed', (e, killed) => {
    if (killed) {
        log.error('程序被杀')
    } else {
        log.error('程序崩溃')
    }
    app.quit()
    app.exit()
})
