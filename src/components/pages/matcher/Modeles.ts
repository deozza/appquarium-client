import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';

export const header: BaseHeaderModel = new BaseHeaderModel("Comparateur d'espèces")
	.setDisplaySizeOrTrowError('xxxl')
	.setSizeOrTrowError('h1')
	.setColorOrTrowError('white')
header.additionalClasses = 'text-center'

export const speciesLeftHeader: BaseHeaderModel = new BaseHeaderModel("Poecilia Reticulata")
	.setDisplaySizeOrTrowError('xxl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
speciesLeftHeader.additionalClasses = 'text-center'

export const resultHeader: BaseHeaderModel = new BaseHeaderModel("Resultat")
	.setDisplaySizeOrTrowError('xxl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
resultHeader.additionalClasses = 'text-center'

export const speciesRightHeader: BaseHeaderModel = new BaseHeaderModel("Corydoras panda")
	.setDisplaySizeOrTrowError('xxl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
speciesRightHeader.additionalClasses = 'text-center'

export const headerDataWaterConstraints: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataWaterConstraints.additionalClasses = 'text-center'