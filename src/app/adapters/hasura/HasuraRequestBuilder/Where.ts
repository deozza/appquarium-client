export default class Where {
    property: string
    compareMode: string
    value: string | number

    constructor(property: string, compareMode: string, value: string | number) {
        this.property = property

        if (Where.expectedCompareModes().includes(compareMode) === false) {
            throw Error('Unexpected compareMode for Where in a query')
        }
        this.compareMode = compareMode

        this.value = value
    }

    static expectedCompareModes(): Array<string> {
        return [
            '_eq',
          '_like'
        ]
    }

}
