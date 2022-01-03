export default class Image {
    url: string
    title: string
    source: string
    file: File | null
    user: string
    thumbnail: boolean
    associated_to: string

    constructor(image: Array<string>, associated_to: string) {
        this.url = image.hasOwnProperty('url') ? image['url'] : ''
        this.title = image.hasOwnProperty('title') ? image['title'] : ''
        this.source = image.hasOwnProperty('source') ? image['source'] : ''
        this.user = image.hasOwnProperty('user') ? image['user'] : ''
        this.thumbnail = image.hasOwnProperty('thumbnail') ? image['thumbnail'] : false
        this.associated_to = associated_to
        this.file = null
    }

}
