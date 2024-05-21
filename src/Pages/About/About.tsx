// src/components/About.tsx
import Box from '@mui/material/Box'
import React from 'react'

const About: React.FC = () => {
  return (
    <div>
      {' '}
      <Box>
        {[...new Array(120)]
          .map(
            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
          )
          .join('\n')}
      </Box>
    </div>
  )
}

export default About
