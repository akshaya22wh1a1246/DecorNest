// Script to upload product images to Firebase Storage
// Run this with: node scripts/upload-images.js

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// STEP 1: Download your Firebase Admin SDK service account key
// Place it as: scripts/serviceAccountKey.json
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'YOUR_STORAGE_BUCKET_URL' // e.g., 'your-project.appspot.com'
});

const bucket = admin.storage().bucket();

// STEP 2: Organize your images in this folder structure:
// images-to-upload/
//   birthday/
//     image1.jpg
//     image2.jpg
//   wedding/
//     haldi/
//       image1.jpg
//     mehendi/
//       image1.jpg
//     reception/
//       image1.jpg
//     mandap/
//       image1.jpg
//   baby-shower/
//     welcome-baby/
//       image1.jpg
//     baby-shower/
//       image1.jpg

const LOCAL_IMAGES_FOLDER = path.join(__dirname, 'images-to-upload');

async function uploadDirectory(localPath, firebasePath = 'products') {
  const items = fs.readdirSync(localPath);
  
  for (const item of items) {
    const itemPath = path.join(localPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Recursively upload subdirectories
      await uploadDirectory(itemPath, `${firebasePath}/${item}`);
    } else if (stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      // Upload image file
      const destination = `${firebasePath}/${item}`;
      
      try {
        await bucket.upload(itemPath, {
          destination: destination,
          metadata: {
            contentType: getContentType(item),
            cacheControl: 'public, max-age=31536000', // Cache for 1 year
          },
          public: true, // Make images publicly accessible
        });
        
        // Get public URL
        const file = bucket.file(destination);
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
        
        console.log(`✅ Uploaded: ${destination}`);
        console.log(`   URL: ${publicUrl}\n`);
      } catch (error) {
        console.error(`❌ Failed to upload ${item}:`, error.message);
      }
    }
  }
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const types = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
  };
  return types[ext] || 'application/octet-stream';
}

async function main() {
  console.log('🚀 Starting image upload to Firebase Storage...\n');
  
  if (!fs.existsSync(LOCAL_IMAGES_FOLDER)) {
    console.error(`❌ Folder not found: ${LOCAL_IMAGES_FOLDER}`);
    console.log('💡 Create folder: scripts/images-to-upload/');
    process.exit(1);
  }
  
  if (!fs.existsSync(path.join(__dirname, 'serviceAccountKey.json'))) {
    console.error('❌ serviceAccountKey.json not found in scripts/ folder');
    console.log('💡 Download it from Firebase Console > Project Settings > Service Accounts');
    process.exit(1);
  }
  
  await uploadDirectory(LOCAL_IMAGES_FOLDER);
  
  console.log('\n✅ Upload complete! Copy the URLs into your products data.');
  process.exit(0);
}

main();
