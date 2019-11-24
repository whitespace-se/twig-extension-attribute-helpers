function isIterable(obj) {
	// checks for null and undefined
	if (obj == null) {
		return false;
	}
	return typeof obj[Symbol.iterator] === 'function';
}

export default class TokenList extends Set {
	constructor(values) {
		if (typeof values === 'string') {
			if (/\S/.test(values)) {
				super(values.trim().split(/\s+/g));
			} else {
				super();
			}
		} else if (isIterable(values)) {
			super(values);
		} else if (values == null) {
			super();
		} else {
			super([values]);
		}
	}
	toString() {
		return Array.from(this).join(' ');
	}
}
