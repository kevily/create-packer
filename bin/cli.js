class Cli {
    constructor() {
        this.extends = {}
    }
    onRegister(name, extend) {
        this.extends[name] = extend
    }
    async onStart(names) {
        for (let i = 0; i < names.length; i++) {
            let name = names[i]
            await this.extends[name]?.onStart()
        }
    }
}

module.exports = Cli
