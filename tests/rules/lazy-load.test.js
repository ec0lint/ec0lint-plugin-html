const createRuleTester = require("../rule-tester");
const rule = require("../../lib/rules/lazy-load");

const ruleTester = createRuleTester();

ruleTester.run("lazy-load", rule, {
    valid: [
      {
        code: `<img src="img.jpg" loading="lazy"> </img>`,
      },
      {
        code: `<iframe data-src="img.jpg" class="lazy"> </iframe>`,
      },
      {
        code: `<img data-src="img.jpg" class="lazyload"> </img>`,
      },
      {
        code: `<video class="lazy"> </video>`,
      },
      {
        code: `<video preload="none"> </video>`,
      },
      {
        code: `<div>Lazy loading rule</div>`,
      },
    ],
    invalid: [
      {
        code: `<video class="none"> </video>`,
        errors: [
          {
            message: "You should consider using lazy-loading for this file.",
          },
        ],
      },
      {
        code: `<video preload="auto"> </video>`,
        errors: [
          {
            message: "You should consider using lazy-loading for this file.",
          },
        ],
      },
      {
        code: `<img src="img.jpg"> </img>`,
        errors: [
          {
            message: "You should consider using lazy-loading for this file.",
          },
        ],
      },
      {
        code: `<iframe data-src="img.jpg" class="none"> </iframe>`,
        errors: [
          {
            message: "You should consider using lazy-loading for this file.",
          },
        ],
      },
    ],
  });  