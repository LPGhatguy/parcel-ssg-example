import React from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

import MDXComponents from "./MDXComponents";
import Header from "./Header";
import Footer from "./Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import RedirectHome from "./pages/RedirectHome";
import NotFound from "./pages/NotFound";

export default function App() {
	return (
		<MDXComponents>
			<Helmet
				titleTemplate="%s | Parcel SSG Example"
				defaultTitle="Parcel SSG Example"
			>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
			</Helmet>

			<Header />

			<Switch>
				<Route exact path="/">
					<Home />
				</Route>

				<Route exact path="/about">
					<About />
				</Route>

				<Route exact path="/redirect-home">
					<RedirectHome />
				</Route>

				<Route path="*">
					<NotFound />
				</Route>
			</Switch>

			<Footer />
		</MDXComponents>
	);
}