// Helper function to handle both URL and local require() images
// Use this to make images work whether they're URLs or local assets

/**
 * Converts product image (URL or require()) to Image source format
 * @param image - Can be a URL string or require() number
 * @returns Image source in correct format for expo-image
 */
export const getImageSource = (image: string | number | undefined): any => {
  // Handle undefined/null
  if (!image) {
    return require('../assets/images/icon.png');
  }
  
  // If it's a number (from require()), return it directly
  // expo-image handles module numbers natively
  if (typeof image === 'number') {
    return image;
  }
  
  // If it's a string, check if it's a URL or local path
  if (typeof image === 'string') {
    // URLs start with http:// or https://
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return { uri: image };
    }
    // For local string paths, return as-is
    return image;
  }
  
  // Fallback
  return require('../assets/images/icon.png');
};

/**
 * Check if image is a local asset (require()) or remote URL
 * @param image - Image source
 * @returns true if local asset, false if URL
 */
export const isLocalImage = (image: string | number | undefined): boolean => {
  return typeof image === 'number';
};
