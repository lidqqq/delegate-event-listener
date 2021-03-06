# delegate-event-listener

[![Build Status][ci-img]][ci]
[![BrowserStack Status][browserstack-img]][browserstack]

Delegate event listener.

Features:

-   Flexible usage with native `addEventListener` and `removeEventListener`
-   Current target reference with `event.delegateTarget` property
-   Prevents listener triggering if target element is inside form `[disabled]`
    element

## Install

```sh
npm install delegate-event-listener --save
```

## Usage

Given following markup and JS functionality clicking only on `#frankie` will
trigger event listener even though event handler is attached on `#jackie`.

```html
<div id="jackie">
	<div id="frankie">Frankie</div>
	<div id="sally">Sally</div>
</div>
```

```js
import delegate from 'delegate-event-listener';

const element = document.querySelector('#jackie');

element.addEventListener(
	'click',
	delegate('#frankie', (e) => {
		// e.delegateTarget === document.querySelector('#frankie')
		// Clicked on #frankie!
	})
);
```

## API

### delegate(selector, listener)

Returns: `Function`

Delegated function.

#### selector

Type: `String`

CSS selector whose ancestor is element on which event handler is attached.

#### listener

Type: `Function`

Event listener for event handler.

Native `Event` object is decorated with `event.delegateTarget` property. This
property is same as node resolved from selector. `event.currentTarget` is equal
to node on which event listener is attached.

For non-delegated event handlers attached directly to an element,
`event.delegateTarget` will always be equal to `event.currentTarget`.

## FAQ

### Triggering custom event doesn’t run listener function

Event propagation in `Event` constructor is not active by default. You have to explicitly enable it.

```js
document.body.addEventListener(
	'click',
	delegate('button', () => {
		// …
	})
);

// Setting `bubbles: true` makes event propagation active
document
	.querySelector('button')
	.dispatchEvent(new Event('click', { bubbles: true }));
```

## Browser support

Tested in IE9+ and all modern browsers.

## Test

For automated tests, run `npm run test:automated` (append `:watch` for watcher
support).

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/delegate-event-listener
[ci-img]: https://travis-ci.com/niksy/delegate-event-listener.svg?branch=master
[browserstack]: https://www.browserstack.com/
[browserstack-img]: https://www.browserstack.com/automate/badge.svg?badge_key=aVRta1E1ZzVlcEJCT2Fxb1Vlb0F4bjlzUmhIbGVDNCs3K1Mya3FlcE40UT0tLVJKUXFwQTdpcXMvRjRRbG41bFV6Znc9PQ==--9d47cf877e05bb7a93d3d4fb570deb64c9a659a7

<!-- prettier-ignore-end -->
