import { useState, useEffect } from 'react'
import { db } from '../firebase/firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
const useFirestore = (namedb: string, condition: any) => {
  const [documents, setDocuments] = useState<any>([])

  useEffect(() => {
    let collectionRef = query(collection(db, namedb), orderBy('createdAt'))
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([])
        return
      }

      collectionRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue))
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))

      setDocuments(documents)
    })

    return unsubscribe
  }, [namedb, condition])

  return documents
}

export default useFirestore
