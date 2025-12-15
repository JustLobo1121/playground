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
