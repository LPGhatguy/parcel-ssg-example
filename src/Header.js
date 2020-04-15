import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Header.css";
import logo from "./logo.png";

export default function Header() {
	return (
		<header className={ style.Header }>
			<div className={ style.HeaderInner }>
				<img className={ style.Logo } src={ logo } />

				<nav className={ style.Nav }>
					<NavLink activeClassName={ style.ActiveNavLink } exact to="/">Home</NavLink>
					<NavLink activeClassName={ style.ActiveNavLink } to="/about">About</NavLink>
				</nav>
			</div>
		</header>
	);
}