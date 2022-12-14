/**
 * @typedef {import("../types").Rule} Rule
 */

const { RULE_CATEGORY } = require("../constants");

const bannedVideoFormats = [".ogv", ".mp4"];
/**
 * @type {Rule}
 */
module.exports = {
  meta: {
    type: "code",
    messages: {
      consider:
        "Format of video files can be changed to WEBM. Your video can be converted online at https://cloudconvert.com/.",
    },
    docs: {
      description: "Suggest to use lighter video files format",
      category: RULE_CATEGORY.BEST_PRACTICE,
      recommended: false,
    },

    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      Tag(node) {
        const isVideoSourceTag = node.name.includes("source");
        if (!isVideoSourceTag || !hasBannedVideoFormat(node)) {
          return;
        }
        context.report({
          loc: node.loc,
          messageId: "consider",
        });
      },
    };
  },
};

function hasBannedVideoFormat(node) {
  return node.attributes.some((attr) => {
    if (attr.key && attr.value) {
      return (
        attr.key.value === "src" &&
        bannedVideoFormats.filter((format) => attr.value.value.includes(format))
          .length !== 0
      );
    }
  });
}
