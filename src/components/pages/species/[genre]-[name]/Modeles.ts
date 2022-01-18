import BaseHeaderModel from '../../../atoms/typography/header/BaseHeaderModel';

export const headerMain: BaseHeaderModel = new BaseHeaderModel('')
	.setDisplaySizeOrTrowError('xxxl')
	.setSizeOrTrowError('h1')
	.setColorOrTrowError('white')

export const headerDataNaming: BaseHeaderModel = new BaseHeaderModel('Espèce')
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataNaming.additionalClasses = 'mb-3 font-bold'

export const headerDataWaterConstraints: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataWaterConstraints.additionalClasses = 'mb-3 font-bold'

export const headerDataEnvironment: BaseHeaderModel = new BaseHeaderModel("Habitat")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataEnvironment.additionalClasses = 'mb-3 font-bold'

export const headerDataAquarium: BaseHeaderModel = new BaseHeaderModel("Aquarium")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataAquarium.additionalClasses = 'mb-3 font-bold'

export const headerDataBehaviour: BaseHeaderModel = new BaseHeaderModel("Comportement")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataBehaviour.additionalClasses = 'mb-3 font-bold'

export const headerDataReproduction: BaseHeaderModel = new BaseHeaderModel("Reproduction")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataReproduction.additionalClasses = 'mb-3 font-bold'

export const headerDataDescription: BaseHeaderModel = new BaseHeaderModel("Description")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataDescription.additionalClasses = 'mb-3 font-bold'
