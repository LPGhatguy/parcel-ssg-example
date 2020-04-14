import Parcel from "parcel-bundler";
import React from "react";
import ReactDOMServer from "react-dom/server";
import path from "path";
import { JSDOM } from "jsdom";
import { MemoryRouter as Router } from "react-router-dom";
import { readFileSync, writeFileSync } from "fs";
import { sync as mkdirpSync } from "mkdirp";
import { sync as rimrafSync } from "rimraf";

import App from "./src/App";

console.log("Starting Gwee build");

(async function main() {
	await build({
		entry: "src/index.html",
		outDir: "dist",
		renderPage: (template, route, addRoute) => {
			const dom = new JSDOM(template);
			const main = dom.window.document.querySelector("#app");
			const content = ReactDOMServer.renderToString(
				<Router>
					<App />
				</Router>
			);
			main.innerHTML = content;

			const links = dom.window.document.querySelectorAll("a");
			for (const link of links) {
				// Ignore off-site links
				if (/^\w+:\/\//.test(route)) {
					continue;
				}

				addRoute(link.href);
			}

			return dom.serialize();
		},
	});
})();

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