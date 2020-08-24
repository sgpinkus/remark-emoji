const emoticon = require('emoticon');

const emoticons = Object.fromEntries(emoticon
    .map(spec => spec.emoticons.map(code => [code, spec.emoji])).flat()
    .sort((a, b) => a[0].length > b[0].length ? 1 : a[0].length === b[0].length ? 0 : -1));

const c = [0, 1, 2, 3, 4]
    .map(i => '[' + escapeRegExp(Array.from(new Set(Object.keys(emoticons).map(c => c[i]).filter(c => c))).join('')) + ']');
const RE_ONE_EMOTICON = `${c[0]}${c[1]}${c[2]}${c[3]}${c[4]}|${c[0]}${c[1]}${c[2]}${c[3]}|${c[0]}${c[1]}${c[2]}|${c[0]}${c[1]}`;
const RE_SEQ_EMOTICON = `(${RE_ONE_EMOTICON})+`;
const RE_EMOTICONS = RegExp(`(^|[^\\w])${RE_SEQ_EMOTICON}([^\\w]|$)`, 'g');

function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = { RE_ONE_EMOTICON, RE_EMOTICONS, emoticons };
