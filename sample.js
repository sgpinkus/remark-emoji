var fs = require('fs');
var unified = require('unified');
var markdown = require('remark-parse');
var emoji = require('./index');
var remark2rehype = require('remark-rehype');
var format = require('rehype-format'); // https://www.npmjs.com/package/rehype-format
var html = require('rehype-stringify');
var file = 'sample.md';


unified()
  .use(markdown)
  .use(emoji, { padSpaceAfter: false, emoticon: true })
  .use(remark2rehype)
  .use(format)
  .use(html)
  .process(fs.readFileSync(file), function (err, file) {
    console.log(String(file)); // eslint-disable-line
  });
