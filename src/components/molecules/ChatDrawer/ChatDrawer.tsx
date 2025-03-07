import { useState } from 'react';
import {
  Drawer,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { prompt } from '../../constants/aiChatPrompt';
import AutoAwesome from '@mui/icons-material/AutoAwesome'; // You can replace this with any icon you prefer
import Tooltip from '@mui/material/Tooltip';


const FloatingCard: any = ({ setOpen, open }: any) => {
  return (<Tooltip title="Open Google Gemini Chat"><IconButton disabled={open} onClick={() => setOpen(true)} color="inherit"><AutoAwesome /></IconButton></Tooltip>
  );
};

const ChatDrawer = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [apiKey, setApiKey] = useState<string>('');

  const sendMessage = async () => {
    if (!message.trim()) return;
    setChat([...chat, { sender: 'You', text: message }]);
    setMessage('');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  chat.map(({ text }) => ({
                    text: `The following was a historical message, please reference it for context for the final message. ${text}`,
                  })),
                  { text: message },
                ],
              },
            ],
          }),
        }
      );
      const data = await res.json();
      console.dir(data);
      const {
        candidates: [
          {
            content: {
              parts: [{ text }],
            },
          },
        ],
      } = data;
      setChat((prev) => [...prev, { sender: 'Gemini', text }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <FloatingCard setOpen={setOpen} open={open} />
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{p: 2, width: {
          md: 500,
          sm: '100%'
        }}}>
          <IconButton onClick={() => setOpen(false)} sx={{ float: 'right' }}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">Gemini Chat</Typography>
          <Typography variant="body1">
            This is a demonstration of an AI chatbot integration using Google
            Gemini. It requires manual API token creation - due to inability to
            use user login credentials to authenticate. Please note, this uses
            _your_ api token access, so any increases in usage beyond free-tier
            quotas will be chargeable dependent on Google&apos;s terms of use.
          </Typography>

          {!apiKey && (
            <Alert severity="info" sx={{ my: 2 }}>
              To use the chatbot, you need a Gemini API key. You can generate
              one at
              <a
                href="https://aistudio.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Google AI Studio
              </a>
              .
            </Alert>
          )}

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API Key"
            sx={{ my: 2 }}
          />

          {!apiKey ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Please add Gemini API Key to access chat functionality.
              </Typography>
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  height: 300,
                  overflowY: 'auto',
                  p: 1,
                  border: '1px solid #ccc',
                  my: 2,
                }}
              >
                {[chat[chat?.length - 1]]?.map((msg, index) => (
                  <Typography key={index}>
                    <b>{msg?.sender}:</b> {msg?.text}
                  </Typography>
                ))}
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <Button
                variant="contained"
                sx={{ mt: 1 }}
                fullWidth
                onClick={sendMessage}
              >
                Send
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default ChatDrawer;
