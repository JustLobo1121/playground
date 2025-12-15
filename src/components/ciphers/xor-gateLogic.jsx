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