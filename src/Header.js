import React from "react";
import { Link, NavLink } from "react-router-dom";

import style from "./Header.css";
import logo from "./logo.png";

export default function Header() {
	return (
		<header className={ style.Header }>
			<div className={ style.HeaderInner }>
				<Link to="/">
					<img className={ style.Logo } src={ logo } />
				</Link>

				<nav className={ style.Nav }>
					<NavLink activeClassName={ style.ActiveNavLink } exact to="/">Home</NavLink>
					<NavLink activeClassName={ style.ActiveNavLink } to="/about/">About</NavLink>
					<NavLink activeClassName={ style.ActiveNavLink } to="/redirect-home/">Redirect Home</NavLink>
				</nav>
			</div>
		</header>
	);
}