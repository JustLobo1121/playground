import { CaesarCard,XorCard } from "../../components/Cards"
import { detectBinary,caesarCipher,charToBinary,binaryToChar,hexaXor_encoder } from "../../components/utils"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"

function CipherStacking() {
    const [inputText,setInputText] = useState("")
    const [outputText,setOutputText] = useState("")
    const [layers, setLayers] = useState([
        { id: 1, type: 'CAESAR', config: { shift: 3 } },
        { id: 2, type: 'XOR', config: { key: 'sol' } }
    ])
    const numCipher = Array.from({ length: 26 }, (v, i) => i + 1)

    const handleChangeLayers =(e) => {
        const newNum = parseInt(e.target.value)
        const actualNum = layers.length

        if (newNum > actualNum) {
            let layersleft = newNum - actualNum
            const newLayers = Array.from({length: layersleft}, () => ({
                id: Date.now(),
                type: "CAESAR",
                config: { shift: 3 }
            }))
            setLayers([...layers, ...newLayers])
        }
        if (actualNum > newNum) {
            setLayers(layers.slice(0,newNum))
        }
    }
    const handleUpdateLayer = (id, newconfig) => {
        setLayers(prevLayers => {
            return prevLayers.map(layer => {
                if (layer.id === id) return {...layer, config: newconfig}
                return layer
            })
        })
    }
    const handleStacking = () => {
        let text = inputText
        layers.map((layer) => {
            if (layer.type === "CAESAR") {
                if (detectBinary(text)) {
                    text = caesarCipher(binaryToChar(text), layer.config.shift)
                } else {
                    text = caesarCipher(text, layer.config.shift)
                }
            }
            if (layer.type === "XOR") {
                let ti
                if (detectBinary(text)) {
                    ti = text
                } else {
                    ti = charToBinary(text)
                }
                const tk = charToBinary(layer.config.key)
                text = hexaXor_encoder(ti, tk)
            }
        })
        setOutputText(text)
    }

    return (
    <Container fluid>
        <h1>test cipher stacking</h1>
        <Row>
            <Col>
                <label>Number of layers: 
                    <select onChange={handleChangeLayers} value={layers.length}>
					    <option key={0} value={0}>0</option>
                        {numCipher.map(op => {
                            return <option key={op} value={op}>{op}</option>
                        })}
                    </select>
                </label>
                <div>
                    <h1>list of layers</h1>
                    {layers.map((layer) => {
                        if (layer.type === "CAESAR") {
                            return <CaesarCard config={layer.config} change={(newConfig) => handleUpdateLayer(layer.id,newConfig)}/>
                        } else if (layer.type === "XOR") {
                            return <XorCard config={layer.config} change={(newConfig) => handleUpdateLayer(layer.id,newConfig)}/>
                        }
                    })}
                </div>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Input</Card.Title>
                        <label>Initial: <input type="text" onChange={(e) => setInputText(e.target.value)}/></label>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={handleStacking}>Start Stacking</Button>
                    </Card.Footer>
                </Card>
                <br/>
                <Card>
                    <Card.Body>
                        <Card.Title>Output</Card.Title>
                        <label>Output: <textarea readOnly value={outputText}/></label>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    )
}

export default CipherStacking