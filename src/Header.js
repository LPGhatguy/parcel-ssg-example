import React from "react";

import Link from "./Link";

import style from "./Header.css";

export default function Header() {
	return (
		<header className={ style.Header }>
			<Link to="/">Try Parcel</Link>
			<Link to="/about">About</Link>
		</header>
	);
}