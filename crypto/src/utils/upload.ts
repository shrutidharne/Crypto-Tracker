import { storage } from "../utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User as FirebaseUser } from "firebase/auth";

// // Function to upload user photo to Firebase Storage
// const uploadUserPhoto = async (user: FirebaseUser): Promise<string> => {
//   try {
//     // Check if we already have a Firebase Storage URL (avoid re-uploading)
//     if (user.photoURL && user.photoURL.includes('firebasestorage.googleapis.com')) {
//       return user.photoURL;
//     }

//     // Get the Google photo
//     const response = await fetch(user.photoURL || '');
//     if (!response.ok) throw new Error('Failed to fetch photo');
    
//     const blob = await response.blob();
    
//     // Create a reference to Firebase Storage
//     const photoRef = ref(storage, `user-photos/${user.uid}.jpg`);
    
//     // Upload the photo
//     await uploadBytes(photoRef, blob);
    
//     // Get the download URL
//     const downloadURL = await getDownloadURL(photoRef);
    
//     return downloadURL;
//   } catch (error) {
//     console.error('Error uploading photo:', error);
//     // Fallback to original photo URL if upload fails
//     return user.photoURL || '/default-avatar.png';
//   }
// };

// // Function to get or create user photo URL
// const getUserPhotoURL = async (user: FirebaseUser): Promise<string> => {
//   // If no photo, return default
//   if (!user.photoURL) {
//     return '/default-avatar.png';
//   }
  
//   // If already Firebase Storage URL, return it
//   if (user.photoURL.includes('firebasestorage.googleapis.com')) {
//     return user.photoURL;
//   }
  
//   // If Google URL, upload to Firebase Storage
//   if (user.photoURL.includes('googleusercontent.com')) {
//     return await uploadUserPhoto(user);
//   }
  
//   // Return as-is for other URLs
//   return user.photoURL;
// };
export const uploadUserPhoto = async (user: FirebaseUser): Promise<string> => {
  try {
    if (user.photoURL && user.photoURL.includes('firebasestorage.googleapis.com')) {
      return user.photoURL;
    }
    const response = await fetch(user.photoURL || '');
    if (!response.ok) throw new Error('Failed to fetch photo');
    const blob = await response.blob();
    const photoRef = ref(storage, `user-photos/${user.uid}.jpg`);
    await uploadBytes(photoRef, blob);
    const downloadURL = await getDownloadURL(photoRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading photo:', error);
    return user.photoURL || '/default-avatar.png';
  }
};

export const getUserPhotoURL = async (user: FirebaseUser): Promise<string> => {
  if (!user.photoURL) return '/default-avatar.png';
  if (user.photoURL.includes('firebasestorage.googleapis.com')) return user.photoURL;
  if (user.photoURL.includes('googleusercontent.com')) return await uploadUserPhoto(user);
  return user.photoURL;
};
