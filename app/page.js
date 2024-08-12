'use client'
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import StickyNavBar from './StickyNavBar'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined'

export default function Home() {
  const chatContainerRef = useRef(null)
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState('')
  const { user } = useUser()
  const firstMessage =
    "Hello! I'm your virtual assistant for property inquiries. How can I help?"
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  const sendMessage = async () => {
    if (!message.trim()) return
    setHistory((history) => [
      ...history,
      { role: 'user', parts: [{ text: message }] },
    ])
    setMessage('')
    const response = await fetch('/api/cloudFunction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),
    })
    const data = await response.json()
    setHistory((history) => [
      ...history,
      { role: 'model', parts: [{ text: data.response_text }] },
    ])
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [history])

  return (
    <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#000000cf' }}>
      <StickyNavBar />
      {/* if user  show chat , else  show the logo  logo.png*/}
      {user ? (
        <Box
          sx={{
            width: 'auto',
            height: '90vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            overflow: 'hidden',
            // backgroundColor: '#000000cf',
          }}
        >
          <Box
            ref={chatContainerRef}
            sx={{
              width: '100%',
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              padding: 10,
              gap: 2,
            }}
          >
            <Box
              sx={{
                alignSelf: 'flex-start',
                bgcolor: 'black',
                borderRadius: 10,
                p: 2,
                mb: 2,
                color: 'white',
              }}
            >
              <Typography>{firstMessage}</Typography>
            </Box>
            {history.map((textObject, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf:
                    textObject.role === 'user' ? 'flex-end' : 'flex-start',
                  bgcolor: textObject.role === 'user' ? '#4e4c4c' : 'black',
                  color: 'white',
                  borderRadius: 10,
                  p: 2,
                  maxWidth: '70%',
                }}
              >
                {/* <Diversity2OutlinedIcon /> */}
                <Typography>{textObject.parts[0].text}</Typography>
              </Box>
            ))}
          </Box>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: '70%',
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
            }}
          >
            <TextField
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              fullWidth
              sx={{
                backgroundColor: '#000000cf',
                border: '3px solid #a8a5a5',
                borderRadius: 10,
                '& .MuiInputBase-input': {
                  color: 'white', // Set the text color to white
                },
                '& fieldset': { border: 'none' },
              }}
            />

            <Button
              sx={{
                backgroundColor: 'black',
                borderRadius: '50%',
                color: 'white',
                '&:hover': { backgroundColor: 'black' },
              }}
              onClick={sendMessage}
            >
              <ArrowUpwardOutlinedIcon />
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
          >
            <Image
              src={'/logo.png'}
              height={500}
              width={500}
              style={{ maxWidth: '100vw', height: 'auto' }}
              alt="logo"
            />
            <Typography
              variant="h5"
              sx={{ color: 'white' }}
              pt={5}
              px={20}
              align="center"
            >
              I&apos;m Welcomi, your virtual host, here to make sure your stay is as
              comfortable and enjoyable as possible. Whether you need help with
              the Wi-Fi, recommendations for local spots, or just a little
              company, I&apos;m here to assist you 24/7.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}