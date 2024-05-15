import { KJUR } from 'jsrsasign';


export const CheckToken = async (token: string): Promise<boolean> => {
  try {
    const secret = import.meta.env.VITE_TOKEN
    const decodedToken = KJUR.jws.JWS.verifyJWT(token, secret, {alg: ['HMAC256']});
    console.log('decodedToken', decodedToken)
    return true;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
    
  }
};

const keyString = import.meta.env.VITE_KEY;

export function getTokenSimple() {
  //const token = localStorage.getItem('logs-data') as string
  //return decryptTokenSimple(token)
  return localStorage.getItem('logs-data')
}

export function encryptTokenSimple(token: string) {
  const encryptedToken = btoa(keyString + token);
  return encryptedToken;
}

export function decryptTokenSimple(encryptedToken: string) {
  const decryptedToken = atob(encryptedToken);
  const tokenWithoutKey = decryptedToken.slice(keyString.length);
  return tokenWithoutKey;
}

const encoder = new TextEncoder();
const keyArrayBuffer = encoder.encode(keyString);

const keyBuffer = new Uint8Array(keyArrayBuffer);

const finalKeyBytes = new Uint8Array(32);
finalKeyBytes.set(keyBuffer.slice(0, 32)); 


export async function encryptToken(token: string): Promise<ArrayBuffer> {
  const iv = crypto.getRandomValues(new Uint8Array(16)); // Vetor de inicialização aleatório
  const encodedToken = new TextEncoder().encode(token);
  const importedKey = await crypto.subtle.importKey('raw', finalKeyBytes, 'AES-GCM', false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, importedKey, encodedToken);
  return encrypted;
}

export async function decryptToken(encryptedTokenWithIV: ArrayBuffer): Promise<string> {
  const iv = new Uint8Array(encryptedTokenWithIV.slice(0, 16)); // IV está nos primeiros 16 bytes
  const encryptedData = encryptedTokenWithIV.slice(16); // Dados criptografados após o IV
  const importedKey = await crypto.subtle.importKey('raw', finalKeyBytes, 'AES-GCM', false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, importedKey, encryptedData);
  return new TextDecoder().decode(decrypted);
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function base64ToArrayBuffer(base64: string) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export function getToken() {
  const token = localStorage.getItem('logs-data') as string
  const tokenFromArrayBuffer = base64ToArrayBuffer(token);
  return decryptToken(tokenFromArrayBuffer)
}
