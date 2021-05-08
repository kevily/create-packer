import DefaultWin from './DefaultWin'

class App extends DefaultWin {
    public async open() {
        this.create({ width: 1366, height: 728 })
        this.root.on('closed', () => {
            this.root = null
        })
        await this.loadPage()
        this.root.show()
    }
    public close() {
        this.root.close()
    }
}

export default App
