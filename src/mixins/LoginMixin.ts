import router from '@/router'
import {CheckToken, getTokenSimple } from '@/services/TokenService'

export interface LoginMixin {
  checkLogin: () => Promise<boolean>,
}

export const useLoginMixin = (): LoginMixin => {
  const checkLogin = async (): Promise<boolean> => {
    const token = getTokenSimple();
    console.log('=====> ', token);

    if (!token) {
      await router.push('/login');
      console.log('Token inválido ou não existe.');
      localStorage.removeItem('logs-data');
      return false; // Ensure boolean return
    } else {
      const decode = await CheckToken(token);
      console.log('D E C O D E', decode);

      if (!decode) {
        console.log(' ???????????????????????????????????????');
        localStorage.removeItem('logs-data');
        await router.push('/login');
        return false; // Ensure boolean return
      } else {
        return true; // Ensure boolean return
      }
    }
  };

  return { checkLogin };
};
