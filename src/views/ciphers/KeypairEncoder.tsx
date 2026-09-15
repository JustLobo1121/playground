import { useState } from "react";
import { gcd, mdc, rsaDecrypt, rsaEncrypt } from "../../components/utils";

function KeypairEncoder() {
    const [primes, setPrimes] = useState("");
    const [keyN, setKeyN] = useState<number>();
    const [keyE, setKeyE] = useState<number>();
    const [isValidatedE, setValidated] = useState(false)
    const [validatedE, setValidatedE] = useState<number>();
    const [keyD, setKeyD] = useState<number>();
    const [eulerFun, setEulerFun] = useState(0);
    const [inputText, setInputText] = useState("");
    const [encryptedData, setEncryptedData] = useState<number[]>([]);
    const [cipherText, setCipherText] = useState("");
    const [decryptedText, setDecryptedText] = useState("");

    const handleGenerateModule = () => {
        let rawPrimes = primes
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v !== "" && !isNaN(Number(v)))
            .map(Number);
        if (rawPrimes.length > 2 || rawPrimes.length == 1) return;
        setKeyN(rawPrimes[0] * rawPrimes[1])
        setEulerFun((rawPrimes[0] - 1)*(rawPrimes[1] - 1));
    }

    const handleValidateE = () => {
        if (keyE !== undefined) {
            const isValidExponent = keyE > 1 && keyE < eulerFun && mdc(keyE, eulerFun) === 1;
            setValidatedE(keyE);
            if (!isValidExponent) {
                setValidated(false)
                setKeyD(undefined);
                return;
            }
            const resultGCD = gcd(keyE, eulerFun)
            if (resultGCD.x > 0) setKeyD(resultGCD.x);
            else {setKeyD(resultGCD.x + eulerFun)}
            setValidated(true)
        }
    };

    const handleEncrypt = () => {
        if (!inputText || keyN === undefined || keyE === undefined || !isValidatedE) return;
        const cipherArray = rsaEncrypt(inputText, keyE, keyN);
        setEncryptedData(cipherArray);
        setCipherText(cipherArray.join(", "));
        setDecryptedText("");
    };

    const handleCipherChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const rawText = e.target.value;
        setCipherText(rawText);
        
        const numbers = rawText
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "" && !isNaN(Number(value)))
            .map(Number);
        
        setEncryptedData(numbers);
    };

    const handleDecrypt = () => {
        if (encryptedData.length === 0 || keyD === undefined || keyN === undefined) return;
        const plainText = rsaDecrypt(encryptedData, keyD, keyN);
        setDecryptedText(plainText);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-6 mt-4">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <div className="bg-gray-900 dark:bg-black text-white px-6 py-4">
                    <strong className="text-lg tracking-wide font-extrabold">
                        RSA Encryption
                    </strong>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Two prime number
                                </label>
                                <input
                                    type="text"
                                    placeholder="prime number, prime number"
                                    value={primes}
                                    onChange={(e) => setPrimes(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <button
                                onClick={handleGenerateModule}
                                className="mt-2 w-full md:w-max px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
                            >
                                Generate module
                            </button>
                            {keyN && (
                                <div className="w-full p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 flex items-center shadow-sm">
                                    <span>
                                        <strong className="mr-2">Result: {keyN}</strong> 
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Public exponent
                                </label>
                                <input
                                    type="text"
                                    placeholder="between 1 and the module of two primes"
                                    value={keyE}
                                    onChange={(e) => setKeyE(Number(e.target.value))}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <button
                                onClick={handleValidateE}
                                className="mt-2 w-full md:w-max px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
                            >
                                Validate exponent
                            </button>
                            {validatedE !== undefined && (
                                <div className={`w-full p-4 rounded-lg border flex items-center shadow-sm ${
                                    isValidatedE
                                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-400"
                                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-400"
                                }`}>
                                    <span>
                                        <strong className="mr-2">
                                            {isValidatedE ? "Validated" : "Not validated"}: {validatedE}
                                        </strong>
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Original message
                                </label>
                                <input
                                    type="text"
                                    placeholder="input text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                            <button
                                onClick={handleEncrypt}
                                className="mt-2 w-full md:w-max px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
                            >
                                encrypt with public key
                            </button>
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                                    Encrypted message
                                </label>
                                <textarea
                                    rows={2}
                                    value={cipherText}
                                    onChange={handleCipherChange}
                                    placeholder="Array of integer encrypted"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 resize-none  focus:outline-none focus:ring-amber-500 font-mono"
                                />
                            </div>
                            <button
                                onClick={handleDecrypt}
                                disabled={encryptedData.length === 0}
                                className="mt-2 w-full md:w-max px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors shadow-md"
                            >
                                decipher with private key
                            </button>
                        </div>
                    </div>
                    {decryptedText && (
                        <div className="w-full p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-400 flex items-center shadow-sm">
                            <span>
                                <strong className="mr-2">Resultado: {decryptedText}</strong> 
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default KeypairEncoder;
