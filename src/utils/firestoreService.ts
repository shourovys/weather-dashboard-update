import db from '@/config/databaseConfig';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

/**
 * Add a document to a Firestore collection securely.
 * @param collectionName - Name of the collection
 * @param data - Data to add (must conform to the generic type T)
 * @returns Promise with the added document reference or an error
 */
export const addDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Error adding document.');
  }
};

/**
 * Get documents from a collection filtered by a specific field.
 * @param collectionName - Name of the collection
 * @param field - The field to filter on (e.g., "location")
 * @param value - The value of the field to filter by
 * @returns Promise with the filtered documents or an error
 */
export const getDocumentsByField = async <T extends DocumentData>(
  collectionName: string,
  field: keyof T,
  value: T[keyof T]
): Promise<(T & { id: string })[]> => {
  try {
    const q = query(
      collection(db, collectionName),
      where(field as string, '==', value)
    );
    const querySnapshot = await getDocs(q);

    const data: (T & { id: string })[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() } as T & { id: string });
    });

    return data;
  } catch (e) {
    console.error('Error querying documents:', e);
    throw new Error('Error fetching documents.');
  }
};
