import SpeciesNaming from "./SpeciesNaming";
import WaterConstraints from "./WaterConstraints";
import AnimalSpecs from "./AnimalSpecs";
import InvalidSpeciesObjectError from "../../../../errors/app/species/global/entities/InvalidSpeciesObjectError";
import UnexpectedSpeciesPublicationStateError
  from "../../../../errors/app/species/global/entities/UnexpectedSpeciesPublicationStateError";
import Image from "../../../file/entities/Image";

export default class Species {
    uuid: string
    created_at: Date
    updated_at: Date
    user_uid: string
    naming: SpeciesNaming
    water_constraints: WaterConstraints
    animal_specs: AnimalSpecs
    origin: string
    publication_state: string
    category: string
    images: Array<Image>

    constructor(species: Array<string>) {
        this.uuid = species.hasOwnProperty('uuid') ? species['uuid'] : ''
        this.created_at = species.hasOwnProperty('created_at') ? new Date(species['created_at']) : new Date()
        this.updated_at = species.hasOwnProperty('updated_at') ? new Date(species['updated_at']) : new Date()
        this.user_uid = species.hasOwnProperty('user_uid') ? species['user_uid'] : ''
        this.naming = species.hasOwnProperty('naming') && species['naming'] !== null ? new SpeciesNaming(species['naming']) : new SpeciesNaming([])
        this.water_constraints = species.hasOwnProperty('water_constraints') && species['water_constraints'] !== null ? new WaterConstraints(species['water_constraints']) : new WaterConstraints([])
        this.animal_specs = species.hasOwnProperty('animal_specs') && species['animal_specs'] !== null ? new AnimalSpecs(species['animal_specs']) : new AnimalSpecs([])
        this.origin = species.hasOwnProperty('origin') ? species['origin'] : ''
        this.publication_state = species.hasOwnProperty('publication_state') ? species['publication_state'] : ''
        this.category = species.hasOwnProperty('category') ? species['category'] : ''
        this.images = []

        if (species.hasOwnProperty('medias')) {
            species['medias'].forEach((media: Array<string>) => {
                const image: Image = new Image(media, this.uuid)
                this.images = [...this.images, image]
            })
        }
    }

    public computeLinkToSpecies(): string {
        return '/species/' + this.naming.species_genre.name + '-' + this.naming.name
    }

    public computeName(): string {
        if (this.naming.species_genre.name === '' || this.naming.name === '') {
            return 'NA'
        }

        return this.naming.species_genre?.name + " " + this.naming.name
    }

    public getPublicationStateStyle(): string {

        if (this.publication_state === '') {
            throw new InvalidSpeciesObjectError()
        }

        const publicationStateStyle: object = {
            'DRAFT': 'secondary',
            'PRE_PUBLISHED': 'info',
            'MODERATED': 'warning',
            'PUBLISHED': 'success',
            'ARCHIVED': 'secondary',
        }

        if (!publicationStateStyle.hasOwnProperty(this.publication_state)) {
            throw new UnexpectedSpeciesPublicationStateError(this.publication_state)
        }

        return publicationStateStyle[this.publication_state]
    }

    public getPublicationStateContent(): string {

        if (this.publication_state === '') {
            throw new InvalidSpeciesObjectError()
        }

        const publicationStateContent: object = {
            'DRAFT': 'brouillon',
            'PRE_PUBLISHED': 'pré-publié',
            'MODERATED': 'modéré',
            'PUBLISHED': 'publié',
            'ARCHIVED': 'archivé',
        }

        if (!publicationStateContent.hasOwnProperty(this.publication_state)) {
            throw new UnexpectedSpeciesPublicationStateError(this.publication_state)
        }

        return publicationStateContent[this.publication_state]
    }
}
