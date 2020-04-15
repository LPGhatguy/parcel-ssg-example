import React from "react";

import PageBody from "../PageBody";

import style from "./Home.css";

function Splash() {
	return (
		<div className={ style.Splash }>
			<div className={ style.SplashInner }>
				<h1 className={ style.SplashTitle }>
					Wow!
				</h1>

				<h2 className={ style.SplashSubtitle }>
					A small static site generator!
				</h2>
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<React.Fragment>
			<Splash />

			<PageBody>
				<div className={ style.SpinningThing }>Amazing!</div>
			</PageBody>
		</React.Fragment>
	);
}