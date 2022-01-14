export default class BaseOptionModel{
	private _name: string|number
	private _value: string|number

	public constructor(name: string|number, value: string|number) {
		this._name = name
		this._value = value
	}

	get name(): string | number {
		return this._name;
	}

	set name(value: string | number) {
		this._name = value;
	}

	get value(): string | number {
		return this._value;
	}

	set value(value: string | number) {
		this._value = value;
	}
}