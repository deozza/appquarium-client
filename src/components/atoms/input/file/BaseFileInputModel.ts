import BaseInputModel from "../BaseInputModel";

export default class BaseFileInputModel extends BaseInputModel{

    private _accept: Array<string>

    public constructor(name: string) {
        super(name)
        this._accept = []
    }


    get accept(): Array<string> {
        return this._accept;
    }

    set accept(value: Array<string>) {
        this._accept = value;
    }
}