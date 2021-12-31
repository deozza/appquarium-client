export default class BaseLabelModel{
    private readonly _name: string
    private readonly _forInput: string


    constructor(name: string, forInput: string){
        this._name = name
        this._forInput = forInput
    }

    get name(): string {
        return this._name;
    }


    get forInput(): string {
        return this._forInput;
    }
}