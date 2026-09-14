import { CipherLayerCard } from "../../components/Cards";
import { detectBinary, caesarCipher, charToBinary, binaryToChar, hexaXor_encoder, hexToBinary, caesarDecipher, xor_encoder,} from "../../components/utils";
import { useState } from "react";

type CipherLayer = {
    id: number;
    type: "CAESAR" | "XOR";
    config: { shift: number } | { key: string };
};

function CipherStacking() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [layers, setLayers] = useState<CipherLayer[]>([
        { id: 1, type: "CAESAR", config: { shift: 3 } },
        { id: 2, type: "XOR", config: { key: "sol" } },
    ]);

    const handleAddLayer = () => {
        const newLayer: CipherLayer = {
            id: Date.now(),
            type: "CAESAR",
            config: { shift: 3 }
        }
        setLayers([...layers, newLayer])
    }

    const handleDeleteLayer = (id: number | string) => {
        setLayers(prevLayers => prevLayers.filter(layer => String(layer.id) !== String(id)))
    }

    const handleChangeType = (id: number | string, newType: string) => {
        setLayers(prevLayers => prevLayers.map(layer => {
            if (String(layer.id) === String(id)) {
                const type: CipherLayer["type"] = newType === "CAESAR" ? "CAESAR" : "XOR";
                const config: CipherLayer["config"] = type === "CAESAR"
                    ? { shift: 3 }
                    : { key: "" };
                return { ...layer, type, config };
            }
            return layer
        }))
    }

    const handleUpdateLayer = (id: number | string, newconfig: CipherLayer["config"]) => {
        setLayers(prevLayers => {
            return prevLayers.map(layer => {
                if (String(layer.id) === String(id)) return {...layer, config: newconfig}
                return layer
            })
        })
    }

    const handleStacking = () => {
        let text = inputText
        layers.map((layer) => {
            if (layer.type === "CAESAR" && "shift" in layer.config) {
                if (detectBinary(text)) {
                    text = String(caesarCipher(binaryToChar(text), layer.config.shift))
                } else {
                    text = String(caesarCipher(text, layer.config.shift))
                }
            }
            if (layer.type === "XOR" && "key" in layer.config) {
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
            if (layer.type === "CAESAR" && "shift" in layer.config) {
                if (detectBinary(text)) {
                    text = String(caesarDecipher(binaryToChar(text), layer.config.shift))
                } else {
                    text = String(caesarDecipher(text, layer.config.shift))
                }
            }
        
            if (layer.type === "XOR" && "key" in layer.config) {
                let ti = hexToBinary(text); 
                let tk = charToBinary(layer.config.key);
                let resultBinary = xor_encoder(ti, tk);
            
                text = binaryToChar(resultBinary);
            }
        })
        setOutputText(text)
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-6 mt-4 transition-colors duration-300">
            <h1 className="text-3xl font-extrabold mb-8 text-indigo-600 dark:text-indigo-400 tracking-wide">
                Cipher Stacking
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            List of layers
                        </h2>
                        <button
                            onClick={handleAddLayer}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-lg shadow-md transition-colors"
                        >
                            + Add layer
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {layers.map((layer) => (
                            <CipherLayerCard
                                key={layer.id}
                                layer={layer}
                                onChangeType={handleChangeType}
                                onUpdateConfig={(newConfig) =>
                                    handleUpdateLayer(layer.id, newConfig)
                                }
                                onDelete={handleDeleteLayer}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                                Input
                            </h3>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Initial
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Mensaje a procesar..."
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                />
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex flex-col sm:flex-row gap-4 border-t border-gray-200 dark:border-gray-700">
                            <button
                                onClick={handleStacking}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors"
                            >
                                Start Stacking
                            </button>
                            <button
                                onClick={handleUnstacking}
                                className="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow transition-colors"
                            >
                                Start Decipher
                            </button>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                        <div className="p-6 flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                Output
                            </h3>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Result
                                </label>
                                <textarea readOnly value={outputText} rows={4}
                                    placeholder="the final result will show here"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 resize-none cursor-not-allowed focus:outline-none font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CipherStacking;
