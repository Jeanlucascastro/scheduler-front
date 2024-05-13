import { KJUR, KEYUTIL } from 'jsrsasign';

export const CheckToken = async (token: string): Promise<boolean> => {
  try {
    const secret = '944e72fa-a3a6-414d-be07-49dc89b8da35';
    const decodedToken = KJUR.jws.JWS.verifyJWT(token, secret, {alg: ['HS256']});
    console.log('decodedToken', decodedToken)
    return true;
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return false;
  }
};
