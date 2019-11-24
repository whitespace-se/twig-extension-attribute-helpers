import TokenList from '../src/TokenList';

describe('TokenList.contructor', () => {
	it('allows zero arguments', () => {
		let tokenList = new TokenList();
		expect(tokenList.size).toBe(0);
	});
	it('allows empty string', () => {
		let tokenList = new TokenList('');
		expect(tokenList.size).toBe(0);
	});
	it('allows string of tokens', () => {
		let tokenList = new TokenList('foo bar');
		expect(tokenList.size).toBe(2);
	});
	it('allows array of strings', () => {
		let tokenList = new TokenList(['foo', 'bar']);
		expect(tokenList.size).toBe(2);
	});
	it('allows non-string value', () => {
		let tokenList = new TokenList(5);
		expect(tokenList.size).toBe(1);
	});
});
