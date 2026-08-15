import { useState } from "react";
import { rsaEncrypt, rsaDecrypt } from "../../components/utils";
import { Form, Button, Card, Row, Col, Container } from "react-bootstrap";

function KeypairStarter() {
      const [inputText, setInputText] = useState("");
      const [encryptedData, setEncryptedData] = useState([]);
      const [decryptedText, setDecryptedText] = useState("");

      const [keys, setKeys] = useState({ e: 5, d: 173, n: 323 });

      const handleEncrypt = () => {
            if (!inputText) return;
            const cipherArray = rsaEncrypt(inputText, keys.e, keys.n);
            setEncryptedData(cipherArray);
            setDecryptedText("");
      };

      const handleDecrypt = () => {
          if (encryptedData.length === 0) return;
          const plainText = rsaDecrypt(encryptedData, keys.d, keys.n);
          setDecryptedText(plainText);
      };
      return (
        <Container className="mt-4">
            <Card>
                <Card.Header className="bg-dark text-white">
                    <strong>RSA Encryption</strong>
                </Card.Header>
                <Card.Body>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                            <Form.Label>Mensaje Original (M)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresa texto ASCII..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            </Form.Group>
                            <Button variant="primary" className="mt-2" onClick={handleEncrypt}>
                                Cifrar con Clave Pública
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Criptograma (C)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    readOnly
                                    value={encryptedData.length > 0 ? `[${encryptedData.join(", ")}]` : ""}
                                    placeholder="Array de enteros cifrados"
                                />
                            </Form.Group>
                            <Button 
                                variant="warning" 
                                className="mt-2" 
                                onClick={handleDecrypt}
                                disabled={encryptedData.length === 0}
                            >
                                Descifrar con Clave Privada
                            </Button>
                        </Col>
                    </Row>
                    {decryptedText && (
                    <Row>
                        <Col>
                            <div className="alert alert-success mt-3">
                                <strong>Resultado Descifrado: </strong> {decryptedText}
                            </div>
                        </Col>
                    </Row>
                    )}
                </Card.Body>
                <Card.Footer className="text-muted text-center">
                    <small>
                        Llave Pública: <strong>({keys.e}, {keys.n})</strong> | 
                        Llave Privada: <strong>({keys.d}, {keys.n})</strong>
                    </small>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default KeypairStarter;