export default class PlantSpecs {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    species_uuid: string
    size: number
    zone: string
    need_in_fertilizer: boolean
    growth_speed: string
    need_in_carbone: boolean

    constructor(plantSpecs: Array<string>) {
        this.uuid = plantSpecs.hasOwnProperty('uuid') ? plantSpecs['uuid'] : ''
        this.created_at = plantSpecs.hasOwnProperty('created_at') ? plantSpecs['created_at'] : ''
        this.updated_at = plantSpecs.hasOwnProperty('updated_at') ? plantSpecs['updated_at'] : ''
        this.user_uid = plantSpecs.hasOwnProperty('user_uid') ? plantSpecs['user_uid'] : ''
        this.species_uuid = plantSpecs.hasOwnProperty('species_uuid') ? plantSpecs['species_uuid'] : ''
        this.size = plantSpecs.hasOwnProperty('size') ? plantSpecs['size'] : 0
        this.zone = plantSpecs.hasOwnProperty('zone') ? plantSpecs['zone'] : ''
        this.need_in_fertilizer = plantSpecs.hasOwnProperty('need_in_fertilizer') ? plantSpecs['need_in_fertilizer'] : false
        this.growth_speed = plantSpecs.hasOwnProperty('growth_speed') ? plantSpecs['growth_speed'] : ''
        this.need_in_carbone = plantSpecs.hasOwnProperty('need_in_carbone') ? plantSpecs['need_in_carbone'] : false
    }

}
