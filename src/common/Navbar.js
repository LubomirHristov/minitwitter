import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const CustomNavbar = (props) => {
    return(
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>
                MiniTwitter
            </Navbar.Brand>
            <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row'}}>
                <Nav>
                    <Button className="navbar-btn">
                        <Nav.Link href="/" style={{color: 'white'}}>Logout</Nav.Link>
                    </Button>
                </Nav>
            </div>
        </Navbar>
    )
}

export default CustomNavbar;