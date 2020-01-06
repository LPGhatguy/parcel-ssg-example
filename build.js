import React from "react";
import ReactDOMServer from "react-dom/server";
import { JSDOM } from "jsdom";
import { readFileSync, writeFileSync } from "fs";
import { sync as mkdirpSync } from "mkdirp";
import path from "path";

import App from "./src/App";
import { LinkCallbackContext } from "./src/Link";

const OUT_DIR = path.join(__dirname, "dist");
const TEMPLATE = readFileSync("dist/index.html", "utf8");
const INITIAL_ROUTE = "/";

function renderPage(route, linkRenderCallback) {
	const content = ReactDOMServer.renderToString(
		<LinkCallbackContext.Provider value={ linkRenderCallback }>
			<App />
		</LinkCallbackContext.Provider>
	);

	const dom = new JSDOM(TEMPLATE);
	const main = dom.window.document.querySelector("#app");
	main.innerHTML = content;

	return dom.serialize();
}

function routeToFilePath(route) {
	let current = OUT_DIR;

	for (const piece of route.split("/")) {
		if (piece.length === 0) {
			continue;
		}

		current = path.join(current, piece);
	}

	return path.join(current, "index.html");
}

function build() {
	mkdirpSync(OUT_DIR);

	const seenRoutes = new Set();
	seenRoutes.add(INITIAL_ROUTE);

	const routesToVisit = [INITIAL_ROUTE];

	const linkRenderCallback = route => {
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

		const rendered = renderPage(route);
		const out = routeToFilePath(route);

		console.log(`Saving to ${ out }`);

		writeFileSync(out, rendered);
	}
}

build();