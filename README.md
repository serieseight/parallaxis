# Parallaxis

A tiny parallax library that updates styles on scroll

- Plain old vanilla JS
- Just 1.6kb gzipped

## Be careful out there

Parallax works by listening to **every** scroll event.
Now, that's not great, as it can really mess performance up.

Parallaxis allows only a few of the best performing element
styles to be updated on scroll.

- `opacity`
- `translateX`
- `translateY`
- `scale`

Still, overuse may kill performance. Especially on low-end
devices.

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
<h1
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-opacity-start="1"
  data-opacity-end="0"
>
  Hello world
</h1>
```

```js
import parallaxis from 'parallaxis'
parallaxis()
```

The above example translates to:

- When `window.scrollY` equals `0` then the `opacity`
  of the `h1` will be `1`.
- When `window.scrollY` equals `200`, or more, then the
  `opacity` of the `h1` will be `0`.
- When `window.scrollY` is somewhere between `0` and
  `200` then the `opacity` of the `h1` will be
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
<h1
  class="js-parallaxis"
  data-start="0"
>
  Hello world
</h1>
```

#### end

This is the `window.scrollY` position that will be the
element's update end point.

```html
<h1
  class="js-parallaxis"
  data-start="0"
  data-end="200"
>
  Hello world
</h1>
```

### Optional

#### opacity

Defining `data-opacity-start` **and** `data-opacity-end` will
result in `opacity` style updates.

##### start

```html
<h1
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-opacity-start="1"
  data-opacity-end="0"
>
  Hello world
</h1>
```

#### translateX

Defining `data-translatex-start` **and** `data-translatex-end`
will result in `transform: translateX()` style updates.

```html
<h1
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-translatex-start="0"
  data-translatex-end="200"
>
  Hello world
</h1>
```

#### translateY

Defining `data-translatey-start` **and** `data-translatey-end`
will result in `transform: translateY()` style updates.

```html
<h1
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-translatey-start="0"
  data-translatey-end="200"
>
  Hello world
</h1>
```

#### scale

Defining `data-scale-start` **and** `data-scale-end`
will result in `transform: scale()` style updates.

```html
<h1
  class="js-parallaxis"
  data-start="0"
  data-end="200"
  data-scale-start="1"
  data-scale-end="4"
>
  Hello world
</h1>
```

## Browser support

Parallaxis is packaged with Babel, and
[makes use of `Array.from`](https://babeljs.io/docs/usage/caveats).
If you want Parallaxis to work on browsers that don't support
this method (e.g. IE11), then you will need to
[polyfill `Array.from`](https://github.com/zloirock/core-js)
before calling `parallaxis`.
