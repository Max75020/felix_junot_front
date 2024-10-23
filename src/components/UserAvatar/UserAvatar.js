// src/components/UserAvatar.js
import React from "react";
import PropTypes from "prop-types";

const UserAvatar = ({ initials }) => {
	return (
		<div className="bg-black text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "100px", height: "100px", fontSize: "36px", fontWeight: "bold", border: "none" }}>
			{initials}
		</div>
	);
};

UserAvatar.propTypes = {
	initials: PropTypes.string.isRequired,
};

export default UserAvatar;
