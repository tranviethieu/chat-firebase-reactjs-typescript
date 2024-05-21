// src/Chat.tsx
import React, { useEffect, useState } from 'react'

import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'
import { auth, firestore } from '../../firebase/firebase'

interface Message {
  id: string
  text: string
  uid: string
  photoURL: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
}

interface ChatMessageProps {
  message: Message
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, uid, photoURL } = message
  const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt='User Avatar' />
      <p>{text}</p>
    </div>
  )
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [formValue, setFormValue] = useState('')

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages')
    const q = query(messagesRef, orderBy('createdAt'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Message[]
      setMessages(messagesData)
    })

    return unsubscribe
  }, [])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    const { uid, photoURL } = auth.currentUser!
    await addDoc(collection(firestore, 'messages'), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')
  }

  return (
    <div>
      <div>{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}</div>
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Chat
