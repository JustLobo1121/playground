import { Card } from "react-bootstrap"

export function CaesarCard({ config, change }) {
	const options = Array.from({ length: 26 }, (v, i) => i + 1);
    return (
    <Card>
        <Card.Body>
            <Card.Title>Caesar encoder</Card.Title>
            <select value={config.shift} onChange={(e) => change({ shift: parseInt(e.target.value)})}>
                {options.map(option => (
					<option key={option} value={option}>shift +{option}</option>
				))}
            </select>
        </Card.Body>
    </Card>
    )
}

export function XorCard({ config, change }) {
    return (
    <Card>
        <Card.Body>
            <Card.Title>XOR logic gate encoder</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Selected Key</Card.Subtitle>
            <input placeholder="any key" value={config.key} onChange={(e) => change({ keyword: e.target.value})}></input>
        </Card.Body>
    </Card>
    )
}