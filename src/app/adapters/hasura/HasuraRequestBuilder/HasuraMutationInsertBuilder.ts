import HasuraRequestBuilder from "./HasuraRequestBuilder";
import Insert from "./Insert";

export default class HasuraMutationInsertBuilder extends HasuraRequestBuilder {

    insert: Array<Insert> = []

    constructor(name: string) {
        super('mutation', name);
    }

    public addInsert(name: string, value: string | number) {
        if (this.insert.find((insert: Insert) => insert.name === name) === undefined) {
            this.insert.push(new Insert(name, value))
        }
    }

    public getRequest(): string {
        let request: string = this.type

        request += this.computeParams()

        request += '{'

        request += this.name

        request += this.computeInserts()

        request += this.computeReturn()

        request += '}'

        return request
    }

    private computeInserts(): string {
        let computedInserts = '(object: {'

        for (let insert in this.insert) {
            computedInserts += this.insert[insert].name + ': ' + this.insert[insert].value
            if (~~insert < (this.insert.length - 1)) {
                computedInserts += ', '
            }
        }

        computedInserts += '})'
        return computedInserts
    }

}
