const Parcel = require("parcel-bundler");

process.env.NODE_ENV = "production";

(async function main() {
	const bundler = new Parcel(["ssg.js"], {
		cacheDir: ".gwee/parcel-cache",
		outDir: ".gwee/ssg",
		target: "node",
		watch: false,
		minify: true,
		autoInstall: false,
	});

	await bundler.bundle();

	require("./.gwee/ssg/ssg.js");
})();