import { useState } from "react"
import { Container,Col,Row } from "react-bootstrap"
import { numToBinary } from "../../components/utils"

function BinaryConversion() {
    const [Test128,setTest128] = useState(0)
    const [Test64,setTest64] = useState(0)
    const [Test32,setTest32] = useState(0)
    const [Test16,setTest16] = useState(0)
    const [Test8,setTest8] = useState(0)
    const [Test4,setTest4] = useState(0)
    const [Test2,setTest2] = useState(0)
    const [Test1,setTest1] = useState(0)
    const [inputC,setInputC] = useState(0)
    let aux
    function testsum(num) {
        setTest128(0)
        setTest64(0)
        setTest32(0)
        setTest16(0)
        setTest8(0)
        setTest4(0)
        setTest2(0)
        setTest1(0)
        aux = num
        if (aux >= 128) {setTest128(1); aux -= 128}
        if (aux >= 64) {setTest64(1); aux -= 64}
        if (aux >= 32) {setTest32(1); aux -= 32}
        if (aux >= 16) {setTest16(1); aux -= 16}
        if (aux >= 8) {setTest8(1); aux -= 8}
        if (aux >= 4) {setTest4(1); aux -= 4}
        if (aux >= 2) {setTest2(1); aux -= 2}
        if (aux >= 1) {setTest1(1); aux -= 1}
    }
    const handleChangeTest = (e) => {
        testsum(e.target.value)
    }
    const handleChangeConversion = (e) => {
        setInputC(numToBinary(parseInt(e.target.value)))
    }

    return (
        <Container fluid>
            <h1>basic Binary Conversion to 2^7</h1>
            <Row>
                <Col><h1>128</h1><h2>{Test128}</h2></Col>
                <Col><h1>64</h1><h2>{Test64}</h2></Col>
                <Col><h1>32</h1><h2>{Test32}</h2></Col>
                <Col><h1>16</h1><h2>{Test16}</h2></Col>
                <Col><h1>8</h1><h2>{Test8}</h2></Col>
                <Col><h1>4</h1><h2>{Test4}</h2></Col>
                <Col><h1>2</h1><h2>{Test2}</h2></Col>
                <Col><h1>1</h1><h2>{Test1}</h2></Col>
            </Row>
            <Row>
                <Col>
                    <h1>Input</h1><input onChange={handleChangeTest} value={aux} type="number"/>
                </Col>
            </Row>
            <h1>------------------</h1>
            <Row>
                <h1>Binary conversion to 2^n</h1>
                <Col>
                    <h1>Input</h1><input onChange={handleChangeConversion} type="number"/>
                </Col>
            </Row>
            <Row>
                <h1>Output</h1>
                <Col>
                    <h2>{inputC}</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default BinaryConversion