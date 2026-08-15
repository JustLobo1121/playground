import { gcd } from "../../components/utils";
import { Container,Form,Row,Col, Button } from "react-bootstrap"
import { useState } from 'react'

function KeypairEncoder() {
    const [textInputC, setTextInputC] = useState("")
    const [textInputD, setTextInputD] = useState("")
    const [textInputKeyC, setTextInputKeyC] = useState("")
    const [textInputKeyD, setTextInputKeyD] = useState("")
    const [textOutputC, setTextOutputC] = useState("")
    const [textOutputD, setTextOutputD] = useState("")
    const [validateC, setValidateC] = useState(false)
    const [validateD, setValidateD] = useState(false)
    
    function handleSumitC(e) {
        e.preventDefault()
        if (textInputC === "") return
        if (textInputKeyC === "") return
        setValidateC(true)
        handleLogicC()
    }
    function handleSumitD(e) {
        e.preventDefault()
        if (textInputD === "") return
        if (textInputKeyD === "") return
        setValidateD(true)
        handleLogicD()
    }
    function handleLogicC() {

    }
    function handleLogicD() {
    }

    return (
        <Container fluid>
            <h1>Test Key-pair Encryption</h1>
            <Container>
		    	<Row>
                <Col>
                    <Form onSubmit={handleSumitC} validated={validateC}>
                        <h1>keypair cipher</h1>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridIputText">
                                <Form.Label>Input Text</Form.Label>
                                <Form.Control required type="text" placeholder="Enter text" onChange={(e) => { setTextInputC(e.target.value) }} />
                                <Form.Control.Feedback type="invalid">insert any text</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridIputTextKey">
                                <Form.Label>Input Key</Form.Label>
                                <Form.Control required type="text" placeholder="Enter text" onChange={(e) => { setTextInputKeyC(e.target.value) }} />
                                <Form.Control.Feedback type="invalid">insert any Key or Text</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">Submit</Button>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Output Text</Form.Label>
                            <Form.Control as="textarea" rows={3} value={textOutputC} readOnly />
                        </Form.Group>
                    </Form>
                </Col>
                <Col>
                    <Form onSubmit={handleSumitD} validated={validateD}>
                        <h1>keypair decipher</h1>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridIputText">
                                <Form.Label>Input Text</Form.Label>
                                <Form.Control required type="text" placeholder="Enter text" onChange={(e) => { setTextInputD(e.target.value) }} />
                                <Form.Control.Feedback type="invalid">insert any text</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridIputTextKey">
                                <Form.Label>Input Key</Form.Label>
                                <Form.Control required type="text" placeholder="Enter text" onChange={(e) => { setTextInputKeyD(e.target.value) }} />
                                <Form.Control.Feedback type="invalid">insert any Key or Text</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">Submit</Button>
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

export default KeypairEncoder;