export default class AquariumConstraints {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    species_uuid: string
    min_volume: number
    max_volume: number
    min_length: number
    max_height: number
    decor: Array<string>
    soil_kind: string

    constructor(aquariumConstraints: Array<string>) {
        this.uuid = aquariumConstraints.hasOwnProperty('uuid') ? aquariumConstraints['uuid'] : ''
        this.created_at = aquariumConstraints.hasOwnProperty('created_at') ? aquariumConstraints['created_at'] : ''
        this.updated_at = aquariumConstraints.hasOwnProperty('updated_at') ? aquariumConstraints['updated_at'] : ''
        this.user_uid = aquariumConstraints.hasOwnProperty('user_uid') ? aquariumConstraints['user_uid'] : ''
        this.species_uuid = aquariumConstraints.hasOwnProperty('species_uuid') ? aquariumConstraints['species_uuid'] : ''
        this.min_volume = aquariumConstraints.hasOwnProperty('min_volume') ? aquariumConstraints['min_volume'] : 0
        this.max_volume = aquariumConstraints.hasOwnProperty('max_volume') ? aquariumConstraints['max_volume'] : null
        this.min_length = aquariumConstraints.hasOwnProperty('min_length') ? aquariumConstraints['min_length'] : null
        this.max_height = aquariumConstraints.hasOwnProperty('max_height') ? aquariumConstraints['max_height'] : null
        this.decor = aquariumConstraints.hasOwnProperty('decor') ? aquariumConstraints['decor'] : []
        this.soil_kind = aquariumConstraints.hasOwnProperty('soil_kind') ? aquariumConstraints['soil_kind'] : ''
    }

}
