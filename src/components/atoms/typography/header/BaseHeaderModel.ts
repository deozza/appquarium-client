import Theme from "../../../utils/Theme";

export default class BaseHeaderModel {

    readonly DEFAULT_DISPLAY_SIZE: string = 'xxxl'
    readonly DEFAULT_SIZE: string = Theme.HEADER_SIZES().h1
    readonly DEFAULT_COLOR: string = 'black'

    private content: string
    private displaySize: string
    private size: string
    private color: string

    constructor(content: string) {
        this.content = content
        this.displaySize = this.DEFAULT_DISPLAY_SIZE
        this.size = this.DEFAULT_SIZE
        this.color = this.DEFAULT_COLOR
    }

    public setContent(content: string): BaseHeaderModel{
        this.content = content
        return this
    }

    public getContent(): string{
        return this.content
    }

    public setColorOrTrowError(color: string): BaseHeaderModel{
        if(Theme.TEXT_COLORS().hasOwnProperty(color) === false){
            throw new Error('Unexpected color "'+color+'"')
        }

        this.color = color
        return this
    }

    public getColor(): string{
        return Theme.TEXT_COLORS()[this.color]
    }

    public setDisplaySizeOrTrowError(displaySize: string): BaseHeaderModel{
        if(Theme.TEXT_DISPLAY_SIZES().hasOwnProperty(displaySize) === false){
            throw new Error('Unexpected displaySize "'+displaySize+'"')
        }

        this.displaySize = displaySize
        return this
    }

    public getDisplaySize(): string{
        return Theme.TEXT_DISPLAY_SIZES()[this.displaySize]
    }

    public setSizeOrTrowError(size: string): BaseHeaderModel{
        if(Theme.HEADER_SIZES().hasOwnProperty(size) === false){
            throw new Error('Unexpected size "'+size+'"')
        }

        this.size = size
        return this
    }

    public getSize(): string{
        return this.size
    }
}