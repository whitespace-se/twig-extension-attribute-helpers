import Attribute from './Attribute';

export default function(
	Twig,
	{ functionName = 'attributes', sortAttributes = false } = {},
) {
	Twig.extendFunction(
		functionName,
		attributes => new Attribute(attributes, { sortAttributes }),
	);
}

export { default as Attribute } from './Attribute';
