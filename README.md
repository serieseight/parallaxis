# Parallaxis

A tiny parallax library that updates styles on scroll

- Plain old vanilla JS
- Just x.xkb gzipped

## Warning

Parallax works by listening to **every** scroll event.
Parallaxis is probably the only parallax library that thinks
parallax is a shit show.

This leads to Parallaxis being quite opinionated. It allows
only a few element styles to be updated on scroll, in the
hope of not totally killing performance.

- `opacity`
- `translateX`
- `translateY`

For best performance try to only use Parallaxis on one or
two elements per page, and avoid using on mobile completely.

## Examples

### Codepen

- [Hello world](http://codepen.io/colinmeinke/pen/woWVLM)

Alternatively, take a look in `/examples`.

## Installation

```
npm install parallaxis
```

## Usage

```html
<section
  id="hello-world"
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-opacity-start="1"
  data-opacity-end="0"
>
  <h1>Hello world</h1>
</section>
```

```js
import parallaxis from 'parallaxis'
parallaxis()
```

The above example translates to:

- When `window.scrollY` equals `0` then the `opacity`
  of `#hello-world` will be `1`.
- When `window.scrollY` equals `200`, or more, then the
  `opacity` of `#hello-world` will be `0`.
- When `window.scrollY` is somewhere between `0` and
  `200` then the `opacity` of `#hello-world` will be
  somewhere between `0` and `1`.

## Options

The `parallaxis` function can take an object, that
may include the following properties.

### className

The class name that Parallaxis uses to locate elements.
Defaults to `js-parallaxis`.

```js
parallaxis({ className: 'my-special-class' })
```

## Data attributes

Parallaxis uses element data attributes for configuration.

### Required

#### start

This is the `window.scrollY` position that will be the
element's update start point.

```html
<section
  class="js-parallaxis"
  data-start="0"
>
</section>
```

#### end

This is the `window.scrollY` position that will be the
element's update end point.

```html
<section
  class="js-parallaxis"
  data-start="0"
  data-end="200"
>
</section>
```

### Optional

#### opacity

Defining `data-opacity-start` **and** `data-opacity-end` will
result in `opacity` style updates.

##### start

```html
<section
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-opacity-start="1"
  data-opacity-end="0"
>
</section>
```

#### translateX

Defining `data-translatex-start` **and** `data-translatex-end`
will result in `transform: translateX()` style updates.

```html
<section
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-translatex-start="0"
  data-translatex-end="200"
>
</section>
```

#### translateY

Defining `data-translatey-start` **and** `data-translatey-end`
will result in `transform: translateY()` style updates.

```html
<section
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-translatey-start="0"
  data-translatey-end="200"
>
</section>
```

## Browser support

Parallaxis is packaged with Babel, and
[makes use of `Array.from`](https://babeljs.io/docs/usage/caveats).
If you want Parallaxis to work on browsers that don't support
this method (e.g. IE11), then you will need to
[polyfill `Array.from`](https://github.com/zloirock/core-js)
before calling `parallaxis`.
