export const cryptoHash = async (algo, data) => {
	if (!data) return '';
	if (typeof data === 'string') data = new TextEncoder().encode(data);
	
	const hash = await crypto.subtle.digest(algo, data);
	const hashArray = Array.from(new Uint8Array(hash));
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

	return hashHex
}

const generateKeys = async (password, salt) => {
	const s = salt || crypto.getRandomValues(new Uint8Array(32));
	const keyMaterial = await crypto.subtle.importKey("raw", password, "PBKDF2", false, ["deriveBits"]);
	const entropy = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: s, iterations: 100000, hash: "SHA-256" }, keyMaterial, 640);
	return {
		cryptKey: await crypto.subtle.importKey("raw", entropy.slice(0, 32), { name: "AES-CBC", length: 256 }, true, ["encrypt", "decrypt"]),
		signKey: await crypto.subtle.importKey("raw", entropy.slice(32, 64), { name: "HMAC", hash: "SHA-256" }, true, ["sign", "verify"]),
		iv: entropy.slice(64),
		salt: s
	};
}

export const cryptoEncrypt = async (plaintext, password) => {
	const enc = new TextEncoder("utf-8");
	const encodedText = enc.encode(plaintext);
	const encodedPassword = enc.encode(password);
	const keys = await generateKeys(encodedPassword);
	const signature = new Uint8Array(await crypto.subtle.sign("HMAC", keys.signKey, encodedText));

	let buffer = new Uint8Array(encodedText.length + 32);
	buffer.set(signature, 0);
	buffer.set(encodedText, 32);

	const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-CBC", iv: keys.iv }, keys.cryptKey, buffer));
	buffer = new Uint8Array(encrypted.length + 32);
	buffer.set(keys.salt, 0);
	buffer.set(encrypted, 32);

	return buffer;
}

export const cryptoDecrypt = async (encrypted, password) => {
	const encodedPassword = new TextEncoder("utf-8").encode(password);
	const keys = await generateKeys(encodedPassword, encrypted.slice(0, 32));

	let buffer;
	try {
		buffer = new Uint8Array(await crypto.subtle.decrypt({ name: "AES-CBC", iv: keys.iv }, keys.cryptKey, encrypted.slice(32)));
	} catch (e) {
		throw new Error("Key mismatch");
	}

	const signature = buffer.subarray(0, 32);
	const encodedText = buffer.subarray(32);

	if (!await crypto.subtle.verify("HMAC", keys.signKey, signature, encodedText))
		throw new Error("Signature mismatch.");

	return new TextDecoder("utf-8").decode(encodedText);
}