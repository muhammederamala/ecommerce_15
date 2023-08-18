import React from 'react'
import { Nav, Navbar, Row, Container } from 'react-bootstrap'




function Header() {
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                    <Navbar.Brand>ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        <Nav.Link>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    </header>
  )
}

export default Header
