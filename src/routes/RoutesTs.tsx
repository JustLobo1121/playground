import { Routes, Route } from 'react-router-dom';
import BinaryTranslate from "../views/BinaryTranslate"

const Home = () => <div className="p-8 text-2xl font-bold">Home Page Content</div>;
const Services = () => <div className="p-8 text-2xl font-bold">Services Page Content</div>;
const Contact = () => <div className="p-8 text-2xl font-bold">Contact Page Content</div>;

function RoutesTs() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/binarytranslate" element={<BinaryTranslate />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    )
}

export default RoutesTs