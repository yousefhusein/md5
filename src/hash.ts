import { utf8Encode } from './utf8Encode'

export function hash(plainTextPassword: string): string {
    let hashValue = md5(plainTextPassword)

    for (let i = 1; i < 10; i++) hashValue += md5(hashValue)

    return hashValue
}

function md5(str: string): string {
    function rotateLeft(n: number, s: number): number {
        return (n << s) | (n >>> (32 - s))
    }

    const blockSize = 64
    const hexChars = '0123456789abcdef'

    function toHex(n: number): string {
        return hexChars.charAt((n >> 4) & 0x0f) + hexChars.charAt(n & 0x0f)
    }

    // Convert the input string to UTF-8 encoded text
    const encodedStr = utf8Encode(str)

    // Append padding bits and length
    const totalBytes = encodedStr.length
    const paddingBytes = blockSize - ((totalBytes + 8) % blockSize)
    const lengthBits = totalBytes * 8

    const paddedBytes = new Uint8Array(totalBytes + paddingBytes + 8)
    paddedBytes.set(encodedStr)

    paddedBytes[totalBytes] = 0x80
    for (let i = 0; i < 8; i++) paddedBytes[totalBytes + paddingBytes + i] = (lengthBits >>> (i * 8)) & 0xff

    // Initialize hash values
    let a = 0x67452301
    let b = 0xefcdab89
    let c = 0x98badcfe
    let d = 0x10325476

    // Process message in 16-word blocks
    for (let i = 0; i < paddedBytes.length; i += blockSize) {
        const block = paddedBytes.subarray(i, i + blockSize)

        const words: number[] = []
        for (let j = 0; j < blockSize / 4; j++) {
            words[j] = block[j * 4] | (block[j * 4 + 1] << 8) | (block[j * 4 + 2] << 16) | (block[j * 4 + 3] << 24)
        }

        const tempA = a
        const tempB = b
        const tempC = c
        const tempD = d

        // Round 1
        for (let j = 0; j < 16; j++) {
            const f = (b & c) | (~b & d)
            const g = j
            const temp = d
            d = c
            c = b
            b = b + rotateLeft(a + f + words[g] + 0xd76aa478, 7)
            a = temp
        }

        // Round 2
        for (let j = 16; j < 32; j++) {
            const f = (d & b) | (~d & c)
            const g = (5 * j + 1) % 16
            const temp = d
            d = c
            c = b
            b = b + rotateLeft(a + f + words[g] + 0xe8c7b756, 12)
            a = temp
        }

        // Round 3
        for (let j = 32; j < 48; j++) {
            const f = b ^ c ^ d
            const g = (3 * j + 5) % 16
            const temp = d
            d = c
            c = b
            b = b + rotateLeft(a + f + words[g] + 0x242070db, 17)
            a = temp
        }

        // Round 4
        for (let j = 48; j < 64; j++) {
            const f = c ^ (b | ~d)
            const g = (7 * j) % 16
            const temp = d
            d = c
            c = b
            b = b + rotateLeft(a + f + words[g] + 0xc1bdceee, 22)
            a = temp
        }

        a = (a + tempA) >>> 0
        b = (b + tempB) >>> 0
        c = (c + tempC) >>> 0
        d = (d + tempD) >>> 0
    }

    const generatedHash = toHex(a) + toHex(b) + toHex(c) + toHex(d)
    return generatedHash
}
