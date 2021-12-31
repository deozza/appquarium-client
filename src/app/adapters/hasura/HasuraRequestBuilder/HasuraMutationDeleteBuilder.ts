import HasuraRequestBuilder from "./HasuraRequestBuilder";
import Insert from "./Insert";
import PkColumns from "./PkColumns";

export default class HasuraMutationDeleteBuilder extends HasuraRequestBuilder {
    insert: Array<Insert> = []
    pkColumns: Array<PkColumns> = []

    constructor(name: string) {
        super('mutation', name);
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

        request += ') '

        request += this.computeReturn()

        request += '}'

        return request
    }

    private computePkColumns(): string {
        let computedPkColumns: string = ''

        for (let pkColumn in this.pkColumns) {
            computedPkColumns += this.pkColumns[pkColumn].name + ': ' + this.pkColumns[pkColumn].value
            if (~~pkColumn < (this.pkColumns.length - 1)) {
                computedPkColumns += ', '
            }
        }

        return computedPkColumns
    }

}
