export default class NavbarLinkModel {
	private _href: string
	private _id: string
	private _title: string

	constructor(href: string, title: string, id: string) {
		this._href = href
		this._title = title
		this._id = id
	}


	get href(): string {
		return this._href;
	}

	set href(value: string) {
		this._href = value;
	}

	get id(): string {
		return this._id;
	}

	set id(value: string) {
		this._id = value;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}
}