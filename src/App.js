import React from "react";

import Link from "./Link";

const Header = () => (
	<header>
		<Link to="/">Try Parcel</Link>
		<Link to="/about">About</Link>
	</header>
);

export default function App() {
	return (
		<React.Fragment>
			<Header />
		</React.Fragment>
	);
}