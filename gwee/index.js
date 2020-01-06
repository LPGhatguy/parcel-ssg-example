const Parcel = require("parcel-bundler");
const babel = require("@babel/core");
const hook = require("node-hook");
const path = require("path");
const { sync: mkdirpSync } = require("mkdirp");
const { sync: rimrafSync } = require("rimraf");
const { readFileSync, writeFileSync } = require("fs");

// Install hooks so that Node.js will correctly handle files Gwee cares about:
// - JS files should be run through Babel
// - CSS files should be processed as CSS modules
function installHooks() {
	// Compile requires with Babel
	hook.hook(".js", (source, filename) => {
		// Ignore any file in node_modules
		if (/[\\\/]node_modules[\\\/]/.test(filename)) {
			return source;
		}

		const transformed = babel.transformSync(source, {
			filename,
		});

		return transformed.code;
	});

	// Transform CSS files into objects containing CSS classes
	hook.hook(".css", (source, filename) => {
		const name = path.basename(filename, ".css");
		const jsonPath = `.gwee/css-modules/${ name }.json`;
		const newContent = readFileSync(jsonPath);

		return `module.exports = ${ newContent };`;
	});
}

async function build({ entry, outDir, renderPage }) {
	rimrafSync(outDir);
	mkdirpSync(outDir);

	const bundler = new Parcel([entry], {
		cacheDir: ".gwee/parcel-cache",
		watch: false,
		minify: true,
		autoInstall: false,
	});

	await bundler.bundle();

	const template = readFileSync(path.join(outDir, "index.html"));

	const seenRoutes = new Set();
	seenRoutes.add("/");

	const routesToVisit = ["/"];

	const addRoute = route => {
		if (!seenRoutes.has(route)) {
			seenRoutes.add(route);
			routesToVisit.push(route);
		}
	};

	while (true) {
		const route = routesToVisit.pop();

		if (route == null) {
			break;
		}

		console.log(`Generating route ${ route }`);

		const rendered = renderPage(template, route, addRoute);
		const out = routeToFilePath(route, outDir);

		mkdirpSync(path.dirname(out));

		console.log(`Saving to ${ out }`);

		writeFileSync(out, rendered);
	}
}

// Transforms a site-relative route for a page into a file path.
function routeToFilePath(route, outDir) {
	let current = outDir;

	for (const piece of route.split("/")) {
		if (piece.length === 0) {
			continue;
		}

		current = path.join(current, piece);
	}

	return path.join(current, "index.html");
}

module.exports = {
	installHooks,
	build,
};