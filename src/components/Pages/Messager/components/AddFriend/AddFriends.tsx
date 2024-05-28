import React, { useContext, useEffect, useState } from 'react'
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
import useDebounce from '../../../../../hooks/useDebounce'
import { fetchUserList, searchUsers } from '../../../../../firebase/services'
import { Input, Select, Spin } from 'antd'
import DebounceSelect from '../../../../common/DebounceSelect'
interface DataOption {
  label: string
  id: string
}
export interface UserValue {
  label: any
  value: any
}
function AddFriends() {
  const [value, setValue] = useState<UserValue[]>([])
  const { setIsAddRoomVisible } = useContext(AppContext)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue, 1000)
  const [options, setOptions] = useState([])
  const [fetching, setFetching] = useState(false)

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
            options={options}
            onChange={(event, newValue) => console.log(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Search user'
                size={'small'}
                InputProps={{
                  ...params.InputProps,
                  type: 'search'
                }}
                onChange={(e: any) => {
                  setSearchValue(e?.target?.value)
                  //console.log()
                }}
                sx={{ fontSize: '12px' }}
              />
            )}
          />
        </Stack>

        <DebounceSelect
          mode='multiple'
          value={value}
          placeholder='Select users'
          fetchOptions={fetchUserList}
          onChange={(newValue) => {
            setValue(newValue as UserValue[])
          }}
          style={{ width: '100%' }}
        />
        <Rooms />
      </Box>
    </div>
  )
}

export default AddFriends
