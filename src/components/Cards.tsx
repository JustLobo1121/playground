import { gcd } from "./utils"
import { useState } from "react"

interface caesarConfigProp {
    config: { shift: number };
    change: (config: { shift: number }) => void;
}

interface xorConfigProp {
    config: { key: string };
    change: (config: { key: string }) => void;
}

interface keypairConfigProp {
    config: { e: number, d: number, n: number };
    change: (config : { e: number, d: number, n: number }) => void;
}

interface Layer {
    id: string | number;
    type: 'XOR' | 'CAESAR' | 'KEYPAIRFIXED' | ' KEYPAIR' | string;
    config: any;
}

interface cipherLayerCardProp {
    layer: Layer;
    onUpdateConfig: (config: any) => void;
    onChangeType: (id: string | number, type: string) => void;
    onDelete: (id: string | number) => void;
}

function CaesarConfig({config, change}: caesarConfigProp) {
    const options = Array.from({ length: 26 }, (_, i) => i + 1)
    
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                level of shift:
            </label>
            <select 
                value={config.shift}
                onChange={(e) => change({ shift: parseInt(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
                {options.map(option => (
                    <option key={option} value={option}>shift +{option}</option>
                ))}
            </select>
        </div>
    );
}

function XorConfig({ config, change }: xorConfigProp) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Selected Key
            </label>
            <input 
                type="text" 
                placeholder="any key" 
                value={config.key} 
                onChange={(e) => change({ key: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
        </div>
    );
}
function KeypairFixedConfig({ config, change }: keypairConfigProp) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                public key: <strong className="text-gray-700 dark:text-gray-300">({config.e}, {config.n})</strong> 
                private key: <strong className="text-gray-700 dark:text-gray-300">({config.d}, {config.n})</strong> 
            </label>
        </div>
    )
}

function KeypairConfig({ config, change }: keypairConfigProp) {
    const [primes, setPrimes] = useState(String)
    const handleValidate = () => {
        let rawPrimes = primes
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v !== "" && !isNaN(Number(v)))
            .map(Number);
        const eulerFun = (rawPrimes[0] - 1) * (rawPrimes[1] - 1)

        if (rawPrimes.length !== 2 || !rawPrimes.every((prime) => Number.isInteger(prime) && prime > 1)) {
            alert("Enter two valid prime numbers.")
            return
        }

        if (!Number.isInteger(config.e) || config.e <= 1 || config.e >= eulerFun || gcd(config.e, eulerFun).x === 1) {
            alert(`Invalid public exponent. e must be between 1 and ${eulerFun} and coprime with φ(n).`)
            change({ ...config, e: 0 })
            return
        }

        const n = rawPrimes[0] * rawPrimes[1]
        let resultGCD = gcd(config.e, eulerFun)
        const d = resultGCD.x < 0 ? resultGCD.x + eulerFun : resultGCD.x
        change({ ...config, n, d })
    }
    return (
        <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="flex-1 flex flex-col gap-4 md:border-r border-gray-200 dark:border-gray-700 md:pr-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                        Two prime numbers (p, q)
                    </label>
                    <input
                        type="text"
                        value={primes}
                        onChange={(e) => setPrimes(e.target.value)}
                        placeholder="e.g., 17, 19"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold tracking-wider uppercase text-gray-500 dark:text-gray-400">
                        Public exponent (e)
                    </label>
                    <input
                        type="text"
                        value={config.e || ""}
                        onChange={(e) => change({ ...config, e: parseInt(e.target.value, 10) || 0 })}
                        placeholder="e.g., 5"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <button
                    onClick={handleValidate}
                    className="mt-2 w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
                >
                    Validate & Generate Keys
                </button>
            </div>
            <div className="flex-1 flex flex-col justify-center bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200 dark:border-gray-700 pb-2">
                        Generated Keys
                    </span>
                    <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>
                            Public Key: <strong className="text-indigo-600 dark:text-indigo-400 text-lg ml-2">({config.e || '?'}, {config.n || '?'})</strong>
                        </span>
                        <span>
                            Private Key: <strong className="text-emerald-600 dark:text-emerald-400 text-lg ml-2">({config.d || '?'}, {config.n || '?'})</strong>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export function CipherLayerCard({ layer, onUpdateConfig, onChangeType, onDelete }: cipherLayerCardProp) {
    return (
        <div className="mb-4 bg-white dark:bg-gray-800 shadow-md rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
            <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <select 
                    value={layer.type} 
                    onChange={(e) => onChangeType(layer.id, e.target.value)}
                    className="font-bold bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors"
                >
                    <option value="CAESAR" className="font-normal text-gray-900">Caesar Encoder</option>
                    <option value="XOR" className="font-normal text-gray-900">XOR Logic Gate</option>
                    <option value="KEYPAIR" className="font-normal text-gray-900">Key pair Encoder</option>
                    <option value="KEYPAIRFIXED" className="font-normal text-gray-900">Key pair Encoder(fixed keys)</option>
                </select>
                <button 
                    onClick={() => onDelete(layer.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded shadow transition-colors"
                >
                    Eliminar
                </button>
            </div>
            
            {/* 
                ATENCIÓN AL CAMBIO AQUÍ: 
                Eliminamos md:flex-row para que componentes anchos (como KeypairConfig) puedan usar el 100% del ancho del Card.
            */}
            <div className="p-4 flex flex-col gap-6 w-full">
                {layer.type === 'CAESAR' && (
                    <CaesarConfig config={layer.config} change={onUpdateConfig} />
                )}
                {layer.type === 'XOR' && (
                    <XorConfig config={layer.config} change={onUpdateConfig} />
                )}
                {layer.type === "KEYPAIR" && (
                    <KeypairConfig config={layer.config} change={onUpdateConfig} />
                )}
                {layer.type === "KEYPAIRFIXED" && (
                    <KeypairFixedConfig config={layer.config} change={onUpdateConfig} />
                )}
            </div>
        </div>
    );
}
