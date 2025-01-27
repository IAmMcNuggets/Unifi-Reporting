import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper,
  Typography 
} from '@mui/material';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(apiKey);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f5f5f7'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 500 }}>
          UniFi Device Monitor
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              bgcolor: '#007AFF',
              '&:hover': {
                bgcolor: '#0056b3'
              }
            }}
          >
            Connect
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ApiKeyInput; 