export default class BaseInputModel{
    protected _type: string
    protected _id: string
    protected _name: string
    protected _required: boolean
    protected _value: string | null
    protected _readonly: boolean
    protected _error: boolean
    protected _errorMessage: string

    public constructor(name: string) {
        this._name = name
        this._id = name
        this._required = false
        this._value = null
        this._readonly = false
        this._error = false
        this._errorMessage = ''
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get required(): boolean {
        return this._required;
    }

    set required(value: boolean) {
        this._required = value;
    }

    get value(): string | null {
        return this._value;
    }

    set value(value: string | null) {
        this._value = value;
    }

    get readonly(): boolean {
        return this._readonly;
    }

    set readonly(value: boolean) {
        this._readonly = value;
    }

    get error(): boolean {
        return this._error;
    }

    set error(value: boolean) {
        this._error = value;
    }

    get errorMessage(): string {
        return this._errorMessage;
    }

    set errorMessage(value: string) {
        this._errorMessage = value;
    }
}