import React from "react";
import { Helmet } from "react-helmet";

import PageBody from "../PageBody";

export default function NotFound() {
	return (
		<PageBody>
			<Helmet>
				<title>404: Not Found</title>
			</Helmet>

			<h1>404: Not Found</h1>
		</PageBody>
	);
}