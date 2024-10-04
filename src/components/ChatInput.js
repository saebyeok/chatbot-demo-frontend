import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const ChatInput = ({ message, setMessage, handleSend }) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Type a message..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
    />
    <IconButton
      color="primary"
      sx={{ ml: 1 }}
      onClick={handleSend}
    >
      <SendIcon />
    </IconButton>
  </Box>
);

export default ChatInput;