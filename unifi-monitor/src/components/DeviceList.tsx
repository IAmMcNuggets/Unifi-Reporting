import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  CircularProgress
} from '@mui/material';
import { UnifiDevice } from '../types/unifi';

interface DeviceListProps {
  devices: UnifiDevice[];
  isLoading: boolean;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, isLoading }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {devices.map((device) => (
          <ListItem
            key={device._id}
            divider
            sx={{
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ListItemText
              primary={device.name}
              secondary={
                <React.Fragment>
                  <Typography component="span" variant="body2" color="text.primary">
                    {device.model}
                  </Typography>
                  {` - ${device.version}`}
                </React.Fragment>
              }
            />
            <Chip
              label={device.upgradeAvailable ? "Update Available" : "Up to Date"}
              color={device.upgradeAvailable ? "warning" : "success"}
              size="small"
              sx={{ ml: 1 }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default DeviceList; 