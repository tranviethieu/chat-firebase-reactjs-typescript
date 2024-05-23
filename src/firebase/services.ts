import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from './firebase'

export const addDocument = async (nameCollection: string, data: any) => {
  try {
    await addDoc(collection(db, nameCollection), {
      ...data,
      createdAt: serverTimestamp()
    })
    return '0'
  } catch (error) {
    console.error('Error document: ', error)
    return '1'
  }
}
export const updateDocument = (nameCollection: string, data: any) => {
  try {
    updateDoc(doc(db, nameCollection, data.uid), {
      ...data,
      createdAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error document: ', error)
  }
}
export const deleteDocument = (nameCollection: string, data: any) => {
  try {
    deleteDoc(doc(db, nameCollection, data.uid))
  } catch (error) {
    console.error('Error document: ', error)
  }
}
// Tìm kiếm người dùng dựa trên một điều kiện cụ thể (ví dụ: email)
export const searchUsers = async (searchField: string, searchTerm: string) => {
  try {
    const usersCollection = collection(db, 'users')
    const q = query(usersCollection, where(searchField, '==', searchTerm))
    const querySnapshot = await getDocs(q)
    const users: any[] = []
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() })
    })
    console.log('Matching users:', users)
    return users
  } catch (error) {
    console.error('Error searching for users: ', error)
    throw new Error('Failed to search for users')
  }
}
