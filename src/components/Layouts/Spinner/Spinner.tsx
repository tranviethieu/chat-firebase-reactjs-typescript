// src/components/Spinner.tsx
import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

const Spinner: React.FC = () => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant='determinate' value={progress} />
    </Box>
  )
}

export default Spinner
