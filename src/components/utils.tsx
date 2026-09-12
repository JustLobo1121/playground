/**
 * function to replace characters with x replacement/shift of the alphabet
 * @param {String} text 
 * @param {Int} replacement 
 * @returns different character with x replacement/shift
 */
export function caesarCipher(text: String, replacement: number) {
	const shift = replacement
	if (!shift || shift == 0) {
		return text
	}
	return text
		.split('')
		.map(char => {
			const code = char.charCodeAt(0)

			// upercase
			if (code >= 65 && code <= 90) {
				return String.fromCharCode(((code - 65 + shift) % 26) + 65)
			}

			// lower case
			if (code >= 97 && code <= 122) {
				return String.fromCharCode(((code - 97 + shift) % 26) + 97)
			}
			// numbers
			if (code >= 48 && code <= 57) {
				return String.fromCharCode(((code - 48 + shift) % 10) + 48)
			}

			// otherwise
			return char

		}).join('')
}

/**
 * function to get the original character from the replacement/shift
 * @param {String} text 
 * @param {Int} replacement 
 * @returns original character
 */
export function caesarDecipher(text: String, replacement: number) {
	const shift = replacement
	if (!shift || shift == 0) {
		return text
	}
	return text
		.split('')
		.map(char => {
			const code = char.charCodeAt(0)

			// upercase
			if (code >= 65 && code <= 90) {
				return String.fromCharCode(((code - 65 - shift) % 26) + 65)
			}

			// lower case
			if (code >= 97 && code <= 122) {
				return String.fromCharCode(((code - 97 - shift) % 26) + 97)
			}
			// numbers
			if (code >= 48 && code <= 57) {
				return String.fromCharCode((((code - 48 - shift) % 10) + 10) % 10 + 48)	
			}

			// otherwise
			return char
		}).join('')
}

/**
 * function to use the XOR table to encode
 * @param {String} ti Binary Text Input
 * @param {String} tk Binary Text Input key
 * @returns Binary string encoded with XOR truth table 
 */
export function xor_encoder(ti: String, tk: String) {
    const code = []
    for (let i=0; i<ti.length;i++) {
        let iKey = i % tk.length
        if (ti[i] == tk[iKey]) code.push("0")
        if (ti[i] != tk[iKey]) code.push("1")
    }
    return code.join("")
}

/**
 * Xor encoder with hexadecimal output
 * @param {String} ti binary string input
 * @param {String} tk binary string key
 * @returns hexadecimal string
 */
export function hexaXor_encoder(ti: String, tk: String) {
    const code = [];
    for (let i=0; i<ti.length; i++) {
        let iKey = i % tk.length;
        if (ti[i] == tk[iKey]) code.push("0");
        else code.push("1");
    }
    
    let binStr = code.join("");
    let hexStr = "";
    
    while (binStr.length % 4 !== 0) binStr = "0" + binStr;

    for (let i = 0; i < binStr.length; i += 4) {
        let chunk = binStr.substring(i, i + 4);
        hexStr += parseInt(chunk, 2).toString(16).toUpperCase();
    }
    
    return hexStr;
}

/**
 * function to transform x number to binary equivalent
 * @param {Int} num 
 * @returns binary number
 */
export function numToBinary(num: number) {
    const number = num
    if(isNaN(number)) return ''
    return number.toString(2)
}

/**
 * function to transform binary to char equivalent
 * @param {*} char 
 * @returns character string
 */
export function binaryToChar(char: String) {
    let aux = char.match(/.{1,8}/g)
    const chain = []
    if (aux == null) return ""
    for (let i=0;i<aux.length;i++) {
        chain.push(String.fromCharCode(parseInt(aux[i],2)))
        console.log("test: "+chain[i])
    }
    return (chain.join(""))
}

/**
 * function to transform char to binary equivalent
 * @param {*} char 
 * @returns binary string
 */
export function charToBinary(char: String) {
    const aux = char
        .split("")
        .map(c => {
            return String(c.charCodeAt(0).toString(2)).padStart(8,"0")
        }).join('')
    return aux
}

/**
 * function to detect if a string is a binary string
 * @param {String} char any String
 * @returns boolean if the string is binary or not
 */
export function detectBinary(char: String) {
	return char.match(/^[01]+$/) !== null
}

/**
 * Convierte un string Hexadecimal de vuelta a Binario
 * @param {String} hexString 
 * @returns {String} binary string
 */
export function hexToBinary(hexString: String) {
    let binary = "";
    for (let i = 0; i < hexString.length; i++) {
        let hexChar = hexString[i];
        binary += parseInt(hexChar, 16).toString(2).padStart(4, '0');
    }
    return binary;
}

/**
 * 
 * @param a base
 * @param b power of 
 * @param c module
 * @returns 
 */
export function exponenciacion_modular(a: number, b: number, c: number) {
    let aux = 1;
    for (let i = 0; i < b; i++) {
        aux = (aux*a)%c;
    }
    return aux;
}

export function rsaEncrypt(inputText: String, e: number, n: number) {
    return inputText.split('').map((char:String) => {
        let m = char.charCodeAt(0);
        return exponenciacion_modular(m, e, n);
    });
}

export function rsaDecrypt(cipherArray: number[], d: number, n: number) {
    return cipherArray.map(c => {
        let m = exponenciacion_modular(c, d, n);
        return String.fromCharCode(m);
    }).join('');
}
