import React, { useState, useMemo, useContext, ReactNode, createContext } from 'react'
import { AuthContext, AuthContextType } from './AuthProvider'
import useFirestore from '../hooks/useFirestore '

// Define the shape of the Room and User objects
interface Room {
  uid: string
  members: string[]
  [key: string]: any // Replace 'any' with the specific type if known
}

interface User {
  uid: string
  members: string[]
  [key: string]: any // for any other properties
}

// Define the shape of the context
export interface AppContextType {
  rooms: Room[]
  members: User[]
  selectedRoom: Room | {}
  isAddRoomVisible: boolean
  setIsAddRoomVisible: React.Dispatch<React.SetStateAction<boolean>>
  selectedRoomId: string
  setSelectedRoomId: React.Dispatch<React.SetStateAction<string>>
  isInviteMemberVisible: boolean
  setIsInviteMemberVisible: React.Dispatch<React.SetStateAction<boolean>>
  clearState: () => void
}

// Create the context with an initial value of undefined
export const AppContext = createContext<Partial<AppContextType>>({})

interface AppProviderProps {
  children: ReactNode
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState('')

  const { user } = useContext(AuthContext) as AuthContextType

  const roomsCondition = useMemo(
    () => ({
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: user?.uid || ''
    }),
    [user]
  )

  const rooms = useFirestore('rooms', roomsCondition)

  const selectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  )

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom
    }
  }, [selectedRoom])

  const members = useFirestore('users', usersCondition)

  const clearState = () => {
    setSelectedRoomId('')
    setIsAddRoomVisible(false)
    setIsInviteMemberVisible(false)
  }

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        selectedRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
