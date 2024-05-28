import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import { db } from './firebase'
import { UserValue } from '../components/Pages/Messager/components/AddFriend/AddFriends'

export const addDocument = async (nameCollection: string, data: any) => {
  try {
    await addDoc(collection(db, nameCollection), {
      ...data,
      createdAt: serverTimestamp()
    })
  } catch (error) {
    console.error('Error document: ', error)
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

export const searchUsers = async (searchField: string, searchName: string) => {
  try {
    const usersCollection = collection(db, 'users')
    const q = query(
      usersCollection,
      where('keywords', 'array-contains', searchName?.toLowerCase()),
      orderBy(searchField),
      limit(20)
    )
    const querySnapshot = await getDocs(q)
    const users: any[] = []
    querySnapshot.forEach((doc) => {
      users.push({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL
      })
    })
    console.log('Matching users:', users)
    return users
  } catch (error) {
    console.error('Error searching for users: ', error)
    throw new Error('Failed to search for users')
  }
}
export async function fetchUserList(search: string): Promise<UserValue[]> {
  // if (!search) {
  //   return []
  // }
  console.log(search.toLowerCase())
  const usersCollection = collection(db, 'users')
  const q = query(usersCollection, limit(20))

  try {
    const snapshot = await getDocs(q)

    const users = snapshot.docs.map((doc) => {
      const data = doc.data()

      return {
        label: data.displayName,
        value: data.uid
      }
    })
    console.log(users)
    return users
  } catch (error) {
    console.error('Error fetching user list: ', error)
    throw new Error('Failed to fetch user list')
  }
}
// async function fetchUserList(username: string): Promise<UserValue[]> {
//   console.log('fetching user', username)

//   return fetch('https://randomuser.me/api/?results=5')
//     .then((response) => response.json())
//     .then((body) =>
//       body.results.map((user: { name: { first: string; last: string }; login: { username: string } }) => ({
//         label: `${user.name.first} ${user.name.last}`,
//         value: user.login.username
//       }))
//     )
// }
