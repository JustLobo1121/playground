import { useState } from 'react';
import { Container,Button,Col,Form,Row } from "react-bootstrap"
import { caesarCipher,caesarDecipher } from '../../components/utils'

function CaesarEncoder() {
    const [validateC, setValidateC] = useState(false)
	const [validateD, setValidateD] = useState(false)
	const [errorC, setErrorC] = useState(null)
	const [errorD, setErrorD] = useState(null)
	const [selectNumC, setSelectNumC] = useState("")
	const [textInputC, setTextInputC] = useState("")
	const [textOutputC, setTextOutputC] = useState("")

	const [selectNumD, setSelectNumD] = useState("")
	const [textInputD, setTextInputD] = useState("")
	const [textOutputD, setTextOutputD] = useState("")

	const options = Array.from({ length: 26 }, (v, i) => i + 1)

	const Encoder = () => {
		let output = caesarCipher(textInputC, selectNumC)
		setTextOutputC(output)
	}

	const Decoder = () => {
		let output = caesarDecipher(textInputD,selectNumD)
		setTextOutputD(output)
	}

	const handleSelectChangeC = (e) => {
		const v = e.target.value
		setSelectNumC(v)

		if (v !== "") setErrorC(null)
	}

	const handleSelectChangeD = (e) => {
		const v = e.target.value
		setSelectNumD(v)

		if (v !== "") setErrorD(null)
	}

	const handleSumitC = (e) => {
		e.preventDefault()

		if (selectNumC === "") {
			setErrorC("select other number to do the replacement")
			return
		}
		if (textInputC === "") {
			return
		}
		setErrorC(null)
		setValidateC(true)
		Encoder()
	}
	const handleSumitD = (e) => {
		e.preventDefault()
		
		if (selectNumD === "") {
			setErrorD("select other number to do the replacement")
			return
		}
		if (textInputD === "") {
			return
		}
		setErrorD(null)
		setValidateD(true)
		Decoder()
	}
    return (
    <Container fluid>
        <h1>caesar cipher</h1>
        <Container>
			<Row>
				<Col>
					<Form onSubmit={handleSumitC} validated={validateC}>
						<h1>Cipher</h1>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridIputText">
								<Form.Label>Input Text</Form.Label>
								<Form.Control required type="text" placeholder="Enter text" onChange={(e) => { setTextInputC(e.target.value) }} />
								<Form.Control.Feedback type="invalid">insert any text</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridReplacement">
								<Form.Label>Replacement</Form.Label>
								<Form.Select defaultValue="0" onChange={handleSelectChangeC} isInvalid={!!errorC}>
									<option key={0} value={""}>0</option>
									{options.map(option => (
										<option key={option} value={option}>{option}</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errorC}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Button variant="primary" type="submit">
							Submit
						</Button>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Output Text</Form.Label>
							<Form.Control as="textarea" rows={3} value={textOutputC} readOnly />
						</Form.Group>
					</Form>
				</Col>
				<Col>
					<Form onSubmit={handleSumitD} validated={validateD}>
						<h1>Decipher</h1>
						<Row className="mb-3">
							<Form.Group as={Col} controlId="formGridIputText">
								<Form.Label>Input Text</Form.Label>
								<Form.Control required type="text" placeholder="Enter text" onChange={(e) => { setTextInputD(e.target.value) }} />
								<Form.Control.Feedback type="invalid">insert any text</Form.Control.Feedback>
							</Form.Group>
							<Form.Group as={Col} controlId="formGridReplacement">
								<Form.Label>Replacement</Form.Label>
								<Form.Select defaultValue="0" onChange={handleSelectChangeD} isInvalid={!!errorD}>
									<option key={0} value={""}>0</option>
									{options.map(option => (
										<option key={option} value={option}>{option}</option>
									))}
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errorD}
								</Form.Control.Feedback>
							</Form.Group>
						</Row>
						<Button variant="primary" type="submit">
							Submit
						</Button>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Output Text</Form.Label>
							<Form.Control as="textarea" rows={3} value={textOutputD} readOnly />
						</Form.Group>
					</Form>
				</Col>
			</Row>
		</Container>
    </Container>
    )
}

export default CaesarEncoder