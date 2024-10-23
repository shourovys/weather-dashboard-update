import db from '@/config/databaseConfig';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';

/**
 * Add a document to a Firestore collection securely.
 * @param collectionName - Name of the collection
 * @param data - Data to add
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
 * Get all documents from a Firestore collection securely.
 * @param collectionName - Name of the collection
 * @returns Promise with all documents or an error
 */
export const getDocuments = async (
  collectionName: string
): Promise<QuerySnapshot<DocumentData>> => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;
  } catch (e) {
    console.error('Error getting documents: ', e);
    throw new Error('Error fetching documents.');
  }
};

/**
 * Get a specific user's data from Firestore based on the user's UID.
 * @param collectionName - Name of the collection
 * @param userId - User ID to query
 * @returns Promise with the user's document data or an error
 */
export const getUserDocument = async (
  collectionName: string,
  userId: string
) => {
  try {
    const docRef = doc(db, collectionName, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('User Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
      throw new Error('No document found.');
    }
  } catch (e) {
    console.error('Error getting user document:', e);
    throw new Error('Error fetching user document.');
  }
};

/**
 * Get documents from a collection filtered by a specific field, like UID.
 * @param collectionName - Name of the collection
 * @param field - The field to filter on (e.g., "userId")
 * @param value - The value of the field to filter by
 * @returns Promise with the filtered documents or an error
 */
export const getDocumentsByField = async (
  collectionName: string,
  field: string,
  value: string
) => {
  try {
    const q = query(collection(db, collectionName), where(field, '==', value));
    const querySnapshot = await getDocs(q);

    const data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (e) {
    console.error('Error querying documents:', e);
    throw new Error('Error fetching documents.');
  }
};
