import extendWithAttributeHelpers from '../src';
import { factory as twigFactory } from 'twig';

describe('default-exported function', () => {
	describe('without options', () => {
		let Twig = twigFactory();
		extendWithAttributeHelpers(Twig);
		it('adds Twig function `attributes`', () => {
			let data = `<a{{ attributes({ href: '#' }) }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a href="#">`);
		});
	});
	describe('with `sortAttributes` option', () => {
		let Twig = twigFactory();
		extendWithAttributeHelpers(Twig, { sortAttributes: true });
		it('adds Twig function `attributes`', () => {
			let data = `<a{{ attributes({ href: '#', target: '_blank' }) }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a href="#" target="_blank">`);
		});
		it('provides `addClass` method', () => {
			let data = `<a{{ attributes({ href: '#' }).addClass('foo') }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a class="foo" href="#">`);
		});
		it('provides `removeClass` method', () => {
			let data = `<a{{ attributes({ class: 'foo bar' }).removeClass('bar') }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a class="foo">`);
		});
		it('provides `setAttribute` method', () => {
			let data = `<a{{ attributes({ href: '#' }).setAttribute('target', '_blank') }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a href="#" target="_blank">`);
		});
		it('provides `removeAttribute` method', () => {
			let data = `<a{{ attributes({ href: '#', target: '_blank' }).removeAttribute('target') }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a href="#">`);
		});
	});
	describe('with `functionName` option', () => {
		let Twig = twigFactory();
		extendWithAttributeHelpers(Twig, {
			functionName: 'attrs',
			sortAttributes: true,
		});
		it('changes the name of the Twig function', () => {
			let data = `<a{{ attrs({ href: '#', target: '_blank' }) }}>`;
			let output = Twig.twig({ data }).render();
			expect(output).toEqual(`<a href="#" target="_blank">`);
		});
	});
});
