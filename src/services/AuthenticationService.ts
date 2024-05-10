import axios from 'axios';
import { UrlBase } from '../config'

interface UserData {
  token: string;
  user: {
    id: string;
  };
}

export default class AuthenticationService {
  static async login(email: string, password: string): Promise<UserData> {
    try {
      const response = await axios.post<UserData>(
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
