
import axios, { type AxiosResponse } from 'axios';

import { UrlBase } from '../config'
import { getTokenSimple } from './TokenService';
import type { IType } from '@/interfaces/type';

export default class TypeService {
  static async getTypes(): Promise<IType[]> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/types`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('WW', response.data)
      return response.data.content;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

  static async getTypeById(id: number): Promise<IType> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/types/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }

  static async saveType(type: IType): Promise<any> {
    const token = getTokenSimple()
    console.log('Type no service ', type, token)

    try {
      const response: AxiosResponse = await axios.post(`${UrlBase.apiUrl}/types`, type, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; 
    }
  }
}
