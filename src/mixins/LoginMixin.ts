import router from '@/router'
import {CheckToken, getTokenSimple } from '@/services/TokenService'

export interface LoginMixin {
  checkLogin: () => void
}

export const useLoginMixin = (): LoginMixin => {
  const checkLogin = async () => {
    setTimeout(async () => {
      const token = getTokenSimple()
  
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
    }, 2000)

  }

  return { checkLogin }
}
