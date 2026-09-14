interface caesarConfigProp {
    config: { shift: number };
    change: (config: { shift: number }) => void;
}

interface xorConfigProp {
    config: { key: string };
    change: (config: { key: string }) => void;
}

interface Layer {
    id: string | number;
    type: 'XOR' | 'CAESAR' | string;
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
                </select>
                <button 
                    onClick={() => onDelete(layer.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded shadow transition-colors"
                >
                    Eliminar
                </button>
            </div>
            <div className="p-4">
                {layer.type === 'CAESAR' && (
                    <CaesarConfig config={layer.config} change={onUpdateConfig} />
                )}
                {layer.type === 'XOR' && (
                    <XorConfig config={layer.config} change={onUpdateConfig} />
                )}
            </div>
            
        </div>
    );
}
