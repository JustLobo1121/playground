import Nav from "react-bootstrap/Nav"
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from "react-router-dom"
import { Container } from "react-bootstrap";

function NavBar() {
  	return (
    <Container fluid>
		<Nav sticky="top" variant="underline" defaultActiveKey="/">
			<Nav.Item eventkey={1} href="/">
				<Nav.Link as={Link}to={'/'}>Home</Nav.Link>
			</Nav.Item>
			<Dropdown>
				<Dropdown.Toggle variant="secondary">
					Ciphers
				</Dropdown.Toggle>
				<Dropdown.Menu>
        			<Dropdown.Item eventkey={1} href="/caesar_cipher">Caesar</Dropdown.Item>
        			<Dropdown.Item eventkey={1} href="/xor_logic">XOR logic</Dropdown.Item>
        			<Dropdown.Item eventkey={1} href="/cipher_stacking">Cipher Stacking</Dropdown.Item>
      			</Dropdown.Menu>
			</Dropdown>
			<Dropdown>
				<Dropdown.Toggle variant="secondary">
					Binary
				</Dropdown.Toggle>
				<Dropdown.Menu>
					<Dropdown.Item eventKey={1} href="/binary_conversion">Conversion number</Dropdown.Item>
        			<Dropdown.Item eventkey={1} href="/binary_translate">Translate character</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Nav>
	</Container>
  	);
}

export default NavBar;
