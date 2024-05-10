// loginMixin.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import router from '@/router';


export interface LoginMixin {
  checkLogin: () => void;
}

export const useLoginMixin = (): LoginMixin => {
  // const router = useRouter();

  const checkLogin = () => {
    const token = localStorage.getItem('token-oasis');

    if (!token) {
      console.log(token)
      router.push('/');
    }
  };

  return { checkLogin };
};