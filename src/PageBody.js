import React from "react";

import style from "./PageBody.css";

export default function PageBody({ children }) {
	return (
		<div className={ style.PageBody }>
			<div className={ style.PageBodyInner }>
				{ children }
			</div>
		</div>
	);
}