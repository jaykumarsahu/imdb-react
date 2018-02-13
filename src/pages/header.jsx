import React from 'react';
import { Nav, Navbar, NavItem, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './../logo.png';
import userInfo from './../services/user-info';

const style = {
  marginTop: -8,
  width: 80,
};

const Header = () => (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/"><Image src={logo} style={style} /> </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>

    <Navbar.Collapse>
      <RightNav />
    </Navbar.Collapse>
  </Navbar>
);

const NavLink = ({ name, path }) => (
  <NavItem componentClass={Link} href={path} to={path}>
    {name}
  </NavItem>
);

const AdminLinks = () => {
  if (userInfo() && userInfo().admin) {
    return (
      <NavLink name="Add New" path="/movies/new" />
    );
  }
  return null;
};

const RightNav = () => {
  const sessionToken = localStorage.getItem('sessionToken');
  if (sessionToken) {
    return (
      <Nav pullRight>
        <AdminLinks />
        <NavLink name="Sign Out" path="/signout" />
      </Nav>
    );
  }
  return (
    <Nav pullRight>
      <NavLink path="/signin" name="Sign in" />
      <NavLink path="/signup" name="Sign up" />
    </Nav>
  );
};

export default Header;
