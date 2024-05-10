import axios from 'axios';
import { UrlBase } from '../config'
import type { IUserData } from '@/interfaces/user-data';


export default class AuthenticationService {
  static async login(email: string, password: string): Promise<IUserData> {
    try {
      const response = await axios.post<IUserData>(
        `${UrlBase.apiUrl}/auth/login`,
        {
          login: email,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        }
      );
      
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data: ' + error);
    }
  }
}
