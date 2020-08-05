const emoticon = require('emoticon');

const emoticons = emoticon.map(e => e.emoticons).flat();
const c = [0, 1, 2, 3, 4].map(i => '[' + escapeRegExp(Array.from(new Set(emoticons.map(c => c[i]).filter(c => c))).join('')) + ']');
const RE_ONE_EMOTICON = `${c[0]}${c[1]}${c[2]}${c[3]}${c[4]}|${c[0]}${c[1]}${c[2]}${c[3]}|${c[0]}${c[1]}${c[2]}|${c[0]}${c[1]}`;
const RE_SEQ_EMOTICON = `(${RE_ONE_EMOTICON})+`;
const RE_EMOTICON = RegExp(`(^|[^\\w])${RE_SEQ_EMOTICON}([^\\w]|$)`, 'g');
const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = { RE_ONE_EMOTICON, RE_EMOTICON, RE_EMOJI };
