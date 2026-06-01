import { CipherLayerCard } from "../../components/Cards"
import { detectBinary, caesarCipher, charToBinary, binaryToChar, hexaXor_encoder, hexToBinary, caesarDecipher, xor_encoder } from "../../components/utils"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { useState } from "react"

function CipherStacking() {
    const [inputText,setInputText] = useState("")
    const [outputText,setOutputText] = useState("")
    const [layers, setLayers] = useState([
        { id: 1, type: 'CAESAR', config: { shift: 3 } },
        { id: 2, type: 'XOR', config: { key: 'sol' } }
    ])

    const handleAddLayer = () => {
        const newLayer = {
            id: Date.now(),
            type: "CAESAR",
            config: { shift: 3 }
        }
        setLayers([...layers, newLayer])
    }

    const handleDeleteLayer = (id) => {
        setLayers(layers.filter(layer => layer.id !== id))
    }

    const handleChangeType = (id, newType) => {
        setLayers(prevLayers => prevLayers.map(layer => {
            if (layer.id === id) {
                const defaultConfig = newType === "CAESAR" ? { shift: 3 } : { key: "" };
                return { ...layer, type: newType, config: defaultConfig }
            }
            return layer
        }))
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

    const handleUnstacking = () => {
        let text = inputText
        const reverseLayers = [...layers].reverse()
        reverseLayers.forEach((layer) => {
            if (layer.type === "CAESAR") {
                if (detectBinary(text)) {
                    text = caesarDecipher(binaryToChar(text), layer.config.shift);
                } else {
                    text = caesarDecipher(text, layer.config.shift);
                }
            }
        
            if (layer.type === "XOR") {
                let ti = hexToBinary(text); 
                let tk = charToBinary(layer.config.key);
                let resultBinary = xor_encoder(ti, tk);
            
                text = binaryToChar(resultBinary);
            }
        })
        setOutputText(text)
    }

    return (
    <Container fluid className="mt-4">
        <h1>Test Cipher Stacking</h1>
        <Row>
            <Col md={6}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>List of layers</h2>
                    <Button variant="success" onClick={handleAddLayer}>+ Añadir Capa</Button>
                </div>

                <div>
                    {layers.map((layer) => (
                        <CipherLayerCard 
                            key={layer.id}
                            layer={layer}
                            onChangeType={handleChangeType}
                            onUpdateConfig={(newConfig) => handleUpdateLayer(layer.id, newConfig)}
                            onDelete={handleDeleteLayer}
                        />
                    ))}
                </div>
            </Col>
            
            <Col md={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>Input</Card.Title>
                        <label>Initial: <input type="text" onChange={(e) => setInputText(e.target.value)}/></label>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={handleStacking}>Start Stacking</Button>
                        <Button variant="warning" onClick={handleUnstacking}>Start Decipher</Button>
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