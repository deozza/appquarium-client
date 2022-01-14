import BaseHeaderModel from '../../../atoms/typography/header/BaseHeaderModel';

export const header: BaseHeaderModel = new BaseHeaderModel('Liste des espèces')
	.setDisplaySizeOrTrowError('xxxl')
	.setSizeOrTrowError('h1')
	.setColorOrTrowError('white')
header.additionalClasses = 'text-center'

export let listStyle: string = 'square'
export let dummyLoading: number = 12

