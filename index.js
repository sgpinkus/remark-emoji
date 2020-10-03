const visit = require('unist-util-visit');
const { replaceEmoticons } = require('emoticon-to-emoji');
const { replaceCodeNames } = require('codename-to-emoji');

const defaultSettings = {
  padSpaceAfter: false,
  emoticon: false
};

function plugin(options) {
  const settings = Object.assign({}, defaultSettings, options);
  const pad = !!settings.padSpaceAfter;
  const emoticonEnable = !!settings.emoticon;

  function transformer(tree) {
    visit(tree, 'text', function(node) {
      node.value = replaceCodeNames(node.value, pad);
      if (emoticonEnable) {
        node.value = replaceEmoticons(node.value, undefined, pad);
      }
    });
  }
  return transformer;
}

module.exports = plugin;
