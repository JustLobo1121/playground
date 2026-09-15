import { Routes, Route } from 'react-router-dom';
import BinaryTranslate from "../views/extras/BinaryTranslate"
import BinaryConversion from "../views/extras/BinaryConversion"
import CaesarEncoder from "../views/ciphers/CaesarEncoder"
import XorLogic from "../views/ciphers/XorLogic"
import KeypairStarter from "../views/ciphers/KeypairStarter"
import KeypairEncoder from "../views/ciphers/KeypairEncoder"
import CipherStacking from "../views/ciphers/CipherStacking"

const Home = () => <div className="p-8 text-2xl font-bold">Home Page Content</div>;

function RoutesTs() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/binarytranslate" element={<BinaryTranslate />} />
            <Route path="/binaryconversion" element={<BinaryConversion />} />
            <Route path="/caesarencoder" element={<CaesarEncoder />} />
            <Route path="/xorlogic" element={<XorLogic />} />
            <Route path="/keypairfixed" element={<KeypairStarter />} />
            <Route path="/keypair" element={<KeypairEncoder />} />
            <Route path="/cipherstacking" element={<CipherStacking />} />
        </Routes>
    )
}

export default RoutesTs