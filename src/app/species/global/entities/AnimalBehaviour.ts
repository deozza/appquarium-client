export default class AnimalBehaviour {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    species_uuid: string
    aquarium_kind: string
    intraspecific_behaviour: string
    extraspecific_behaviour: string
    female_per_male: number
    min_group: number
    max_group: number
    zone: Array<string>
    alimentation: Array<string>
    diurnal: boolean

    constructor(animalBehaviour: Array<string>) {
        this.uuid = animalBehaviour.hasOwnProperty('uuid') ? animalBehaviour['uuid'] : ''
        this.created_at = animalBehaviour.hasOwnProperty('created_at') ? animalBehaviour['created_at'] : ''
        this.updated_at = animalBehaviour.hasOwnProperty('updated_at') ? animalBehaviour['updated_at'] : ''
        this.user_uid = animalBehaviour.hasOwnProperty('user_uid') ? animalBehaviour['user_uid'] : ''
        this.species_uuid = animalBehaviour.hasOwnProperty('species_uuid') ? animalBehaviour['species_uuid'] : ''
        this.aquarium_kind = animalBehaviour.hasOwnProperty('aquarium_kind') ? animalBehaviour['aquarium_kind'] : ''
        this.intraspecific_behaviour = animalBehaviour.hasOwnProperty('intraspecific_behaviour') ? animalBehaviour['intraspecific_behaviour'] : ''
        this.extraspecific_behaviour = animalBehaviour.hasOwnProperty('extraspecific_behaviour') ? animalBehaviour['extraspecific_behaviour'] : ''
        this.female_per_male = animalBehaviour.hasOwnProperty('female_per_male') ? animalBehaviour['female_per_male'] : null
        this.min_group = animalBehaviour.hasOwnProperty('min_group') ? animalBehaviour['min_group'] : 1
        this.max_group = animalBehaviour.hasOwnProperty('max_group') ? animalBehaviour['max_group'] : null
        this.zone = animalBehaviour.hasOwnProperty('zone') ? animalBehaviour['zone'] : []
        this.alimentation = animalBehaviour.hasOwnProperty('alimentation') ? animalBehaviour['alimentation'] : []
        this.diurnal = animalBehaviour.hasOwnProperty('diurnal') ? animalBehaviour['diurnal'] : true
    }

}
