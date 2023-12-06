import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import CartWidget from '../CartWidget/CartWidget';
/* Agregado para navegar con Link y NavLink*/
import { Link, NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand  as={Link} to={`/ItemListContainer`} className='titulo'>Tartas y Tortas</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/ItemListContainer"}>Inicio</Nav.Link>
            <Nav.Link as={Link} to={"/Mensaje"}>Recetas</Nav.Link>
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/ItemListContainer/${"Tartas"}`}>Tartas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/ItemListContainer/${"Tortas"}`}>
                Tortas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/ItemListContainer/${"Postres"}`}>Postres</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={"/Mensaje"}>
                Area Clientes
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <CartWidget/>
    </Navbar>
  );
}

export default NavBar;