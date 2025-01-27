export interface UnifiDevice {
  _id: string;
  name: string;
  model: string;
  version: string;
  upgradeAvailable: boolean;
  status: string;
  mac: string;
  ip: string;
  lastSeen: string;
}

export interface UnifiSite {
  _id: string;
  name: string;
  desc: string;
}

export interface ApiConfig {
  apiKey: string;
  baseUrl: string;
} 