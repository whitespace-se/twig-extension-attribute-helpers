# Attribute helpers for Twig.js

A Twig.js extension that allows you to work more easily with html attributes inside Twig templates. The API mimics the Attribute objects in Drupal.

## Getting started

```bash
npm install --save @whitespace/twig-extension-attribute-helpers
```

Import the extension and pass it your Twig object:

```js
import Twig from 'twig';
import extendWithAttributeHelpers from '@whitespace/twig-extension-attribute-helpers';

// Adds the `attributes` function
extendWithAttributeHelpers(Twig);

let data = `<a{{ attributes({
  href: '#',
  class: ['btn', 'btn-primary']
}) }}>`;
let output = Twig.twig({ data }).render();
// output === `<a href="#" class="btn btn-primary">`
});
```

## Twig API

### `attributes(attrs)`

Creates and Attribute object containing the passed attributes and values. `attrs` should be an object. When rendered it is serialized as HTML attributes. Example:

```twig
<a{{ attributes({
  href: '#',
  class: ['btn', 'btn-primary']
}) }}>
```

Output:

```twig
<a href="#" class="btn btn-primary">
```

### `.setAttibute(attr, value)`

Sets an attribute on an already created Attribute object:

```twig
{% set linkAttributes = attributes({
  href: '#'
}) %}
<a{{ linkAttributes.setAttribute('target', '_blank') }}>
```

Output:

```twig
<a href="#" target="_blank">
```

### `.removeAttibute(attr)`

Unsets a previously set attribute

```twig
{% set linkAttributes = attributes({
  href: '#',
  target: '_blank'
}) %}
<a{{ linkAttributes.removeAttribute('target') }}>
```

Output:

```twig
<a href="#">
```

### `.addClass(...classNames)`

Adds one or more classes to the `class` attribute.

```twig
{% set linkAttributes = attributes({
  href: '#'
}) %}
<a{{ linkAttributes.addClass('btn', 'btn-primary') }}>
```

Output:

```twig
<a href="#" class="btn btn-primary">
```

### `.removeClass(...classNames)`

Removes one or more classes from the `class` attribute.

```twig
{% set linkAttributes = attributes({
  href: '#',
  class: ['btn', 'btn-primary']
}) %}
<a{{ linkAttributes.removeClass('btn-primary') }}>
```

Output:

```twig
<a href="#" class="btn">
```

### Other functions

- `setAttributes(attrs)`
- `getAttribute()`
- `getAttributes()`
- `hasAttribute(attr)`
- `getClass()`
- `hasClass(className)`
