import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <Box  sx={{height:"100vh",backgroundImage:"linear-gradient(to right, lightgrey,#fff)",overflow:"auto"}}>
      <Outlet/>
    </Box>
  )
}

export default App