import React from "react";
import { Button, Col } from "react-bootstrap";

const AccountNavButton = ({ icon: IconComponent, text, size, ...props }) => {
	return (
		<Col xs={8} md={4} lg={3} className="text-center">
			<Button variant="outline-dark" className="account-nav-btn d-flex flex-column align-items-center gap-3" {...props}>
				<div className="icon-box">
					<IconComponent size={size} />
				</div>
				<p className="text-uppercase m-0">{text}</p>
			</Button>
		</Col>
	);
};

export default AccountNavButton;
