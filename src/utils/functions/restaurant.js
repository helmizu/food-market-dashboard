import { collection, addDoc, getDocs, getFirestore } from "firebase/firestore";

export const addRestaurant = async (data = {}) => {
  const db = getFirestore();
  const docRef = await addDoc(collection(db, "restaurants"), data);
  return docRef;
}

export const getRestaurants = async () => {
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "restaurants"));
  const data = [];
  await querySnapshot.forEach((doc) => {
    const item = { id: doc.id, ...doc.data() };
    data.push(item)
  });
  return data;
}