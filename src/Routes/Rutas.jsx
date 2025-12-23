import { Routes, Route } from "react-router-dom"
import Home from "../views/Home"
import CaesarEncoder from "../views/ciphers/CaesarEncoder"
import XORLogic from "../views/ciphers/XORLogic"
import CipherStacking from "../views/ciphers/CipherStaking"
import BinaryTranslate from "../views/extras/BinaryTranslate"
import BinaryConversion from "../views/extras/BinaryConversion"

function Rutas() {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<Home />} />
                <Route path="/caesar_cipher"element={<CaesarEncoder />} />
                <Route path="/xor_logic"element={<XORLogic />} />
                <Route path="/cipher_stacking"element={<CipherStacking />} />
                <Route path="/binary_translate"element={<BinaryTranslate />} />
                <Route path="/binary_conversion"element={<BinaryConversion />} />
            </Route>            
        </Routes>
    )
}

export default Rutas