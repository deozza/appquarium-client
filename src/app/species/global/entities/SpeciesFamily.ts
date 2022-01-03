export default class SpeciesFamily {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    name: string
    category: string

    constructor(speciesFamily: Array<string>) {
        this.uuid = speciesFamily.hasOwnProperty('uuid') ? speciesFamily['uuid'] : ''
        this.created_at = speciesFamily.hasOwnProperty('created_at') ? speciesFamily['created_at'] : ''
        this.updated_at = speciesFamily.hasOwnProperty('updated_at') ? speciesFamily['updated_at'] : ''
        this.user_uid = speciesFamily.hasOwnProperty('user_uid') ? speciesFamily['user_uid'] : ''
        this.name = speciesFamily.hasOwnProperty('name') ? speciesFamily['name'] : ''
        this.category = speciesFamily.hasOwnProperty('category') ? speciesFamily['category'] : ''
    }
}
