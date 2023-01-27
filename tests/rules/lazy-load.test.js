const createRuleTester = require("../rule-tester");
const rule = require("../../lib/rules/lazy-load");
const calculateCO2LazyLoadReduction = require("../../scripts/co2-module");

const ruleTester = createRuleTester();

ruleTester.run("lazy-load", rule, {
  valid: [
    {
      code: `<img src="lib/testResources/img.jpg" loading="lazy"> </img>`,
    },
    {
      code: `<iframe data-src="lib/testResources/img.jpg" class="lazy"> </iframe>`,
    },
    {
      code: `<img data-src="lib/testResources/img.jpg" class="lazyload"> </img>`,
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
          message: "Lazy loading can be used for this file.",
        },
      ],
    },
    {
      code: `<video preload="auto"> </video>`,
      errors: [
        {
          message: "Lazy loading can be used for this file.",
        },
      ],
    },
    {
      code: `<img src="lib/testResources/img.jpg"> </img>`,
      errors: [
        {
          message:
            `Lazy loading can be used for lib/testResources/img.jpg. ` +
            `Estimated CO2 reduction that you can achieve is: ${calculateCO2LazyLoadReduction(
              "lib/testResources/img.jpg"
            ).toFixed(2)}g`,
        },
      ],
    },
    {
      code: `<iframe data-src="lib/testResources/img.jpg" class="none"> </iframe>`,
      errors: [
        {
          message:
            `Lazy loading can be used for lib/testResources/img.jpg. ` +
            `Estimated CO2 reduction that you can achieve is: ${calculateCO2LazyLoadReduction(
              "lib/testResources/img.jpg"
            ).toFixed(2)}g`,
        },
      ],
    },
  ],
});
