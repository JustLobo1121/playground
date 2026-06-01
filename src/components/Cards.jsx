import { Card, Button, Form } from "react-bootstrap"

function CaesarConfig({ config, change}) {
    const options = Array.from({ length: 26 }, (v,i) => i+1)
    return (
        <>
            <Form.Label>Nivel de Rotación:</Form.Label>
            <Form.Select value={config.shift} onChange={(e) => change({ shift: parseInt(e.target.value)})}>
                {options.map(option => (
					<option key={option} value={option}>shift +{option}</option>
				))}
            </Form.Select>
        </>
    )
}
function XorConfig({ config, change }) {
    return (
        <>
            <Form.Label>Selected Key</Form.Label>
            <Form.Control type="text" placeholder="any key" value={config.key} onChange={(e) => change({ key: e.target.value})} />
        </>
    )
}

export function CipherLayerCard({ layer, onUpdateConfig, onChangeType, onDelete }) {
    return (
    <Card className="mb-3">
        <Card.Header className="d-flex justify-content-between align-items-center">
            <Form.Select 
                value={layer.type} 
                onChange={(e) => onChangeType(layer.id, e.target.value)}
                style={{ width: 'auto', fontWeight: 'bold' }}
            >
                <option value="CAESAR">Caesar Encoder</option>
                <option value="XOR">XOR Logic Gate</option>
            </Form.Select>
            <Button variant="danger" size="sm" onClick={() => onDelete(layer.id)}>
                Eliminar
            </Button>
        </Card.Header>

        <Card.Body>
            {layer.type === 'CAESAR' && (
                <CaesarConfig config={layer.config} change={onUpdateConfig} />
            )}
            {layer.type === 'XOR' && (
                <XorConfig config={layer.config} change={onUpdateConfig} />
            )}
        </Card.Body>
    </Card>
    )
}