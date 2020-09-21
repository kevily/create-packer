import { BrowserWindow } from 'electron'
import appConfig from '../configs/appConfig'
import _ from 'lodash'

class DefaultWin {
    root: Electron.BrowserWindow
    config: Electron.BrowserWindowConstructorOptions
    constructor() {
        this.root = null
        this.config = {
            show: true,
            center: true,
            frame: false,
            resizable: false,
            hasShadow: true,
            transparent: true,
            webPreferences: {
                devTools: appConfig.isDev || appConfig.isTest,
                // devTools: true,
                webviewTag: true,
                nodeIntegration: true,
            },
        }
    }
    create(config: Electron.BrowserWindowConstructorOptions) {
        this.config = _.merge(this.config, config)
        this.root = new BrowserWindow(this.config)
    }
    async loadPage(route: string = '') {
        if (appConfig.isDev) {
            await this.root.loadURL(appConfig.baseHost + `#${route}`)
        } else {
            await this.root.loadFile(appConfig.baseHost, {
                hash: route,
            })
        }
    }
}

export default DefaultWin
