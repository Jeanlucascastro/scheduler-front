
import axios, { type AxiosResponse } from 'axios';

import { UrlBase } from '../config'

export default class SchedulerService {
  static async getSchedules(): Promise<any> {
    const token = localStorage.getItem('token-oasis');
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
}
