
export function gcd(a, b) {
	let x = 1; let y = 0;
	let x1 = 0; let y1 = 1;
	let a1 = a; let b1 = b;
	while (b1) {
		let q = Math.floor(a1 / b1);
		([x, x1] = [x1, x - q * x1]);
		([y. y1] = [y1, y - q * y1]);
		([a1, b1] = [b1, a1 - q * b1]);
	}
	return { gcd: a1, x, y};
}

