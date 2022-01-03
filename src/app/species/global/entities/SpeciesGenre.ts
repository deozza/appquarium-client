export default class SpeciesGenre {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    name: string
    category: string

    constructor(speciesGenre: Array<string>) {
        this.uuid = speciesGenre.hasOwnProperty('uuid') ? speciesGenre['uuid'] : ''
        this.created_at = speciesGenre.hasOwnProperty('created_at') ? speciesGenre['created_at'] : ''
        this.updated_at = speciesGenre.hasOwnProperty('updated_at') ? speciesGenre['updated_at'] : ''
        this.user_uid = speciesGenre.hasOwnProperty('user_uid') ? speciesGenre['user_uid'] : ''
        this.name = speciesGenre.hasOwnProperty('name') ? speciesGenre['name'] : ''
        this.category = speciesGenre.hasOwnProperty('category') ? speciesGenre['category'] : ''
    }

}
