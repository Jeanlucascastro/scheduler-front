
import axios, { type AxiosResponse } from 'axios';

import { UrlBase } from '../config'
import { getTokenSimple } from './TokenService';
import type { ICompany } from '@/interfaces/company';

export default class CompanyService {
  static async getCompanies(): Promise<ICompany[]> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/company?paginated=false`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.content;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async getCompanyById(id: number): Promise<any> {
    const token = getTokenSimple()

    try {
      const response: AxiosResponse = await axios.get(`${UrlBase.apiUrl}/company/${id}`, {
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

  static async saveCompany(company: ICompany): Promise<any> {
    const token = getTokenSimple()
    console.log('company no service ', company, token)

    try {
      const response: AxiosResponse = await axios.post(`${UrlBase.apiUrl}/company`, company, {
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
