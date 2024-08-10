import React from 'react'
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'

const StickyNavBar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ top: 0, zIndex: 1100, backgroundColor: 'black' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Welcomi
        </Typography>
        <Button color="inherit" sx={{ textTransform: 'capitalize' }}>
          Sign up
        </Button>
        <Button color="inherit" sx={{ textTransform: 'capitalize' }}>
          Log in
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default StickyNavBar
