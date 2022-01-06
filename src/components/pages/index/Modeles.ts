import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';
import BaseParagraphModel from '../../atoms/typography/paragraph/BaseParagraphModel';

export const headerMain: BaseHeaderModel = new BaseHeaderModel('Appquarium')
	.setSizeOrTrowError('h1')
	.setColorOrTrowError('white');
headerMain.additionalClasses = 'text-6xl';

export const headerLastSpeciesComment: BaseHeaderModel = new BaseHeaderModel('Ajouts fréquents de nouvelles espèces ')
	.setSizeOrTrowError('h2')
	.setDisplaySizeOrTrowError('xxl')
	.setColorOrTrowError('white');

export const headerLastSpecies: BaseHeaderModel = new BaseHeaderModel('Dernières espèces ajoutées')
	.setSizeOrTrowError('h2')
	.setDisplaySizeOrTrowError('xxl')
	.setColorOrTrowError('white');

export const headerDataComment: BaseHeaderModel = new BaseHeaderModel('Compatibilité entre les espèces')
	.setSizeOrTrowError('h2')
	.setDisplaySizeOrTrowError('xxl')
	.setColorOrTrowError('white');

export const paragraphDataComment: BaseParagraphModel = new BaseParagraphModel('Vérifiez en un instant si deux espèces sont compatibles entre elles')
	.setColorOrTrowError('white');

export let listStyle: string = 'square';
export let dummyLoading: number = 3;