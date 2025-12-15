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
            const code = c.charCodeAt(0)
            if (code.toString(2).length < 8) return String(code.toString(2)).padStart(8,0)
        }).join('')
    return aux
}