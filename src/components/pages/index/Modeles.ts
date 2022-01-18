import BaseHeaderModel from '../../atoms/typography/header/BaseHeaderModel';
import BaseParagraphModel from '../../atoms/typography/paragraph/BaseParagraphModel';

export const headerMain: BaseHeaderModel = new BaseHeaderModel('Appquarium')
	.setSizeOrTrowError('h1')
	.setColorOrTrowError('white');
headerMain.additionalClasses = 'lg:text-6xl';

export const headerLastSpeciesComment: BaseHeaderModel = new BaseHeaderModel('Ajouts fréquents de nouvelles espèces ')
	.setSizeOrTrowError('h2')
	.setDisplaySizeOrTrowError('xxl')
	.setColorOrTrowError('white');
headerLastSpeciesComment.additionalClasses = 'text-center';

export const headerLastSpecies: BaseHeaderModel = new BaseHeaderModel('Dernières espèces ajoutées')
	.setSizeOrTrowError('h2')
	.setDisplaySizeOrTrowError('xxl')
	.setColorOrTrowError('white');
headerLastSpecies.additionalClasses = 'text-center';

export const paragraphLastSpeciesComment: BaseParagraphModel = new BaseParagraphModel('Apprenez-en plus rapidement sur de nombreuses espèces de poissons, plantes et invertébrés')
	.setColorOrTrowError('white');

export const headerDataComment: BaseHeaderModel = new BaseHeaderModel('Compatibilité entre les espèces')
	.setSizeOrTrowError('h2')
	.setDisplaySizeOrTrowError('xxl')
	.setColorOrTrowError('white');
headerDataComment.additionalClasses = 'text-center';

export const paragraphDataComment: BaseParagraphModel = new BaseParagraphModel('Vérifiez en un instant si deux espèces sont compatibles entre elles')
	.setColorOrTrowError('white');


export let listStyle: string = 'square';
export let dummyLoading: number = 3;