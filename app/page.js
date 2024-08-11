'use client'
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import StickyNavBar from './StickyNavBar'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined'
import Diversity2OutlinedIcon from '@mui/icons-material/Diversity2Outlined'

export default function Home() {
  const chatContainerRef = useRef(null)
  const [history, setHistory] = useState([])
  const [message, setMessage] = useState('')
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
            <ArrowUpwardOutlinedIcon style={{}} />
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

// 'use client'
// import Image from 'next/image'
// import { useState, useRef, useEffect } from 'react'
// import { Box, Stack, TextField, Button } from '@mui/material'

// export default function Home() {
//   const [message, setMessage] = useState('')
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       content:
//         'Hi I  am the HeadStarter Support Agent,  how can I assist you today?',
//     },
//   ])
//   const chatContainerRef = useRef(null)

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       sendMessage()
//     }
//   }

//   const sendMessage = async () => {
//     if (!message.trim()) return // Don't send empty strings

//     setMessages((messages) => [
//       ...messages,
//       { role: 'user', content: '' },
//       { role: 'assistant', content: '' },
//     ])
//      setMessage('')

//     const response = fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify([...messages, { role: 'user', content: message }]),
//     }).then(async (res) => {
//       const reader = res.body.getReader()
//       const decoder = new TextDecoder()

//       let result = ''
//       return reader.read().then(function processText({ done, value }) {
//         if (done) {
//           return result
//         }
//         const text = decoder.decode(value || new Int8Array(), { stream: true })

//         setMessages((messages) => {
//           console.log('messages: ', messages)
//           let lastMsg = messages[messages.length - 1]
//           let otherMsgs = messages.slice(0, messages.length - 1)
//           return [
//             ...otherMsgs,
//             {
//               ...lastMsg,
//               content: lastMsg.content + text,
//             },
//           ]
//         })
//         return reader.read().then(processText)
//       })
//     })
//   }

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeigh
//     }
//   }, [messages])

//   return (
//     <Box
//       width="100vw"
//       height="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="space-between"
//       alignItems="center"
//       overflow="hidden"
//     >
//       <Stack
//         direction="column"
//         width="600px"
//         height="700px"
//         border="1px solid black"
//         p={2}
//         spacing={3}
//       >
//         <Stack
//           ref={chatContainerRef}
//           direction="column"
//           spacing={2}
//           flexGrow={1}
//           overflow="auto"
//           maxHeight="100%"
//         >
//           {messages.map((message, index) => (
//             <Box
//               key={index}
//               display="flex"
//               justifyContent={
//                 message.role === 'assistant' ? 'flex-start' : 'flex-end'
//               }
//             >
//               <Box
//                 bgcolor={message.role === 'assistant' ? 'blue' : 'gray'}
//                 color="white"
//                 borderRadius={16}
//                 p={3}
//               >
//                 {message.content}
//               </Box>
//             </Box>
//           ))}
//         </Stack>

//         <Stack direction="row" spacing={2}>
//           <TextField
//             placeholder="Type..."
//             label="message"
//             fullWidth
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//           />
//           <Button variant="contained" onClick={sendMessage}>
//             Send
//           </Button>
//         </Stack>
//       </Stack>
//     </Box>
//   )
// }
