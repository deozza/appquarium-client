export default class Insert {
    value: string | number
    name: string

    constructor(name: string, value: string | number) {
        this.name = name
        this.value = value
    }
}
