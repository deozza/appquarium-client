import i18n from "./i18n.json"
export default class Translation {

	public static translate(keys: Array<string>): string {
		let translated: object | string = i18n
		let local: string = 'fr'

		if(navigator !== undefined && navigator !== null
			&& navigator.language !== undefined && navigator.language !== null){
			local = navigator.language
		}

		for(const key of keys){
			if(!translated.hasOwnProperty(key)){
				return keys[keys.length - 1]
			}

			translated = translated[key]
		}

		return translated[local]
	}
}