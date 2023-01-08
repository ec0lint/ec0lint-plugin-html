const createRuleTester = require("../rule-tester");
const rule = require("../../lib/rules/lighter-video-files");

const ruleTester = createRuleTester();

ruleTester.run("lighter-video-files", rule, {
  valid: [
    {
      code: `<video width="320" height="240" controls>
                <source src="movie.webm" type="video/webm">
            </video>`,
    },
    {
      code: `<video width="320" height="240" controls></video>`,
    },
    {
      code: `<div>Lighter video files rule</div>`,
    },
  ],
  invalid: [
    {
      code: `<video width="320" height="240" controls>
                <source src="movie.mp4" type="video/mp4">
            </video>`,
      errors: [
        {
          message:
            "Format of video files can be changed to WEBM. Your video can be converted online at https://cloudconvert.com/.",
        },
      ],
    },
    {
      code: `<video width="320" height="240" controls>
                <source src="movie.ogv" type="video/ogv">
            </video>`,
      errors: [
        {
          message:
            "Format of video files can be changed to WEBM. Your video can be converted online at https://cloudconvert.com/.",
        },
      ],
    },
  ],
});
