import React from 'react'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'
import { styled } from '@mui/system'

const StyledSignInButton = styled(SignInButton)({
  backgroundColor: '#3f51b5', // Material UI primary color
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  textTransform: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#002984', // Darker shade of primary color
  },
})

const StickyNavBar = () => {
  const { user } = useUser()
  return (
    <AppBar
      position="sticky"
      sx={{ top: 0, zIndex: 1100, backgroundColor: 'black' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {user ? `Welcome ${user.firstName}` : 'Welcomi'}
        </Typography>
        {user ? <UserButton /> : <StyledSignInButton />}

        <SignedOut />
      </Toolbar>
    </AppBar>
  )
}

export default StickyNavBar
