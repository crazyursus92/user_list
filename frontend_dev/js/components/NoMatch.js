import React from "react";

const NoMatch = ({ location }) => (
	<div className="text-center">
		<h2>404</h2>
		<h3>No match for <code>{location.pathname}</code></h3>
	</div>
);

export default NoMatch;
