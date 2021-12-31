import Theme from "../../utils/Theme";
import UnexpectedStyleError from "../../../errors/components/atoms/UnexpectedStyleError";

export default class BasePillModel{

    readonly DEFAULT_STYLE: string = 'primary'

    private _content: string
    private _style: string

    constructor(content: string) {
        this._content = content
        this._style = this.DEFAULT_STYLE
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        this._content = value;
    }

    get style(): string {
        return this._style;
    }

    public setStyleOrThrowError(style: string): BasePillModel {
        if (Theme.ELEMENT_STYLE().hasOwnProperty(style) === false) {
            throw new UnexpectedStyleError(style, this.constructor.name)
        }
        this._style = style

        return this
    }
}