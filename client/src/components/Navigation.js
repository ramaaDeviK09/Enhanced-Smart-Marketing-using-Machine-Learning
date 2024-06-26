import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';

export default function Navigation() {
  const diapatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogout = () => {
    diapatch(logout())
  }
  return (
    <div>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!user && 
            <LinkContainer to='/login'>
              <Nav.Link>LogIn</Nav.Link>
            </LinkContainer>
            }           
            <LinkContainer to='/recommendation'>
              <Nav.Link>Recommendations</Nav.Link>
            </LinkContainer>
            { user && !user.isAdmin && (
              <LinkContainer to='/cart'>
              <Nav.Link>
              <i className="fas fa-shopping-cart"></i>
                                    {user?.cart.count > 0 && (
                                        <span className="badge badge-warning" id="cartcount">
                                            {user.cart.count}
                                        </span>
                                    )}
              </Nav.Link>
            </LinkContainer>
            )}
            {user && (
                <NavDropdown title={`${user.email}`} id="basic-nav-dropdown">
                 {user.isAdmin && (
                    <>
                      <LinkContainer to="/admin">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/new-product">
                        <NavDropdown.Item>Create Product</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  {!user.isAdmin && (
                    <>
                      <LinkContainer to="/cart">
                        <NavDropdown.Item>Cart</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orders">
                        <NavDropdown.Item>My orders</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}

                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button variant="danger" onClick={handleLogout}>logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}
