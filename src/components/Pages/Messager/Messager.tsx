import Grid from '@mui/material/Grid'
import styles from './Messager.module.scss'
import Chat from './components/Chat'
import AddFriends from './components/AddFriend/AddFriends'
import { useContext } from 'react'
import { AppContext } from '../../../Context/AppProvider'
import { Alert, Space } from 'antd'

function Messager() {
  const { selectedRoomId } = useContext(AppContext)

  return (
    <Grid container spacing={2} sx={{ height: 'calc(100vh - 70px)' }}>
      <Grid item xs={3} sx={{ backgroundColor: 'white', height: '100%' }}>
        <AddFriends />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: 'white', height: '100%' }}>
        {selectedRoomId ? (
          <Chat />
        ) : (
          <Space direction='vertical' style={{ width: '100%', marginTop: '10px' }}>
            <Alert message='Chat bạn bè' description='Chat bạn bè.' type='info' showIcon />
          </Space>
        )}
      </Grid>
    </Grid>
  )
}

export default Messager
