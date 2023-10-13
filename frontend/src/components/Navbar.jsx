import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbars() {
  return (
    <div style={{ position: 'sticky', top: '0', zIndex: '100' }}>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Analystt.ai</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" data-bs-toggle="collapse" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* Your menu items here */}
            </Nav>
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link eventKey={2} href="#home">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbars;
