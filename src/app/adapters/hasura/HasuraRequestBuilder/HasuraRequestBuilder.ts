import Param from "./Param";

export default class HasuraRequestBuilder {
    type: string
    name: string
    params: Array<Param> = []
    return: Array<string> = []

    constructor(type: string, name: string) {
        this.type = type
        this.name = name
    }

    public addParam(name: string, type: string, value: string | number | Array<string> | boolean) {
        if (this.params.find((param: Param) => param.name === name) === undefined) {
            this.params.push(new Param(name, type, value))
        }
    }

    public addReturn(...names: Array<string>) {
        names.forEach((name) => this.return.push(name))
    }

    protected computeParams(): string {
        if (this.params.length === 0) {
            return ''
        }

        let computedParams = '('
        for (let param in this.params) {
            computedParams += this.params[param].name + ': ' + this.params[param].type

            if (~~param < (this.params.length - 1)) {
                computedParams += ', '
            }
        }

        computedParams += ')'

        return computedParams
    }

    protected computeReturn(): string {
        let computedReturn: string = '{'

        for (let returnMember in this.return) {
            computedReturn += this.return[returnMember]

            if (~~returnMember < (this.return.length - 1)) {
                computedReturn += ', '
            }
        }

        computedReturn += '}'
        return computedReturn
    }
}
