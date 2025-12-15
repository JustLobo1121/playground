import Container from "react-bootstrap/Container";
import Rutas from "./Routes/Rutas"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./modules/NavBar";


function App() {

  	return (
		<Container fluid>
			<BrowserRouter>
				<NavBar />
				<Rutas />
			</BrowserRouter>
		</Container>
  	);
}

export default App
