import { KJUR } from 'jsrsasign';


export const CheckToken = async (token: string): Promise<boolean> => {
  try {
    const secret = import.meta.env.VITE_TOKEN
    console.log('SECRET ', secret)
    console.log('token', token)
    const decodedToken = KJUR.jws.JWS.verifyJWT(token, secret, {alg: ['HMAC256']});
    console.log('decodedToken', decodedToken)
    return true;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
    
  }
};

const keyString = import.meta.env.VITE_KEY;

// Criando um TextEncoder
const encoder = new TextEncoder();
// Convertendo a string para um ArrayBuffer
const keyArrayBuffer = encoder.encode(keyString);

// Criando um Uint8Array a partir do ArrayBuffer
const keyBuffer = new Uint8Array(keyArrayBuffer);

// Ajuste o tamanho do buffer para 32 bytes (256 bits)
const finalKeyBytes = new Uint8Array(32); // Cria um array de bytes de 32 bytes
finalKeyBytes.set(keyBuffer.slice(0, 32)); 


// Função para criptografar o token usando AES
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

// Função para converter ArrayBuffer em string base64
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Função para converter string base64 de volta para ArrayBuffer
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
  const token = localStorage.getItem('token-oasis') as string
  const tokenFromArrayBuffer = base64ToArrayBuffer(token);
  return decryptToken(tokenFromArrayBuffer)
}

export function getTokenSimple() {
  const token = localStorage.getItem('token-oasis') as string
  return decryptTokenSimple(token)
}

export function encryptTokenSimple(token: string) {
  return btoa(token); // Codifica o token para Base64
}

// Função para descriptografar o token JWT
export function decryptTokenSimple(encryptedToken: string) {
  return atob(encryptedToken); // Decodifica o token de Base64
}