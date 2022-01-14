import BaseInputModel from "../BaseInputModel";
import BaseOptionModel from './BaseOptionModel';

export default class BaseSelectInputModel extends BaseInputModel{

    private _options: Array<BaseOptionModel>

    public constructor(name: string) {
        super(name)
        this._options = []
    }


    get options(): Array<BaseOptionModel> {
        return this._options;
    }

    set options(value: Array<BaseOptionModel>) {
        this._options = value;
    }
}