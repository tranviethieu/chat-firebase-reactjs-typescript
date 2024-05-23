import { useContext, useRef, useState } from 'react'
import styles from './Chat.module.scss'
import { AuthContext, AuthContextType } from '../../../../../Context/AuthProvider'
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone'
import VideocamIcon from '@mui/icons-material/Videocam'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import PhoneIcon from '@mui/icons-material/Phone'
import EmojiPicker from 'emoji-picker-react'
import MicIcon from '@mui/icons-material/Mic'
import ImageIcon from '@mui/icons-material/Image'
import SendIcon from '@mui/icons-material/Send'
import InfoIcon from '@mui/icons-material/Info'
import clsx from 'clsx'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/material'
interface Props {}
function Chat({}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType
  const [checkSize, setCheckSize] = useState<boolean>(true)
  const endRef = useRef(null)
  const [img, setImg] = useState({
    file: null,
    url: ''
  })
  const [chat, setChat] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const handleEmoji = () => {}
  const handleSend = () => {}
  const handleImg = () => {}
  return (
    <div className={styles.main}>
      <div className={styles.chat}>
        <div className={styles.top}>
          <div className={styles.user}>
            <img src={user?.photoURL || './avatar.png'} alt='' />
            <div className={styles.texts}>
              <span>{user?.displayName}</span>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className={styles.icons}>
            <PhoneIcon />
            <VideocamIcon />
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setCheckSize(!checkSize)
              }}
            >
              <InfoIcon />
            </div>
          </div>
        </div>
        <div className={styles.center}>
          {/* {chat?.messages?.map((message: any) => (
          <div className={message.senderId === currentUser?.id ? 'message own' : 'message'} key={message?.createAt}>
            <div className='texts'>
              {message.img && <img src={message.img} alt='' />}
              <p>{message.text}</p>
              <span>{message.createdAt}</span>
            </div>
          </div>
        ))} */}

          <div className={styles.message}>
            <div className={styles.texts}>
              <p>testtttt</p>
              <span>10:07 am</span>
            </div>
          </div>
          <div className={styles.message}>
            <div className={styles.texts}>
              <p>testtttt asadsaaaaa sadasdsa</p>
              <span>10:07 am</span>
            </div>
          </div>
          <div className={clsx(styles.message, styles.own)}>
            <div className={styles.texts}>
              <p>testtttt</p>
              <span>10:08 am</span>
            </div>
          </div>
          {img.url && (
            <div className={clsx(styles.message, styles.own)}>
              <div className={styles.texts}>
                <img src={img.url} alt='' />
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.icons}>
            <label htmlFor='file'>
              <ImageIcon />
            </label>
            <input type='file' id='file' style={{ display: 'none' }} onChange={handleImg} />
            <PhotoCameraIcon />
            <MicIcon />
          </div>
          <input type='text' placeholder={'Type a message...'} value={text} onChange={(e) => setText(e.target.value)} />
          <div className={styles.emoji}>
            <div onClick={() => setOpen((prev) => !prev)}>
              <SentimentSatisfiedTwoToneIcon sx={{ color: '#5183fe' }} />
            </div>

            <div className={styles.picker}>
              <EmojiPicker open={open} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className={styles.sendButton} onClick={handleSend}>
            <SendIcon sx={{ color: 'white' }} />
          </button>
        </div>
      </div>
      {checkSize && <div style={{ minWidth: '33%' }}>aaa</div>}
    </div>
  )
}

export default Chat
