import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase/firebase'

// Define the condition type
interface Condition {
  fieldName: string
  operator: any
  compareValue: any // Replace 'any' with the specific type if known
}

// Define the document type
export interface Document {
  uid: string
  members: string[]
  [key: string]: any // Replace 'any' with the specific type if known
}

// Define the hook
const useFirestore = (collection: string, condition?: Condition): Document[] => {
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    let collectionRef = firestore.collection(collection).orderBy('createdAt')

    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // Reset documents data
        setDocuments([])
        return
      }

      collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue)
    }

    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
        members: [doc.id]
      }))

      setDocuments(documents)
    })

    return unsubscribe
  }, [collection, condition])

  return documents
}

export default useFirestore
