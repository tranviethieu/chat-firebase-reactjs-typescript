import Modal from '@mui/material/Modal'
import { useContext, useState } from 'react'
import { AppContext } from '../../../../../Context/AppProvider'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AuthProvider, { AuthContext } from '../../../../../Context/AuthProvider'
import { addDocument } from '../../../../../firebase/services'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 0,
  boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  p: 4,
  borderRadius: '8px'
}
interface dataForm {
  name: string
  description: string
  createdAt?: Date
  members: string[]
}
function ModelUpsertRoom() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext)
  const { user } = useContext(AuthContext)
  const [form, setForm] = useState<dataForm>({
    name: '',
    description: '',
    members: []
  })
  const handleSubmit = (event: any) => {
    event.preventDefault()

    addDocument('rooms', { ...form, members: [user?.uid] })
    setForm({
      name: '',
      description: '',
      members: []
    })
    setIsAddRoomVisible(false)
  }
  return (
    <Modal
      open={isAddRoomVisible}
      onClose={() => {
        setIsAddRoomVisible(!isAddRoomVisible)
      }}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ marginBottom: '12px' }}>
          Thêm phòng
        </Typography>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { width: '100%', marginTop: '10px', fontSize: '10px' }
          }}
          noValidate
          autoComplete='off'
          onSubmit={handleSubmit}
        >
          <div>
            <TextField
              label='Size'
              size='small'
              value={form.name}
              onInput={(e: any) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <TextField
              label='Size'
              size='small'
              value={form.description}
              onInput={(e: any) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <Button variant='contained' type='submit' disableElevation sx={{ marginTop: '10px', fontSize: '12px' }}>
            Thêm phòng
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModelUpsertRoom
