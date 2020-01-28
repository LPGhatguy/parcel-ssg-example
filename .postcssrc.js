const path = require("path");
const { writeFileSync } = require("fs");
const { sync: mkdirpSync } = require("mkdirp");

mkdirpSync(".gwee/css-modules");

module.exports = {
  modules: true,
  plugins: {
    "postcss-modules": {
      generateScopedName: "[name]_[local]_[hash:base64:5]",

      // Defining getJSON breaks everything in Parcel, but we need it for builds.
      // Cool. Great engineering work, guys.
      getJSON: (cssFileName, json, _outputFileName) => {
        const cssBaseName = path.basename(cssFileName, ".css");
        const outName = `.gwee/css-modules/${ cssBaseName }.json`;

        writeFileSync(outName, JSON.stringify(json));
      },
    }
  }
};