import Container from '@mui/material/Container'
import React from 'react'
import RequireAuth from '../../protected/RequiredAuth'
import RequiredLogout from '../../protected/RequiredLogout'
interface Props {
  children: React.ReactElement
}
function LayoutAuth({ children }: Props) {
  return (
    <React.Fragment>
      <RequiredLogout>
        <Container maxWidth='xl' sx={{ mt: 2 }}>
          {children}
        </Container>
      </RequiredLogout>
    </React.Fragment>
  )
}

export default LayoutAuth
