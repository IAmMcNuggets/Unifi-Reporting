import { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Box, Container, Typography } from '@mui/material';
import ApiKeyInput from './components/ApiKeyInput';
import DeviceList from './components/DeviceList';
import createApiClient from './services/api';

const queryClient = new QueryClient();

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  if (!apiKey) {
    return <ApiKeyInput onSubmit={setApiKey} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <DeviceMonitor apiKey={apiKey} />
    </QueryClientProvider>
  );
}

function DeviceMonitor({ apiKey }: { apiKey: string }) {
  const api = createApiClient({
    apiKey,
    baseUrl: 'https://api.ui.com',
  });

  const { data: sites } = useQuery({
    queryKey: ['sites'],
    queryFn: () => api.getSites()
  });

  const { data: devices, isLoading } = useQuery({
    queryKey: ['devices', sites?.[0]?._id],
    queryFn: () => sites?.[0] ? api.getDevices(sites[0]._id) : Promise.resolve([]),
    enabled: !!sites?.[0]
  });

  return (
    <Box sx={{ bgcolor: '#f5f5f7', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 500 }}>
          UniFi Devices
        </Typography>
        <DeviceList devices={devices || []} isLoading={isLoading} />
      </Container>
    </Box>
  );
}

export default App;
