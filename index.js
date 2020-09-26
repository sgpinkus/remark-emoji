const visit = require('unist-util-visit');
const emoji = require('node-emoji');
const { replaceEmoticons } = require('emoticon-to-emoji')
const emojiRegExp = /:\+1:|:-1:|:[\w-]+:/g;


const defaultSettings = {
  padSpaceAfter: false,
  emoticon: false
};


function plugin(options) {
  const settings = Object.assign({}, defaultSettings, options);
  const pad = !!settings.padSpaceAfter;
  const emoticonEnable = !!settings.emoticon;

  function getEmoji(match) {
    const got = emoji.get(match);
    if (pad && got !== match) {
      return got + ' ';
    }
    return got;
  }

  function transformer(tree) {
    visit(tree, 'text', function(node) {
      node.value = node.value.replace(emojiRegExp, getEmoji);
      if (emoticonEnable) {
        node.value = replaceEmoticons(node.value, undefined, pad);
      }
    });
  }
  return transformer;
}


module.exports = plugin;
