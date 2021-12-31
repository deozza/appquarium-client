export default class Param {
    type: string
    name: string
    value: string | number | Array<string> | boolean

    constructor(name: string, type: string, value: string | number | Array<string> | boolean) {
        this.name = name
        this.type = type
        this.value = value
    }
}
