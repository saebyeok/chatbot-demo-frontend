import React from 'react';
import { Box, Card, CardContent, Typography, Avatar} from '@mui/material';
import { deepPurple, deepOrange } from '@mui/material/colors';

const ChatMessage = ({ sender, text, onClick }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
      mb: 1,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    {sender === 'user' && (
      <Avatar sx={{ bgcolor: deepPurple[500], ml: 1 }}>U</Avatar>
    )}
    <Card
      sx={{
        maxWidth: '60%',
        backgroundColor: sender === 'user' ? deepPurple[50] : '#fff',
        boxShadow: 3,
        borderRadius: 2,
        position: 'relative'
      }}
    >
      <CardContent>
        <Typography
          variant="body2"
          sx={{ wordBreak: 'break-word' }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
    {sender !== 'user' && (
      <Avatar sx={{ bgcolor: deepOrange[500], mr: 1 }}>S</Avatar>
    )}
  </Box>
);

export default ChatMessage;