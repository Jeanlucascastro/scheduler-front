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
