import { KJUR, KEYUTIL } from 'jsrsasign';

export const CheckToken = async (token: string): Promise<boolean> => {
  try {
    const secret = import.meta.env.VITE_TOKEN
    console.log('SECRET ', secret)
    const decodedToken = KJUR.jws.JWS.verifyJWT(token, secret, {alg: ['HS256']});
    console.log('decodedToken', decodedToken)
    return true;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
  }
};

// Importe a chave do arquivo .env
const keyString = import.meta.env.VITE_KEY;
// Converta a string da chave para um ArrayBuffer
const key = new TextEncoder().encode(keyString);

// Função para criptografar o token usando AES
export async function encryptToken(token: string): Promise<ArrayBuffer> {
  const iv = crypto.getRandomValues(new Uint8Array(16)); // Vetor de inicialização aleatório
  const encodedToken = new TextEncoder().encode(token);
  const importedKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['encrypt']);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, importedKey, encodedToken);
  return encrypted;
}

// Função para descriptografar o token usando AES
export async function decryptToken(encryptedToken: ArrayBuffer, key: Uint8Array): Promise<ArrayBuffer> {
  const iv = new Uint8Array(16); // Você também precisa do IV para descriptografar
  const importedKey = await crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, importedKey, encryptedToken);
  return decrypted;
}
