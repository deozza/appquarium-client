export default class WaterConstraints {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    ph_min: number
    ph_max: number
    gh_min: number
    gh_max: number
    temp_min: number
    temp_max: number
    species_uuid: string

    constructor(waterConstraints: Array<string>) {
        this.uuid = waterConstraints.hasOwnProperty('uuid') ? waterConstraints['uuid'] : ''
        this.created_at = waterConstraints.hasOwnProperty('created_at') ? waterConstraints['created_at'] : ''
        this.updated_at = waterConstraints.hasOwnProperty('updated_at') ? waterConstraints['updated_at'] : ''
        this.user_uid = waterConstraints.hasOwnProperty('user_uid') ? waterConstraints['user_uid'] : ''
        this.ph_min = waterConstraints.hasOwnProperty('ph_min') ? waterConstraints['ph_min'] : 0
        this.ph_max = waterConstraints.hasOwnProperty('ph_max') ? waterConstraints['ph_max'] : 0
        this.temp_min = waterConstraints.hasOwnProperty('temp_min') ? waterConstraints['temp_min'] : 0
        this.temp_max = waterConstraints.hasOwnProperty('temp_max') ? waterConstraints['temp_max'] : 0
        this.gh_min = waterConstraints.hasOwnProperty('gh_min') ? waterConstraints['gh_min'] : 0
        this.gh_max = waterConstraints.hasOwnProperty('gh_max') ? waterConstraints['gh_max'] : 0
        this.species_uuid = waterConstraints.hasOwnProperty('species_uuid') ? waterConstraints['species_uuid'] : ''

    }
}
