const React = require("react");
const ReactDOMServer = require("react-dom/server");
const path = require("path");
const { JSDOM } = require("jsdom");
const { readFileSync, writeFileSync } = require("fs");

const gwee = require("./gwee");
gwee.installHooks();

const App = require("./src/App").default;

(async function main() {
	await gwee.build({
		entry: "src/index.html",
		outDir: "dist",
		renderPage: (template, route, addRoute) => {
			const dom = new JSDOM(template);
			const main = dom.window.document.querySelector("#app");
			const content = ReactDOMServer.renderToString(React.createElement(App));
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