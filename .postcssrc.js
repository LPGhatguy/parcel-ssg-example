const path = require("path");
const { writeFileSync } = require("fs");
const { sync: mkdirpSync } = require("mkdirp");

mkdirpSync(".gwee/css-modules");

module.exports = {
  modules: true,

  plugins: [
    require("postcss-modules")({
      getJSON: (cssFileName, json, _outputFileName) => {
        const cssBaseName = path.basename(cssFileName, ".css");
        const outName = `.gwee/css-modules/${ cssBaseName }.json`;

        writeFileSync(outName, JSON.stringify(json));
      },
    }),
  ],
};