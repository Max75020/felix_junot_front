import React from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function UserDropdown({ user, userInitials, handleLogout }) {
    // eslint-disable-next-line no-unused-vars
    const navigate = useNavigate();

    return (
        <Dropdown align="end">
            <Dropdown.Toggle
                variant="none"
                id="dropdown-basic"
                className="px-2"
                bsPrefix="custom-dropdown-toggle"
                style={{
                    backgroundColor: "#000000",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "bold",
                    border: "none",
                }}
            >
                {userInitials}
            </Dropdown.Toggle>

            <Dropdown.Menu
                align="end"
                style={{
                    position: "absolute",
                    top: "40px",
                    right: "0px",
                }}
            >
                <Dropdown.Item href="/profil">Profil</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default UserDropdown;
