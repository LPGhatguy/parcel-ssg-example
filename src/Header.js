import React from "react";
import { Link } from "react-router-dom";

import style from "./Header.css";
import logo from "./logo.png";

console.log(style);

export default function Header() {
	return (
		<header className={ style.Header }>
			<img src={ logo } />
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
		</header>
	);
}