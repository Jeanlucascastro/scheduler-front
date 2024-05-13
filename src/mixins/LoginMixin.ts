import router from '@/router'
import {CheckToken, getTokenSimple } from '@/services/TokenService'

export interface LoginMixin {
  checkLogin: () => void
}

export const useLoginMixin = (): LoginMixin => {
  const checkLogin = async () => {
      const token = getTokenSimple()
      console.log('=====> ', token)
  
      if (!token) {
        router.push('/')
        console.log('Token inválido ou não existe. hh')
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
