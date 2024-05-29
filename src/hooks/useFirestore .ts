import { useState, useEffect } from 'react'
import { db } from '../firebase/firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import moment from 'moment'
const useFirestore = (namedb: string, condition: any) => {
  const [documents, setDocuments] = useState<any>([])

  useEffect(() => {
    let collectionRef = query(collection(db, namedb), orderBy('createdAt'))
    //let collectionRef = query(collection(db, namedb))
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([])
        return
      }
      console.log(collectionRef)
      collectionRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue))
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
        //createdAtFormat: moment(doc.data().createdAt, 'HH:mm:ss').format('HH:mm:ss')
      }))

      setDocuments(documents)
    })

    return unsubscribe
  }, [namedb, condition])

  return documents
}

export default useFirestore
