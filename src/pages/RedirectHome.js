import React from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

import PageBody from "../PageBody";

export default function RedirectHome() {
	return (
		<PageBody>
			<Helmet>
				<title>Redirecting to Home...</title>
			</Helmet>

			<h1>Redirect Home</h1>
			<p>This page should redirect home.</p>

			<Redirect to="/" />
		</PageBody>
	);
}