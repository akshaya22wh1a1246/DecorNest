// Helper functions for working with Firebase Storage images

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';

/**
 * Upload an image to Firebase Storage
 * @param {string} uri - Local image URI
 * @param {string} path - Storage path (e.g., 'products/birthday/image1.jpg')
 * @returns {Promise<string>} - Download URL of the uploaded image
 */
export async function uploadImage(uri, path) {
  try {
    // Fetch the image as a blob
    const response = await fetch(uri);
    const blob = await response.blob();
    
    // Create storage reference
    const storageRef = ref(storage, path);
    
    // Upload the blob
    await uploadBytes(storageRef, blob, {
      contentType: blob.type || 'image/jpeg',
    });
    
    // Get and return the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

/**
 * Delete an image from Firebase Storage
 * @param {string} path - Storage path of the image to delete
 */
export async function deleteImage(path) {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}

/**
 * Pick an image from gallery and upload to Firebase
 * @param {string} storagePath - Where to store in Firebase (e.g., 'products/birthday/')
 * @returns {Promise<string|null>} - Download URL or null if cancelled
 */
export async function pickAndUploadImage(storagePath) {
  try {
    // Request permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload images!');
      return null;
    }
    
    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (result.canceled) {
      return null;
    }
    
    // Generate unique filename
    const filename = `${Date.now()}.jpg`;
    const fullPath = `${storagePath}${filename}`;
    
    // Upload and return URL
    const downloadURL = await uploadImage(result.assets[0].uri, fullPath);
    return downloadURL;
  } catch (error) {
    console.error('Error picking and uploading image:', error);
    throw error;
  }
}

/**
 * Get optimized image URL with size parameters
 * @param {string} url - Original Firebase Storage URL
 * @param {number} width - Desired width in pixels
 * @returns {string} - Optimized URL (works with Firebase extensions)
 */
export function getOptimizedImageUrl(url, width = 400) {
  // If you install Firebase Extensions > Resize Images
  // This will automatically serve optimized versions
  // For now, returns original URL
  return url;
}
