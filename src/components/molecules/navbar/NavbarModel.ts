import NavbarLinkModel from './link/NavbarLinkModel';

export default class NavbarModel{
	private _currentPage: string
	private _showMobileMenu: boolean = false
	private _links: Array<NavbarLinkModel> = []

	constructor(currentPage : string) {
		this._currentPage = currentPage
	}

	get currentPage(): string {
		return this._currentPage;
	}

	set currentPage(value: string) {
		this._currentPage = value;
	}

	get showMobileMenu(): boolean {
		return this._showMobileMenu;
	}

	set showMobileMenu(value: boolean) {
		this._showMobileMenu = value;
	}

	get links(): Array<NavbarLinkModel> {
		return this._links;
	}

	set links(value: Array<NavbarLinkModel>) {
		this._links = value;
	}

	public addLink(value: NavbarLinkModel): NavbarModel{
		this._links = [...this._links, value]
		return this
	}
}