
import axios, { type AxiosResponse } from 'axios';

import { UrlBase } from '../config'
import { getTokenSimple } from './TokenService';
import type { ISchedule } from '@/interfaces/schedule';
import type { ICreateScheduleDTO } from '@/interfaces/create-schedule';

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

  static async saveSchedule(schedule: ICreateScheduleDTO): Promise<any> {
    const token = getTokenSimple()
    console.log('schedule no service ', schedule, token)

    try {
      const response: AxiosResponse = await axios.post(`${UrlBase.apiUrl}/schedules`, schedule, {
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

  static async updateSchedule(schedule: ICreateScheduleDTO): Promise<ISchedule> {
    const token = getTokenSimple()
    console.log('schedule no service ', schedule, token)

    try {
      const response: AxiosResponse = await axios.put(`${UrlBase.apiUrl}/schedules/${schedule.id}`, schedule, {
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

  static async cancelSchedule(scheduleId: number): Promise<any> {
    const token = getTokenSimple()
    console.log('schedule no service ', scheduleId, token)

    try {
      const response: AxiosResponse = await axios.delete(`${UrlBase.apiUrl}/schedules/${scheduleId}`, {
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


  static async getAvalibleTimes(date: string): Promise<any> {
    const token = getTokenSimple()
    console.log('schedule no service ', date, token)

    // 2024-05-31
    const companyId = 1;

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/schedules/available-slots?companyId=${companyId}&date=${date}`, {
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
