import { Container,Col,Row } from "react-bootstrap"
import { useState } from "react"
import { charToBinary, binaryToChar } from "../../components/extras/binary-translate"

function BinaryTranslate() {
    const [outputText, setOuputText] = useState("")
    const [outputTextChar, setOuputTextChar] = useState("")

    function handleInputToBinaryOnChange(e) {
        setOuputText(charToBinary(e.target.value))
    }
    function handleInputToCharOnChange(e) {
        setOuputTextChar(binaryToChar(e.target.value))
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>test Binary translate</h1>
                    <Col>
                        <h2>input</h2>
                        <input type="text" onChange={handleInputToBinaryOnChange}/>
                    </Col>
                    <h2>output</h2>
                    <textarea typeof="text" readOnly value={outputText} style={{ width: '500px', height: '150px' }}></textarea>
                </Col>            
                <Col>
                    <h1>binary to char</h1>
                    <Col>
                        <h2>input</h2>
                        <input type="text" onChange={handleInputToCharOnChange}/>
                    </Col>
                    <h2>output</h2>
                    <textarea typeof="text" readOnly value={outputTextChar} style={{ width: '500px', height: '150px' }}></textarea>
                </Col>
            </Row>
        </Container>
    )
}

export default BinaryTranslate