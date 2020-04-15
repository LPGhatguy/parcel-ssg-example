// Custom static site generator using Parcel.
//
// This script cannot be run directly by Node.js, but can be built via Parcel
// and then run.

import Parcel from "parcel-bundler";
import path from "path";
import { promises as fs } from "fs";
import rimraf from "rimraf";

import React from "react";
import ReactDOMServer from "react-dom/server";
import { JSDOM } from "jsdom";
import { MemoryRouter as Router } from "react-router-dom";

import App from "./src/App";

function main() {
	build({
		entry: "src/index.html",
		outDir: "dist",
		renderPage: (template, route, addRoute) => {
			// renderPage is expected to render the passed in route and render
			// it to a string containing HTML.
			//
			// We can do that however we want. Here we use React.
			//
			// `template` is given to us as an HTML string that has been
			// processed by Parcel. It'll be the contents of `src/index.html`,
			// but with CSS and JS references injected into it.

			const dom = new JSDOM(template);
			const main = dom.window.document.querySelector("#app");
			const content = ReactDOMServer.renderToString(
				<Router>
					<App />
				</Router>
			);
			main.innerHTML = content;

			// To add new pages, we can invoke `addRoute` with a site-relative
			// path.
			//
			// Here, we're just crawling the page for anything that looks like a
			// link.
			const links = dom.window.document.querySelectorAll("a");
			for (const link of links) {
				// Rough pattern to ignore off-site links
				if (/^\w+:\/\//.test(route)) {
					continue;
				}

				addRoute(link.href);
			}

			return dom.serialize();
		},
	});
}

// Build the given Parcel entrypoint. Individual pages are rendered using the
// `renderPage` callback, which should return HTML strings.
async function build({ entry, outDir, renderPage }) {
	await rimrafPromise(outDir);
	await fs.mkdir(outDir, { recursive: true });

	const bundler = new Parcel([entry], {
		watch: false,
		minify: true,
		autoInstall: false,
	});

	await bundler.bundle();

	// This should be `entry`, but processed by Parcel.
	const template = await fs.readFile(path.join(outDir, path.basename(entry)));

	const visitedRoutes = new Set();
	visitedRoutes.add("/");

	const routesToVisit = ["/"];

	const addRoute = route => {
		if (!visitedRoutes.has(route)) {
			visitedRoutes.add(route);
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

		console.log(`Saving to ${ out }`);

		await fs.mkdir(path.dirname(out), { recursive: true });
		await fs.writeFile(out, rendered);
	}
}

// Simple Promise wrapper around rimraf.
function rimrafPromise(dir) {
	return new Promise((resolve, reject) => {
		rimraf(dir, (err) => {
			if (err == null) {
				resolve();
			} else {
				reject(err);
			}
		});
	});
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

main();