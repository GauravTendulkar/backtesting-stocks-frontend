// decompressGzipBase64.js
import pako from "pako";

// Browser atob handles base64 → string. We need bytes, so:
function base64ToUint8Array(base64) {
  let binaryString = atob(base64);
  let len = binaryString.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// decompress and parse JSON
export function decompressGzippedBase64Json(b64gzstr) {
  const byteArr = base64ToUint8Array(b64gzstr);
  const decompressed = pako.ungzip(byteArr, { to: 'string' });
  return JSON.parse(decompressed);
}
