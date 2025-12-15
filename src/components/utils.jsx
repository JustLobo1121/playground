/**
 * function to replace characters with x replacement/shift of the alphabet
 * @param {String} text 
 * @param {Int} replacement 
 * @returns different character with x replacement/shift
 */
export function caesarCipher(text, replacement) {
	const shift = parseInt(replacement, 10)
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
export function caesarDecipher(text, replacement) {
	const shift = parseInt(replacement, 10)
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

			// otherwise
			return char
		}).join('')
}
/**
 * module function to use the XOR table to encode
 * @param {String} ti Binary Text Input
 * @param {String} tk Binary Text Input key
 * @returns Binary string encoded with XOR truth table 
 */
export function xor_encoder(ti, tk) {
    const code = []
    for (let i=0; i<ti.length;i++) {
        let iKey = i % tk.length
        if (ti[i] == tk[iKey]) code.push("0")
        if (ti[i] != tk[iKey]) code.push("1")
    }
    return code.join("")
}
/**
 * function to transform x number to binary equivalent
 * @param {Int} num 
 * @returns binary number
 */
export function numToBinary(num) {
    const number = parseInt(num)
    if(isNaN(number)) return ''
    return number.toString(2)
}
/**
 * function to transform binary to char equivalent
 * @param {*} char 
 * @returns character string
 */
export function binaryToChar(char) {
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
export function charToBinary(char) {
    const aux = char
        .split("")
        .map(c => {
            return String(c.charCodeAt(0).toString(2)).padStart(8,0)
        }).join('')
    return aux
}