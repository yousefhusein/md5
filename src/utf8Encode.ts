export function utf8Encode(str: string): Uint8Array {
  const bytes: number[] = []

  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)

    if (charCode < 128) {
      bytes.push(charCode)
    } else if (charCode < 2048) {
      bytes.push((charCode >> 6) | 192)
      bytes.push((charCode & 63) | 128)
    } else {
      bytes.push((charCode >> 12) | 224)
      bytes.push(((charCode >> 6) & 63) | 128)
      bytes.push((charCode & 63) | 128)
    }
  }

  return new Uint8Array(bytes)
}
