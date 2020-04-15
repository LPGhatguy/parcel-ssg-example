import React from "react";
import { Helmet } from "react-helmet";

import PageBody from "../PageBody";

export default function About() {
	return (
		<PageBody>
			<Helmet>
				<title>About</title>
			</Helmet>

			<h1>About</h1>
		</PageBody>
	);
}