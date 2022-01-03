import SpeciesFamily from "./SpeciesFamily";
import SpeciesGenre from "./SpeciesGenre";

export default class SpeciesNaming {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    common_names: Array<string>
    old_names: Array<string>
    name: string
    species_family: SpeciesFamily
    species_genre: SpeciesGenre
    species_uid: string


    constructor(speciesNaming: Array<string>) {
        this.uuid = speciesNaming.hasOwnProperty('uuid') ? speciesNaming['uuid'] : ''
        this.created_at = speciesNaming.hasOwnProperty('created_at') ? speciesNaming['created_at'] : ''
        this.updated_at = speciesNaming.hasOwnProperty('updated_at') ? speciesNaming['updated_at'] : ''
        this.user_uid = speciesNaming.hasOwnProperty('user_uid') ? speciesNaming['user_uid'] : ''
        this.common_names = speciesNaming.hasOwnProperty('common_names') ? speciesNaming['common_names'] : []
        this.old_names = speciesNaming.hasOwnProperty('old_names') ? speciesNaming['old_names'] : []
        this.name = speciesNaming.hasOwnProperty('name') ? speciesNaming['name'] : ''
        this.species_family = speciesNaming.hasOwnProperty('species_family') && speciesNaming['species_family'] !== null ? new SpeciesFamily(speciesNaming['species_family']) : new SpeciesFamily([])
        this.species_genre = speciesNaming.hasOwnProperty('species_genre') && speciesNaming['species_genre'] !== null ? new SpeciesGenre(speciesNaming['species_genre']) : new SpeciesGenre([])
        this.species_uid = speciesNaming.hasOwnProperty('species_uid') ? speciesNaming['species_uid'] : ''
    }
}
