import HasuraRequestBuilder from "./HasuraRequestBuilder";
import Insert from "./Insert";
import PkColumns from "./PkColumns";

export default class HasuraMutationUpdateBuilder extends HasuraRequestBuilder {
    insert: Array<Insert> = []
    pkColumns: Array<PkColumns> = []

    constructor(name: string) {
        super('mutation', name);
    }

    public addInsert(name: string, value: string | number) {
        if (this.insert.find((insert: Insert) => insert.name === name) === undefined) {
            this.insert.push(new Insert(name, value))
        }
    }

    public addPkColumn(name: string, value: string | number) {
        if (this.pkColumns.find((pkColumn: PkColumns) => pkColumn.name === name) === undefined) {
            this.pkColumns.push(new PkColumns(name, value))
        }
    }

    public getRequest(): string {
        let request: string = this.type

        request += this.computeParams()

        request += '{'

        request += this.name

        request += '('

        request += this.computePkColumns()

        request += ', '

        request += this.computeSetValues()

        request += ') '

        request += this.computeReturn()

        request += '}'

        return request
    }

    private computePkColumns(): string {
        let computedPkColumns: string = 'pk_columns: {'

        for (let pkColumn in this.pkColumns) {
            computedPkColumns += this.pkColumns[pkColumn].name + ': ' + this.pkColumns[pkColumn].value
            if (~~pkColumn < (this.pkColumns.length - 1)) {
                computedPkColumns += ', '
            }
        }

        computedPkColumns += '}'

        return computedPkColumns
    }

    private computeSetValues(): string {
        let computedSetValues: string = '_set: {'

        for (let setValues in this.insert) {
            computedSetValues += this.insert[setValues].name + ': ' + this.insert[setValues].value
            if (~~setValues < (this.insert.length - 1)) {
                computedSetValues += ', '
            }
        }

        computedSetValues += '}'

        return computedSetValues
    }

}
