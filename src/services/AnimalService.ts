
import axios, { type AxiosResponse } from 'axios';

import { UrlBase } from '../config'
import { getTokenSimple } from './TokenService';
import type { IAnimal } from '@/interfaces/animal';

export default class AnimalService {
  static async getAnimals(): Promise<any> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/animal`, {
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

  static async getAnimalById(id: number): Promise<any> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/animal/${id}`, {
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

  static async saveAnimal(animal: IAnimal): Promise<any> {
    const token = getTokenSimple()
    console.log('animal no service ', animal, token)

    try {
      const response: AxiosResponse = await axios.post(`${UrlBase.apiUrl}/animal`, animal, {
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
