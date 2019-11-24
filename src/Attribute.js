import he from 'he';
import TokenList from './TokenList';

export default class Attribute {
	constructor(attributes = {}, { sortAttributes = false } = {}) {
		this.storage = {};
		this.setAttributes(attributes);
		this.sortAttributes = sortAttributes;
	}

	offsetGet(name) {
		return this.storage[name];
	}

	offsetSet(name, value) {
		if (!/^[a-z0-9-]+$/i.test(name)) {
			// Skip invalid attributes
			return;
		}
		if (value == null || value === false) {
			delete this.storage[name];
			return;
		}
		switch (name) {
			case 'class':
				{
					if (!(value instanceof TokenList)) {
						value = new TokenList(value);
					}
				}
				break;
		}
		this.storage[name] = value;
		return value;
	}

	offsetUnset(name) {
		delete this.storage[name];
	}

	offsetExists(name) {
		return this.storage[name] != null;
	}

	/**
	 * Sets values for an attribute key.
	 * @param {string} attribute Name of the attribute.
	 * @param {string|string[]|boolean|number|null} value Value(s) to set for the given attribute key.
	 * @returns {this}
	 */
	setAttribute(attribute, value) {
		this.offsetSet(attribute, value);
		return this;
	}

	/**
	 * Sets and replaces attributes with new values.
	 * This method is not available in the original Drupal implementation.
	 * @param {Object} attributes Map of attributes and values
	 * @returns {this}
	 */
	setAttributes(attributes) {
		Object.entries(attributes).forEach(([attribute, value]) => {
			this.setAttribute(attribute, value);
		});
		return this;
	}

	/**
	 * Removes an attribute from an Attribute object.
	 * @param  {...string} attributes Attributes to remove from the attribute array.
	 * @returns {this}
	 */
	removeAttribute(...attributes) {
		attributes.forEach(attribute => {
			this.offsetUnset(attribute);
		});
		return this;
	}

	/**
	 * Checks if an attribute is set.
	 * This method is not available in the original Drupal implementation.
	 * @returns {boolean} Returns true if the attribute is set, or false otherwise.
	 */
	hasAttribute(attribute) {
		return this.offsetExists(attribute);
	}

	/**
	 * Return the value for a single attribute.
	 * This method is not available in the original Drupal implementation.
	 * @returns {any} The value for the attribute.
	 */
	getAttribute(attribute) {
		return this.offsetGet(attribute);
	}

	/**
	 * Gets all attributes as a plain object.
	 * This method is not available in the original Drupal implementation.
	 * @returns {Object}
	 */
	getAttributes() {
		return { ...this.storage };
	}

	/**
	 * Adds classes or merges them on to array of existing CSS classes.
	 * @param {...string|string[]} classLists CSS classes to add to the class attribute array.
	 * @returns {this}
	 */
	addClass(...classLists) {
		let currentClassList = this.offsetGet('class') || [];
		let newClassList = classLists.reduce(
			(currentClassList, classList) => [
				...currentClassList,
				...new TokenList(classList),
			],
			currentClassList,
		);
		this.offsetSet('class', newClassList);
		return this;
	}

	/**
	 * Removes argument values from array of existing CSS classes.
	 * @param  {...string|string[]} classLists CSS classes to remove from the class attribute array.
	 * @returns {this}
	 */
	removeClass(...classLists) {
		let currentClassList = this.offsetGet('class') || [];
		let newClassList = classLists.reduce(
			(currentClassList, classList) =>
				[...currentClassList].filter(
					className => !new TokenList(classList).has(className),
				),
			currentClassList,
		);
		this.offsetSet('class', newClassList.length ? newClassList : null);
		return this;
	}

	/**
	 * Gets the class attribute value if set.
	 * @returns {TokenList} The class attribute value if set.
	 */
	getClass() {
		return this.offsetGet('class') || new TokenList();
	}

	/**
	 * Checks if the class array has the given CSS class.
	 * @param {string} className The CSS class to check for.
	 * @returns {boolean} Returns true if the class exists, or false otherwise.
	 */
	hasClass(className) {
		return this.getClass().has(className);
	}

	toString() {
		let entries = Object.entries(this.storage);
		if (this.sortAttributes) {
			entries.sort((a, b) => (a[0] > b[0] ? 1 : -1));
		}
		return entries
			.map(([name, value]) => {
				if (Array.isArray(value)) {
					value = value.filter(Boolean).join(' ');
				} else if (value === true) {
					return ` ${name}`;
				}
				return ` ${name}="${he.encode(String(value))}"`;
			})
			.join('');
	}

	/**
	 * Returns all storage elements as a plain object.
	 * JavaScript uses objects instead of associative arrays
	 * @returns {object} An associative array of attributes.
	 */
	toArray() {
		return { ...this.storage };
	}

	[Symbol.iterator]() {
		return Object.entries(this.storage)[Symbol.iterator]();
	}
}
