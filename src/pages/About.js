import React from "react";
import { Helmet } from "react-helmet";

import PageBody from "../PageBody";
import AboutContent from "../AboutContent.mdx";

export default function About() {
	return (
		<PageBody>
			<Helmet>
				<title>About</title>
			</Helmet>

			<AboutContent />
		</PageBody>
	);
}