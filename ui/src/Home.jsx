import React from 'react';
import {
  Navbar, Nav, NavItem, Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Routes from './Routes.jsx';

const NavBar = () => (
  <Navbar bsStyle="inverse" style={{ borderRadius: 0 }}>
    <Navbar.Header>
      <Navbar.Brand>My Company Inventory</Navbar.Brand>
    </Navbar.Header>

    <Nav>
      <LinkContainer exact to="/">
        <NavItem>Home</NavItem>
      </LinkContainer>
      <LinkContainer to="/products">
        <NavItem>Product List</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
);

/* Home component which shows the static Navbar and the Contents */
const Home = () => (
  <div>
    <NavBar />
    <Grid fluid>
      <Routes />
    </Grid>
  </div>
);

export default Home;
