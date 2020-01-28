import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import App from "./App";

const main = document.querySelector("#app");

const app = (
	<Router>
		<App />
	</Router>
);

if (main.hasChildNodes()) {
	ReactDOM.hydrate(app, main);
} else {
	ReactDOM.render(app, main);
}