import React, { useState } from 'react'

import { useCollectionData } from 'react-firebase-hooks/firestore'
import firebase from 'firebase/compat/app'
import { auth } from '../../firebase/firebase'

export interface ChatMessageProps {
  message: {
    text: string
    uid: string
    photoURL: string
    id: string
  }
}

const ChatMessage: React.FC<ChatMessageProps> = (props) => {
  const { text, uid, photoURL } = props.message
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt='User Avatar' />
      <p>{text}</p>
    </div>
  )
}
export default ChatMessage
