import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const main = document.querySelector("#app");

if (main.hasChildNodes()) {
	ReactDOM.hydrate(<App />, main);
} else {
	ReactDOM.render(<App />, main);
}