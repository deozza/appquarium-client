import BaseInputModel from "../BaseInputModel";

export default class BaseTextInputModel extends BaseInputModel{

    readonly TEXT_INPUT_TYPES: object = {
        text: 'text',
        password: 'password',
        email: 'email',
        tel: 'tel'
    }

    readonly DEFAULT_TYPE: string = this.TEXT_INPUT_TYPES.text

    private _placeholder: string
    private _minlength: number | null
    private _maxlength: number | null
    private _datalist: string | null

    public constructor(name: string) {
        super(name)
        this._type = this.DEFAULT_TYPE
        this._placeholder = ''
        this._minlength = null
        this._maxlength = null
        this._datalist = null
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        if(this.TEXT_INPUT_TYPES.hasOwnProperty(value) === false){
            throw new Error()
        }
        this._type = value;
    }

    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
    }

    get minlength(): number | null {
        return this._minlength;
    }

    set minlength(value: number | null) {

        if(this._maxlength !== null && value > this._maxlength){
            throw new Error()
        }

        this._minlength = value;
    }

    get maxlength(): number | null {
        return this._maxlength;
    }

    set maxlength(value: number | null) {
        if(this._minlength !== null && value < this._minlength){
            throw new Error()
        }
        this._maxlength = value;
    }

    get datalist(): string|null {
        return this._datalist;
    }

    set datalist(value: string) {
        this._datalist = value;
    }
}