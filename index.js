const visit = require('unist-util-visit');
const emoji = require('node-emoji');
const emoticon = require('emoticon');

const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;
const emoticons = emoticon.map(e => e.emoticons).flat();
const c = [0, 1, 2, 3, 4].map(i => '[' + escapeRegExp(Array.from(new Set(emoticons.map(c => c[i]).filter(c => c))).join('')) + ']');
const s = `${c[0]}${c[1]}(${c[2]}|(${c[2]}${c[3]})|(${c[2]}${c[3]}${c[4]}))?`
const g = `(${s})+`
const f = `(^|[^\\w])${g}([^\\w]|$)`;
const RE_EMOTICON = RegExp(f, 'g');

const DEFAULT_SETTINGS = {
  padSpaceAfter: false,
  emoticon: false
};

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function plugin(options) {
  const settings = Object.assign({}, DEFAULT_SETTINGS, options);
  const pad = !!settings.padSpaceAfter;
  const emoticonEnable = !!settings.emoticon;

  function getEmoji(match) {
    const got = emoji.get(match);
    if (pad && got !== match) {
      return got + ' ';
    }
    return got;
  }

  function getEmojiByShortCode(match) {
    // find emoji by shortcode - full match or with-out last char as it could be from text e.g. :-),
    const iconFull = emoticon.find(e => e.emoticons.includes(match)); // full match
    const iconPart = emoticon.find(e => e.emoticons.includes(match.slice(0, -1))); // second search pattern
    const trimmedChar = iconPart ? match.slice(-1): '';
    const addPad = pad ? ' ': '';
    let icon = iconFull ?
      iconFull.emoji + addPad:
      iconPart && (iconPart.emoji + addPad +  trimmedChar);
    return icon || match;
  }

  function getEmojiByShortCodeOuter(match) {
    return match.replace(RegExp(s, 'g'), getEmojiByShortCode);
  }

  function transformer(tree) {
    visit(tree, 'text', function(node) {
      node.value = node.value.replace(RE_EMOJI, getEmoji);

      if (emoticonEnable) {
        node.value = node.value.replace(RE_EMOTICON, getEmojiByShortCodeOuter);
      }
    });
  }

  return transformer;
}

module.exports = plugin;
