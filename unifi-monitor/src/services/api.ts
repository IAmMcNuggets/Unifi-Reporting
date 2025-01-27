import axios from 'axios';
import { ApiConfig, UnifiDevice, UnifiSite } from '../types/unifi';

const createApiClient = (config: ApiConfig) => {
  const client = axios.create({
    baseURL: 'https://api.ui.com',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': 'ui.com',
    },
  });

  return {
    getSites: async (): Promise<UnifiSite[]> => {
      const response = await client.get('/site-manager/v1/sites');
      return response.data.data;
    },

    getDevices: async (siteId: string): Promise<UnifiDevice[]> => {
      const response = await client.get(`/site-manager/v1/sites/${siteId}/devices`);
      return response.data.data;
    },
  };
};

export default createApiClient; 