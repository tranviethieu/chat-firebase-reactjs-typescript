import Grid from '@mui/material/Grid'
import styles from './Messager.module.scss'
import Chat from './components/Chat'
import AddFriends from './components/AddFriend/AddFriends'

function Messager() {
  return (
    <Grid container spacing={2} sx={{ height: 'calc(100vh - 70px)' }}>
      <Grid item xs={3} sx={{ backgroundColor: 'white', height: '100%' }}>
        <AddFriends />
      </Grid>
      <Grid item xs={9} sx={{ backgroundColor: 'white', height: '100%' }}>
        <Chat />
      </Grid>
    </Grid>
  )
}

export default Messager
