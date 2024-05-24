import React, { createContext, useContext, useMemo, useState } from 'react'

import { AuthContext, AuthContextType } from './AuthProvider'
import useFirestore from '../hooks/useFirestore '

export const AppContext = createContext<any>(null)

export default function AppProvider({ children }: any) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState('')

  const { user } = useContext(AuthContext) as AuthContextType
  const uid = user?.uid
  const roomsCondition = useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: uid
    }
  }, [uid])

  const rooms = useFirestore('rooms', roomsCondition)

  const selectedRoom = useMemo(
    () => rooms.find((room: any) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  )
  console.log(rooms)
  const usersCondition = React.useMemo(() => {
    return {
      fieldName: 'uid',
      operator: 'in',
      compareValue: selectedRoom.members
    }
  }, [selectedRoom.members])

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
