import Theme from "../../../utils/Theme";

export default class BaseParagraphModel {

    readonly DEFAULT_COLOR: string = 'black'
    readonly DEFAULT_DISPLAY_SIZE: string = 'base'

    private content: string
    private displaySize: string
    private color: string

    constructor(content: string) {
        this.content = content
        this.displaySize = this.DEFAULT_DISPLAY_SIZE
        this.color = this.DEFAULT_COLOR
    }

    public setContent(content: string): BaseParagraphModel{
        this.content = content
        return this
    }

    public getContent(): string{
        return this.content
    }

    public setColorOrTrowError(color: string): BaseParagraphModel{
        if(Theme.TEXT_COLORS().hasOwnProperty(color) === false){
            throw new Error('Unexpected color "'+color+'"')
        }

        this.color = color
        return this
    }

    public getColor(): string{
        return Theme.TEXT_COLORS()[this.color]
    }

    public setDisplaySizeOrTrowError(displaySize: string): BaseParagraphModel{
        if(Theme.TEXT_DISPLAY_SIZES().hasOwnProperty(displaySize) === false){
            throw new Error('Unexpected displaySize "'+displaySize+'"')
        }

        this.displaySize = displaySize
        return this
    }

    public getDisplaySize(): string{
        return Theme.TEXT_DISPLAY_SIZES()[this.displaySize]
    }
}