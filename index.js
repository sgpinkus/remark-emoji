const visit = require('unist-util-visit');
const emoji = require('node-emoji');
const { emoticons, RE_ONE_EMOTICON, RE_EMOTICONS } = require('./emoticons');
const RE_EMOJI = /:\+1:|:-1:|:[\w-]+:/g;


const DEFAULT_SETTINGS = {
    padSpaceAfter: false,
    emoticon: false
};

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

    function getEmoticon(match) {
        // find emoji by shortcode - full match or with-out last char as it could be from text e.g. :-)
        let i = Math.min(match.length, 5);
        let icon;
        while(!icon && i > 1) {
            icon = emoticons[match.slice(0,i)];
            i--;
        }
        icon = icon ? icon + match.slice(i + 1) + (pad ? ' ': '') : match;
        return icon;
    }

    function getEmoticonOuter(match) {
        const r = RegExp(RE_ONE_EMOTICON, 'g');
        return match.replace(r, getEmoticon);
    }

    function transformer(tree) {
        visit(tree, 'text', function(node) {
            node.value = node.value.replace(RE_EMOJI, getEmoji);

            if (emoticonEnable) {
                node.value = node.value.replace(RE_EMOTICONS, getEmoticonOuter);
            }
        });
    }

    return transformer;
}

module.exports = plugin;
