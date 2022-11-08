/**
 * @typedef {import("../types").Rule} Rule
 */

const { RULE_CATEGORY } = require("../constants");
const { NodeUtils } = require("./utils");

const imageTags = ["img", "iframe"];
const videoTags = ["video"];

const MESSAGE_IDS = {
    MISSING_LAZY_LOADING: "missing",
};

/**
 * @type {Rule}
 */
module.exports = {
    meta: {
        type: "code",

        docs: {
            description: "Suggest to use lazy load",
            category: RULE_CATEGORY.BEST_PRACTICE,
            recommended: false,
        },

        fixable: null,
        schema: [],
        messages: {
            [MESSAGE_IDS.MISSING_LAZY_LOADING]: "You should consider using lazy-loading for this file.",
        },
    },
    create(context) {
        return {
            Tag(node) {

                const isImageTag = imageTags.includes(node.name);
                const isVideoTag = videoTags.includes(node.name);
                if (!isImageTag && !isVideoTag) {
                    return;
                }
            
                
                if((isImageTag && !isImageLazyLoaded(node) )|| (isVideoTag && !isVideoLazyLoaded(node))) {
                    context.report({
                        loc: node.loc,
                        messageId: MESSAGE_IDS.MISSING_LAZY_LOADING,
                    });
                }
            },
        };
    },
};

function hasSrcAttrAndValue(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return attr.key.value === "src" && typeof attr.value.value === "string";
        }
    });
}

function hasLoadingAttrAndValue(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return attr.key.value === "loading" && attr.value.value === "lazy";
        }
    });
}

function hasDataAttrAndValue(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return attr.key.value.includes("data-") && typeof attr.value.value === "string";
        }
    });
}

function isImageLazyLoaded(node) {
    const hasSrc = hasSrcAttrAndValue(node);
    if (hasSrc) {
        return hasLoadingAttrAndValue(node);
    }
    return hasDataAttrAndValue(node) && (hasLazyClass(node) || hasLazyLoadClass(node));
}

function hasLazyClass(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return attr.key.value === "class" && attr.value.value === "lazy";
        }
    });
}

function hasLazyLoadClass(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return attr.key.value === "class" && attr.value.value === "lazyload";
        }
    });
}

function hasPreloadNone(node) {
    return node.attributes.some((attr) => {
        if (attr.key && attr.value) {
            return attr.key.value === "preload" && attr.value.value === "none";
        }
    });
}

function isVideoLazyLoaded(node) {
    return hasLazyClass(node) || hasPreloadNone(node);
}