import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';
import BaseButtonModel from '../../atoms/button/BaseButtonModel';

export const header: BaseHeaderModel = new BaseHeaderModel("Comparateur d'espèces")
	.setDisplaySizeOrTrowError('xxxl')
	.setSizeOrTrowError('h1')
	.setColorOrTrowError('white')
header.additionalClasses = 'text-center'

export const speciesLeftHeader: BaseHeaderModel = new BaseHeaderModel("")
	.setDisplaySizeOrTrowError('xxl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
speciesLeftHeader.additionalClasses = 'text-center'

export const resultHeader: BaseHeaderModel = new BaseHeaderModel("Resultat")
	.setDisplaySizeOrTrowError('xxl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
resultHeader.additionalClasses = 'text-center'

export const speciesRightHeader: BaseHeaderModel = new BaseHeaderModel("")
	.setDisplaySizeOrTrowError('xxl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
speciesRightHeader.additionalClasses = 'text-center'


export const compareButton: BaseButtonModel = new BaseButtonModel("Comparer")
	.setStyleOrThrowError('success')
	.setTypeOrThrowError('button')

export const headerDataWaterConstraints: BaseHeaderModel = new BaseHeaderModel("Contraintes d'eau")
	.setDisplaySizeOrTrowError('xl')
	.setSizeOrTrowError('h2')
	.setColorOrTrowError('white')
headerDataWaterConstraints.additionalClasses = 'text-center'