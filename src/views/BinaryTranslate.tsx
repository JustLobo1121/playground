import { useState } from 'react'
import { charToBinary, binaryToChar } from '../components/utils'

function BinaryTranslate() {
    const [outputText, setOutputText] = useState("")
    const [outputTextChar, setOutputTextChar] = useState("");

    function handleInputToBinaryOnChange(e: any) {
        setOutputText(charToBinary(e.target.value));
    }

    function handleInputToCharOnChange(e: any) {
        setOutputTextChar(binaryToChar(e.target.value));
    }

    return (
        <div className="p-8 flex flex-col md:flex-row gap-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-6">
                <h1 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Binary translate char to binary
                </h1>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">Input</h2>
                    <input type="text" onChange={handleInputToBinaryOnChange}
                        placeholder="Ingresa los caracteres aquí..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">Output</h2>
                    <textarea readOnly value={outputText} 
                        placeholder="El resultado binario aparecerá aquí..."
                        className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 resize-none cursor-not-allowed focus:outline-none font-mono"
                    ></textarea>
                </div>
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col gap-6">
                <h1 className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                    Translate binary to char
                </h1>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">Input</h2>
                    <input type="text" onChange={handleInputToCharOnChange}
                        placeholder="Ingresa los caracteres aquí..."
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">Output</h2>
                    <textarea readOnly value={outputTextChar} 
                        placeholder="El resultado binario aparecerá aquí..."
                        className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 resize-none cursor-not-allowed focus:outline-none font-mono"
                    ></textarea>
                </div>
            </div>
        </div>
    )
}

export default BinaryTranslate