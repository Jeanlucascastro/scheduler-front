import router from '@/router'
import { CheckToken } from '@/services/TokenService'

export interface LoginMixin {
  checkLogin: () => void
}

export const useLoginMixin = (): LoginMixin => {
  const checkLogin = () => {
    const token = localStorage.getItem('token-oasis')

    if (!token) {
      console.log('Token inválido ou não existe.')
      router.push('/')
    } else {
      const decode = CheckToken(token)

      if (!decode) {
        localStorage.removeItem('token-oasis')
        router.push('/')
      }
    }
  }

  return { checkLogin }
}
