import axios from 'axios';
import { ApiConfig, UnifiDevice, UnifiSite } from '../types/unifi';

const createApiClient = (config: ApiConfig) => {
  const client = axios.create({
    baseURL: config.baseUrl,
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  return {
    getSites: async (): Promise<UnifiSite[]> => {
      const response = await client.get('/ea/sites');
      return response.data;
    },

    getDevices: async (siteId: string): Promise<UnifiDevice[]> => {
      const response = await client.get('/ea/devices', {
        params: { site: siteId }
      });
      return response.data;
    },
  };
};

export default createApiClient; 