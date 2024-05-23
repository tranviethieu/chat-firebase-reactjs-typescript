import React, { useContext } from 'react'
import styles from './AddFriend.module.scss'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import VideocamIcon from '@mui/icons-material/Videocam'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import { AuthContext, AuthContextType } from '../../../../../Context/AuthProvider'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Rooms from '../Rooms/Rooms'
import { Box } from '@mui/material'
import AppProvider, { AppContext } from '../../../../../Context/AppProvider'
function AddFriends() {
  const { setIsAddRoomVisible } = useContext(AppContext)
  return (
    <div className={styles.chat}>
      <div className={styles.top}>
        <div className={styles.user}>
          {/* <img src={user?.photoURL || './avatar.png'} alt='' />
          <h4>{user?.displayName}</h4> */}
          <h2>Đoạn chat</h2>
        </div>
        <div className={styles.icons}>
          <div className={styles.box}>
            <MoreHorizIcon />
          </div>
          <div
            className={styles.box}
            onClick={() => {
              setIsAddRoomVisible(true)
            }}
          >
            <AppRegistrationIcon />
          </div>
        </div>
      </div>
      <Box sx={{ width: '100%', paddingX: '20px' }}>
        <Stack sx={{ marginBottom: '20px' }}>
          <Autocomplete
            freeSolo
            id='free-solo-2-demo'
            disableClearable
            options={[]}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search user'
                size={'small'}
                InputProps={{
                  ...params.InputProps,
                  type: 'search'
                }}
                sx={{ fontSize: '12px' }}
              />
            )}
          />
        </Stack>
        <Rooms />
      </Box>
    </div>
  )
}

export default AddFriends
