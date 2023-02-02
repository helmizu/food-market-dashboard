import { collection, addDoc, getDocs, getFirestore, updateDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// export const addRestaurant = async (data = {}) => {
//   const db = getFirestore();
//   const docRef = await addDoc(collection(db, "restaurants"), data);
//   return docRef;
// }

export const addRestaurant = async (data = {}) => {
  const db = getFirestore();
  const dbRef = collection(db, "restaurants");
  const imageName = data.image.name;
  const docRef = await addDoc(dbRef, { ...data, image: imageName, createdAt: serverTimestamp() });
  if (docRef.id) {
    const storage = getStorage();
    const imagePath = `/images/restaurants/${docRef.id}_${imageName}`
    const storageRef = ref(storage, imagePath);
    await uploadBytes(storageRef, data.image);
    const imageUrl = await getDownloadURL(storageRef)
    await updateDoc(docRef, { imageUrl, imagePath })
  }
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