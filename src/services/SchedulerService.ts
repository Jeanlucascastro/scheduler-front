
import axios, { type AxiosResponse } from 'axios';

import { UrlBase } from '../config'
import { getTokenSimple } from './TokenService';

export default class SchedulerService {
  static async getSchedules(): Promise<any> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/schedules/by-user`, {
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

  static async getSchedulerById(id: number): Promise<any> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/schedules/${id}`, {
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
