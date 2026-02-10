# Firebase Image Upload

This folder contains scripts for uploading product images to Firebase Storage.

## Quick Start

1. **Download Service Account Key**
   - Go to Firebase Console → Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `serviceAccountKey.json` in this folder
   - ⚠️ NEVER commit this file to git!

2. **Organize Your Images**
   - Create folder: `images-to-upload/`
   - Add subfolders: `birthday/`, `wedding/haldi/`, etc.
   - Copy your images into these folders

3. **Configure Upload Script**
   - Open `upload-images.js`
   - Line 15: Replace `YOUR_STORAGE_BUCKET_URL` with your Firebase bucket

4. **Install Dependencies**
   ```bash
   npm install firebase-admin --save-dev
   ```

5. **Run Upload**
   ```bash
   node scripts/upload-images.js
   ```

6. **Copy URLs**
   - Script prints URL for each uploaded image
   - Copy these URLs into `constants/products.ts`

## Folder Structure

```
scripts/
├── upload-images.js          ← Upload script
├── serviceAccountKey.json    ← Your Firebase admin key (add this, DON'T commit!)
└── images-to-upload/         ← Your product images (create this)
    ├── birthday/
    ├── wedding/
    │   ├── haldi/
    │   ├── mehendi/
    │   ├── reception/
    │   └── mandap/
    └── baby-shower/
        ├── welcome-baby/
        └── baby-shower/
```

## Security

🔒 **IMPORTANT**: `serviceAccountKey.json` contains sensitive credentials
- Already added to `.gitignore`
- Never share this file
- Never commit to git
- Keep it secure

---

For detailed instructions, see: [FIREBASE_SETUP_GUIDE.md](../FIREBASE_SETUP_GUIDE.md)
