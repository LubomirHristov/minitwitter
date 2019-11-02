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
                    <Button className="navbar-btn" style={{paddingTop: 0, paddingBottom: 0}}>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <img src="https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png" style={{width: '2.5em'}}/>
                            <Nav.Link href={`/user/${props.username}`} style={{color: 'white', marginLeft:' 0.3em', fontSize: '1.05em'}}>{props.username}</Nav.Link>
                        </div>
                    </Button>
                </Nav>
                <Nav>
                    <Button className="navbar-btn">
                        <Nav.Link href="/app" style={{color: 'white'}}>Home</Nav.Link>
                    </Button>
                </Nav>
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