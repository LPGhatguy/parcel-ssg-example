import React, { useContext } from "react";

export const LinkCallbackContext = React.createContext(null);

export default function Link({ to, children }) {
	const linkCallback = useContext(LinkCallbackContext);

	if (linkCallback != null) {
		linkCallback(to);
	}

	return (
		<a href={ to }>{ children }</a>
	);
}