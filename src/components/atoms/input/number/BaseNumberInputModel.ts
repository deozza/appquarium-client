import BaseInputModel from "../BaseInputModel";

export default class BaseNumberInputModel extends BaseInputModel{

    private _placeholder: string
    private _min: number | null
    private _max: number | null
    private _step: number | null

    public constructor(name: string) {
        super(name)
        this._placeholder = ''
        this._min = null
        this._max = null
        this._step = null
    }

    get placeholder(): string {
        return this._placeholder;
    }

    set placeholder(value: string) {
        this._placeholder = value;
    }

    get min(): number | null {
        return this._min;
    }

    set min(value: number | null) {

        if(this._max !== null && value > this._max){
            throw new Error()
        }

        this._min = value;
    }

    get max(): number | null {
        return this._max;
    }

    set max(value: number | null) {
        if(this._min !== null && value < this._min){
            throw new Error()
        }
        this._max = value;
    }

    get step(): number|null {
        return this._step;
    }

    set step(value: number) {
        this._step = value;
    }
}