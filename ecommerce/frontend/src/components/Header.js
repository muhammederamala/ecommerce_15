import React from 'react'
import { Nav, Navbar, Row, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'



//components
import { logout } from '../actions/userActions'


function Header() {

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    // to logout a user, 'logout is an action inside user actions.
    const dispatch = useDispatch()
    const logoutHandler = () =>{
        dispatch(logout())
    }

  return (
    <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
            <Container>
                    <Navbar.Brand as="a" href='/'>ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as="a" href="/cart" ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                        
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <NavDropdown.Item as="a" href='profile/'>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                            </NavDropdown>
                        ):(
                            <Nav.Link as="a" href='/login' >Login</Nav.Link>
                        )}
                        
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>    
        </Navbar>
    </header>
  )
}

export default Header
