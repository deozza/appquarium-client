import UnexpectedSizeError from "../../../errors/components/atoms/UnexpectedSizeError";
import UnexpectedStyleError from "../../../errors/components/atoms/UnexpectedStyleError";
import UnexpectedButtonTypeError from "../../../errors/components/atoms/UnexpectedButtonTypeError";
import Theme from "../../utils/Theme";

export default class BaseButtonModel {

    readonly DEFAULT_STYLE: string = 'success'

    readonly DEFAULT_SIZE: string = 'normal'

    readonly EXPECTED_TYPES: Array<string> = [
        'submit',
        'button',
        'reset'
    ]

    readonly DEFAULT_TYPE: string = this.EXPECTED_TYPES[0]

    readonly DEFAULT_EVENT_NAME: string = 'buttonIsClicked'

    private _content: string | any
    private _style: string
    private _size: string
    private _type: string
    private _isLoading: boolean
    private _isDisabled: boolean
    private _icon: string | null
    private _isOnlyIcon: boolean | null
    private _isOutlined: boolean
    private _isRound: boolean
    private _event: string

    constructor(content: string | any) {
        this._content = content
        this._style = this.DEFAULT_STYLE
        this._size = this.DEFAULT_SIZE
        this._type = this.DEFAULT_TYPE
        this._isRound = false
        this._isOutlined = false
        this._isLoading = false
        this._isDisabled = false
        this._icon = null
        this._isOnlyIcon = null
        this._event = this.DEFAULT_EVENT_NAME
    }

    get content(): string | any {
        return this._content;
    }

    set content(value: string | any) {
        this._content = value;
    }

    get style(): string {
        return this._style;
    }

    get isOutlined(): boolean {
        return this._isOutlined;
    }

    get isRound(): boolean {
        return this._isRound;
    }

    public setStyleOrThrowError(style: string, isOutlined: boolean = false, isRound: boolean = false): BaseButtonModel {
        if (Theme.ELEMENT_STYLE().hasOwnProperty(style) === false) {
            throw new UnexpectedStyleError(style, this.constructor.name)
        }
        this._style = style
        this._isOutlined = isOutlined
        this._isRound = isRound

        return this
    }

    get size(): string {
        return this._size;
    }

    public setSizeOrThrowError(size: string): BaseButtonModel {
        if (Theme.ELEMENT_SIZES().hasOwnProperty(size) === false) {
            throw new UnexpectedSizeError(size, this.constructor.name)
        }
        this._size = size

        return this
    }

    get type(): string {
        return this._type;
    }

    public setTypeOrThrowError(type: string): BaseButtonModel {
        if (this.EXPECTED_TYPES.includes(type) === false) {
            throw new UnexpectedButtonTypeError(type, this.constructor.name)
        }
        this._type = type

        return this
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    public setLoading(isLoading: boolean): BaseButtonModel {
        this._isLoading = isLoading
        this._isDisabled = isLoading

        return this
    }

    get isDisabled(): boolean {
        return this._isDisabled;
    }

    set isDisabled(value: boolean) {
        this._isDisabled = value;
    }

    get icon(): string | null {
        return this._icon;
    }

    get isOnlyIcon(): boolean | null {
        return this._isOnlyIcon;
    }

    public setIcon(icon: string, isOnlyIcon: boolean = false): BaseButtonModel {
        this._icon = icon
        this._isOnlyIcon = isOnlyIcon

        return this
    }

    get event(): string {
        return this._event;
    }

    set event(value: string) {
        this._event = value;
    }
}