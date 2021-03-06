# remark-emoji
*Forked from remark-emoji for better emoticon parsing.*

This is a [remark](https://github.com/wooorm/remark) plugin to replace `:emoji:` to real UTF-8 emojis in text.

## Demo
You can find a demo in the following [Codesandbox](https://codesandbox.io/s/remark-emoji-example-osvyi).

## Usage

```
remark().use(emoji [, options]);
```

```javascript
const remark = require('remark');
const emoji = require('remark-emoji');

const doc = 'Emojis in this text will be replaced: :dog: :+1:';
console.log(remark().use(emoji).process(doc).contents);
// => Emojis in this text will be replaced: 🐶 👍
```

## Options

### `options.padSpaceAfter`
Setting to `true` means that an extra whitespace is added after emoji. This is useful when browser handle emojis with half character length and following character is hidden. Default value is `false`.

### `options.emoticon`
Setting to `true` means that [emoticon](https://www.npmjs.com/package/emoticon) shortcodes are supported (e.g. :-) will be replaced by 😃). Default value is `false`.

## License
Distributed under [the MIT License](LICENSE).
