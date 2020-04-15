import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
	return (
		<React.Fragment>
			<Header />

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/about">
					<About />
				</Route>

				<Route path="*">
					<NotFound />
				</Route>
			</Switch>

			<Footer />
		</React.Fragment>
	);
}