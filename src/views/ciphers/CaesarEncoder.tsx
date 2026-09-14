import { useState } from "react"
import { caesarCipher, caesarDecipher } from "../../components/utils"

function CaesarEncoder() {
    const [validateC, setValidateC] = useState(false)
	const [validateD, setValidateD] = useState(false)
	const [errorC, setErrorC] = useState<string | null>(null)
	const [errorD, setErrorD] = useState<string | null>(null)
	const [selectNumC, setSelectNumC] = useState(0)
	const [textInputC, setTextInputC] = useState("")
	const [textOutputC, setTextOutputC] = useState("")

	const [selectNumD, setSelectNumD] = useState(0)
	const [textInputD, setTextInputD] = useState("")
	const [textOutputD, setTextOutputD] = useState("")

    const options = Array.from({ length: 26 }, (_, i) => i + 1)

	const Encoder = () => {
		let output = caesarCipher(textInputC, selectNumC)
		setTextOutputC(String(output))
	}

	const Decoder = () => {
		let output = caesarDecipher(textInputD,selectNumD)
		setTextOutputD(String(output))
	}

	const handleSelectChangeC = (e: any) => {
        const v = Number(e.target.value)
		setSelectNumC(v)

        if (v !== 0) setErrorC(null)
	}

	const handleSelectChangeD = (e: any) => {
        const v = Number(e.target.value)
		setSelectNumD(v)

        if (v !== 0) setErrorD(null)
	}

	const handleSumitC = (e: any) => {
		e.preventDefault()

        if (selectNumC === 0) {
			setErrorC("select other number to do the replacement")
			return
		}
		if (textInputC === "") {
			return
		}
		setErrorC(null)
		setValidateC(true)
		Encoder()
	}
	const handleSumitD = (e: any) => {
		e.preventDefault()
		
        if (selectNumD === 0) {
			setErrorD("select other number to do the replacement")
			return
		}
		if (textInputD === "") {
			return
		}
		setErrorD(null)
		setValidateD(true)
		Decoder()
	}

    return (
        <div className="p-8 flex flex-col md:flex-row gap-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSumitC} noValidate>
                        <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Caesar Cipher
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Input Text
                                </label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="Enter text" 
                                    onChange={(e) => setTextInputC(e.target.value)} 
                                    className={`w-full px-4 py-2 rounded-lg border ${validateC && textInputC === "" ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all`}
                                />
                                {validateC && textInputC === "" && (
                                    <span className="text-red-500 text-xs font-semibold">insert any text</span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Replacement
                                </label>
                                <select 
                                    defaultValue="" 
                                    onChange={handleSelectChangeC} 
                                    className={`w-full px-4 py-2 rounded-lg border ${errorC ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'} bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all`}
                                >
                                    <option value="">0</option>
                                    {options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errorC && (
                                    <span className="text-red-500 text-xs font-semibold">{errorC}</span>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md">
                            Submit
                        </button>
                        <div className="mt-6 flex flex-col gap-2">
                            <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                Output Text
                            </label>
                            <textarea 
                                rows={3} 
                                value={textOutputC} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 resize-none cursor-not-allowed focus:outline-none font-mono"
                            />
                        </div>
                    </form>
                </div>
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSumitD} noValidate>
                        <h2 className="text-2xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                            Caesar Decipher
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 mb-6">
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Input Text
                                </label>
                                <input 
                                    required 
                                    type="text" 
                                    placeholder="Enter text" 
                                    onChange={(e) => setTextInputD(e.target.value)} 
                                    className={`w-full px-4 py-2 rounded-lg border ${validateD && textInputD === "" ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'} bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all`}
                                />
                                {validateD && textInputD === "" && (
                                    <span className="text-red-500 text-xs font-semibold">insert any text</span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Replacement
                                </label>
                                <select 
                                    defaultValue="" 
                                    onChange={handleSelectChangeD} 
                                    className={`w-full px-4 py-2 rounded-lg border ${errorD ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-emerald-500'} bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 transition-all`}
                                >
                                    <option value="">0</option>
                                    {options.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {errorD && (
                                    <span className="text-red-500 text-xs font-semibold">{errorD}</span>
                                )}
                            </div>
                        </div>
                        <button type="submit" className="w-full md:w-auto px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-md">
                            Submit
                        </button>
                        
                        <div className="mt-6 flex flex-col gap-2">
                            <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                Output Text
                            </label>
                            <textarea 
                                rows={3} 
                                value={textOutputD} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-300 resize-none cursor-not-allowed focus:outline-none font-mono"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CaesarEncoder;