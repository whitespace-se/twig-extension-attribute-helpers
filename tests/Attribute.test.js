import he from 'he';
import Attribute from '../src/Attribute';
import TokenList from '../src/TokenList';

describe('Attribute.contructor', () => {
	it('allows zero arguments', () => {
		let attr = new Attribute();
		expect(attr.getAttributes()).toEqual({});
	});
	it('sets passed attributes', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		expect(attr.getAttributes()).toEqual({ href: '#', target: '_blank' });
	});
});

describe('Attribute.setAttribute', () => {
	it('adds attribute', () => {
		let attr = new Attribute({ href: '#' });
		attr.setAttribute('target', '_blank');
		expect(attr.getAttributes()).toEqual({ href: '#', target: '_blank' });
	});
	it('replaces existing attribute', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		attr.setAttribute('target', '_self');
		expect(attr.getAttributes()).toEqual({ href: '#', target: '_self' });
	});
	it('removes attribute if value is null', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		attr.setAttribute('target', null);
		expect(attr.getAttributes()).toEqual({ href: '#' });
	});
	it('removes attribute if value is false', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		attr.setAttribute('target', false);
		expect(attr.getAttributes()).toEqual({ href: '#' });
	});
});

describe('Attribute.setAttributes', () => {
	it('adds multiple attributes', () => {
		let attr = new Attribute({});
		attr.setAttributes({ href: '#', target: '_blank' });
		expect(attr.getAttributes()).toEqual({ href: '#', target: '_blank' });
	});
	it('replaces existing attributes', () => {
		let attr = new Attribute({ target: '_blank' });
		attr.setAttributes({ href: '#', target: '_self' });
		expect(attr.getAttributes()).toEqual({ href: '#', target: '_self' });
	});
	it('removes attributes if value is null', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		attr.setAttributes({ href: null, target: null });
		expect(attr.getAttributes()).toEqual({});
	});
	it('removes attribute if value is false', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		attr.setAttributes({ href: false, target: false });
		expect(attr.getAttributes()).toEqual({});
	});
	it('accepts TokenList as value for `class` attribute', () => {
		let classList = new TokenList('foo bar');
		let attr = new Attribute({ class: classList });
		expect(attr.getAttribute('class')).toBe(classList);
	});
});

describe('Attribute.removeAttribute', () => {
	it('removes existing attribute', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		attr.removeAttribute('target');
		expect(attr.getAttributes()).toEqual({ href: '#' });
	});
	it('ignores missing attributes', () => {
		let attr = new Attribute({ href: '#' });
		attr.removeAttribute('target');
		expect(attr.getAttributes()).toEqual({ href: '#' });
	});
});

describe('Attribute.getAttribute', () => {
	it('returns attribute value', () => {
		let attr = new Attribute({ href: '#' });
		expect(attr.getAttribute('href')).toEqual('#');
	});
});

describe('Attribute.hasAttribute', () => {
	it('returns true or false', () => {
		let attr = new Attribute({ href: '#' });
		expect(attr.hasAttribute('href')).toEqual(true);
		expect(attr.hasAttribute('target')).toEqual(false);
	});
});

describe('Attribute.toString', () => {
	it('serializes attributes to correct format', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		expect(String(attr)).toEqual(' href="#" target="_blank"');
	});
	it('escapes special characters', () => {
		let attr = new Attribute({ value: '<br />', title: '"lorem ipsum"' });
		expect(String(attr)).toEqual(
			' value="&#x3C;br /&#x3E;" title="&#x22;lorem ipsum&#x22;"',
		);
		expect(he.decode(String(attr))).toEqual(
			' value="<br />" title=""lorem ipsum""',
		);
	});
	it('concatenates array values', () => {
		let attr = new Attribute({ rel: ['noopener', 'noreferrer'] });
		expect(String(attr)).toEqual(' rel="noopener noreferrer"');
	});
	it('handles boolean attributes', () => {
		let attr = new Attribute({ disabled: true });
		expect(String(attr)).toEqual(' disabled');
		let attr2 = new Attribute({ disabled: false });
		expect(String(attr2)).toEqual('');
	});
});

describe('Attribute.addClass', () => {
	it('adds single class', () => {
		let attr = new Attribute({ class: 'foo' });
		attr.addClass('bar');
		expect(String(attr)).toEqual(' class="foo bar"');
	});
	it('adds multiple classes via array argument', () => {
		let attr = new Attribute({ class: 'foo' });
		attr.addClass(['bar', 'baz']);
		expect(String(attr)).toEqual(' class="foo bar baz"');
	});
	it('adds multiple classes via multiple arguments', () => {
		let attr = new Attribute({ class: 'foo' });
		attr.addClass('bar', 'baz');
		expect(String(attr)).toEqual(' class="foo bar baz"');
	});
	it('ignores duplicate classes', () => {
		let attr = new Attribute({ class: 'foo' });
		attr.addClass('foo', 'bar');
		expect(String(attr)).toEqual(' class="foo bar"');
	});
});

describe('Attribute.getClass', () => {
	it('returns a TokenList', () => {
		let attr = new Attribute({ class: 'foo bar' });
		expect(attr.getClass()).toBeInstanceOf(TokenList);
	});
	it('returns an empty TokenList if `class` is not set', () => {
		let attr = new Attribute({});
		let classList = attr.getClass();
		expect(classList).toBeInstanceOf(TokenList);
		expect(classList.size).toBe(0);
	});
});

describe('Attribute.removeClass', () => {
	it('removes single class', () => {
		let attr = new Attribute({ class: 'foo bar' });
		attr.removeClass('bar');
		expect(String(attr)).toEqual(' class="foo"');
	});
	it('removes multiple classes via array argument', () => {
		let attr = new Attribute({ class: 'foo bar baz' });
		attr.removeClass(['bar', 'baz']);
		expect(String(attr)).toEqual(' class="foo"');
	});
	it('removes multiple classes via multiple arguments', () => {
		let attr = new Attribute({ class: 'foo bar baz' });
		attr.removeClass('bar', 'baz');
		expect(String(attr)).toEqual(' class="foo"');
	});
	it('ignores missing classes', () => {
		let attr = new Attribute({ class: 'foo bar' });
		attr.removeClass('bar', 'baz');
		expect(String(attr)).toEqual(' class="foo"');
	});
	it('doesn’t require a current value for `class`', () => {
		let attr = new Attribute({ href: '#' });
		attr.removeClass('foo');
		expect(String(attr)).toEqual(' href="#"');
	});
});

describe('Attribute.hasClass', () => {
	it('returns true or false', () => {
		let attr = new Attribute({ class: 'foo bar' });
		expect(attr.hasClass('bar')).toEqual(true);
		expect(attr.hasClass('baz')).toEqual(false);
	});
});

describe('Attribute.toArray', () => {
	it('returns an object of all attributes', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		expect(attr.toArray()).toEqual({ href: '#', target: '_blank' });
	});
});

describe('Attribute', () => {
	it('is iterable', () => {
		let attr = new Attribute({ href: '#', target: '_blank' });
		let obj = {};
		for (const [attribute, value] of attr) {
			obj[attribute] = value;
		}
		expect(obj).toEqual({ href: '#', target: '_blank' });
	});
});
