import { useContext, useEffect, useMemo, useRef, useState } from 'react'
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
import { AppContext } from '../../../../../Context/AppProvider'
import { addDocument } from '../../../../../firebase/services'
import useFirestore from '../../../../../hooks/useFirestore '
import moment from 'moment'
import { formatRelative } from 'date-fns'
import upload from '../../../../../firebase/upload'
interface Props {}

function Chat({}: Props) {
  const { user } = useContext(AuthContext) as AuthContextType
  const { selectedRoom, members, setIsInviteMemberVisible } = useContext(AppContext)
  const [checkSize, setCheckSize] = useState<boolean>(true)
  const endRef = useRef<HTMLDivElement>(null)
  const [img, setImg] = useState({
    file: null,
    url: ''
  })

  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const handleEmoji = (e: any) => {
    setText((prev) => prev + e.emoji)
    setOpen(false)
  }
  const handleSendSubmit = async () => {
    let imgUrl = null
    if (img.file) {
      imgUrl = await upload(img.file)
    }
    if (text === '') {
      return
    }
    addDocument('messages', {
      text: text,
      uid: user?.uid,
      photoURL: user?.photoURL,
      roomId: selectedRoom.id,
      displayName: user?.displayName,
      img: imgUrl
    })
    setImg({
      file: null,
      url: ''
    })
    setText('')
  }
  const handleImg = (e: any) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }
  const condition = useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id
    }),
    [selectedRoom.id]
  )

  const messages = useFirestore('messages', condition)

  useEffect(() => {
    endRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  function formatDate(seconds: any) {
    let formattedDate = ''

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date())

      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    }

    return formattedDate
  }
  return (
    <div className={styles.main}>
      <div className={styles.chat}>
        <div className={styles.top}>
          <div className={styles.user}>
            <img src={user?.photoURL || './avatar.png'} alt='' />
            <div className={styles.texts}>
              <span>{selectedRoom?.name || user?.displayName}</span>
              <p>{members?.length}</p>
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
          {messages?.map((message: any, index: number) => (
            <div className={clsx(styles.message, { [styles.own]: message.uid === user?.uid })} key={index}>
              <div className={styles.texts}>
                {message.img && <img src={message.img} alt='' />}
                <p>{message.text}</p>
                <span>{formatDate(message?.createdAt?.seconds)}</span>
              </div>
            </div>
          ))}

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
          <button className={styles.sendButton} onClick={handleSendSubmit}>
            <SendIcon sx={{ color: 'white' }} />
          </button>
        </div>
      </div>
      {checkSize && <div style={{ minWidth: '33%' }}>aaa</div>}
    </div>
  )
}

export default Chat
