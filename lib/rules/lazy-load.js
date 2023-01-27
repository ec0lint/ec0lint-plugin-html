/**
 * @typedef {import("../types").Rule} Rule
 */

const { RULE_CATEGORY } = require("../constants");
const calculateCO2LazyLoadReduction = require('../../scripts/co2-module');

const imageTags = ["img", "iframe"];
const videoTags = ["video"];

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
  },
  create(context) {
    return {
      Tag(node) {
        const isImageTag = imageTags.includes(node.name);
        const isVideoTag = videoTags.includes(node.name);
        if (!isImageTag && !isVideoTag) {
          return;
        }

        if (
          (isImageTag && !isImageLazyLoaded(node)) ||
          (isVideoTag && !isVideoLazyLoaded(node))
        ) {
          const fileName = getFileName(node);
          const co2Reduction = fileName ? calculateCO2LazyLoadReduction(fileName).toFixed(2) : null;
          const message = `Lazy loading can be used for ${
                    fileName ? fileName + "." : "this file."}` +
                `${co2Reduction !== null ? " Estimated CO2 reduction that you can achieve is: " + co2Reduction + "g" : ""}`;

          context.report({
            loc: node.loc,
            message,
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
      return (
        attr.key.value.includes("data-") && typeof attr.value.value === "string"
      );
    }
  });
}

function isImageLazyLoaded(node) {
  const hasSrc = hasSrcAttrAndValue(node);
  if (hasSrc) {
    return hasLoadingAttrAndValue(node);
  }
  return (
    hasDataAttrAndValue(node) && (hasLazyClass(node) || hasLazyLoadClass(node))
  );
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

function getFileName(node) {
  let fileName = null;
  node.attributes.some((attr) => {
    if (
      attr.key &&
      attr.value &&
      (attr.key.value === "src" || attr.key.value.includes("data-"))
    ) {
      fileName = attr.value.value;
    }
  });
  return fileName;
}
