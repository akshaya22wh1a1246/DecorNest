# 🔥 Firebase Storage Setup Guide

Complete step-by-step guide to set up Firebase Storage for your product images.

---

## 📋 Part 1: Create Firebase Project (5 minutes)

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: **"DecorNest"** (or your preferred name)
4. Click **Continue**
5. Disable Google Analytics (optional) or keep it enabled
6. Click **Create project**
7. Wait 30 seconds, then click **Continue**

### Step 2: Add Web App to Project
1. In Firebase Console, click the **Web icon** (`</>`) to add web app
2. App nickname: **"DecorNest App"**
3. ✅ Check **"Also set up Firebase Hosting"** (optional)
4. Click **Register app**
5. **⚠️ COPY the config values** - you'll need them next!

You'll see something like:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "decornest-123.firebaseapp.com",
  projectId: "decornest-123",
  storageBucket: "decornest-123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123"
};
```

### Step 3: Enable Firebase Storage
1. In left sidebar, click **"Build"** → **"Storage"**
2. Click **"Get Started"**
3. Choose **"Start in test mode"** (we'll secure it later)
4. Click **Next**
5. Select location: **Choose closest to your users** (e.g., `asia-south1` for India)
6. Click **Done**
7. Wait for storage to initialize

---

## 📋 Part 2: Configure Your App (2 minutes)

### Step 4: Add Firebase Config to Your App
1. Open file: `config/firebase.js`
2. Replace the placeholder values with your Firebase config:

```javascript
export const firebaseConfig = {
  apiKey: "AIzaSyB...",              // ← Paste YOUR values here
  authDomain: "decornest-123.firebaseapp.com",
  projectId: "decornest-123",
  storageBucket: "decornest-123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123"
};
```

3. Save the file

### Step 5: Test Firebase Connection
1. Open terminal in VS Code
2. Run: `npm start`
3. Press `w` for web or scan QR for mobile
4. Check console - no Firebase errors = ✅ success!

---

## 📋 Part 3: Upload Your Images (10 minutes)

You have **TWO OPTIONS** for uploading images:

---

## 🅰️ OPTION A: Manual Upload (Easy, Good for Few Images)

### Step 6a: Upload via Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click **Storage** in left sidebar
4. Click **Upload file** or **Create folder**

**Create this folder structure:**
```
📁 products/
  📁 birthday/
    🖼️ birthday-theme-1.jpg
    🖼️ birthday-theme-2.jpg
    🖼️ birthday-balloons.jpg
  📁 wedding/
    📁 haldi/
      🖼️ haldi-stage-1.jpg
    📁 mehendi/
      🖼️ mehendi-decor-1.jpg
    📁 reception/
      🖼️ reception-stage-1.jpg
    📁 mandap/
      🖼️ mandap-traditional.jpg
  📁 baby-shower/
    📁 welcome-baby/
      🖼️ welcome-baby-blue.jpg
    📁 baby-shower/
      🖼️ baby-shower-pastel.jpg
```

### Step 7a: Get Image URLs
1. Click on any uploaded image
2. Copy the **"Download URL"** from the right panel
3. Paste into your products data (see Part 4 below)

---

## 🅱️ OPTION B: Bulk Upload Script (Fast, For Many Images)

### Step 6b: Download Service Account Key
1. In Firebase Console, click ⚙️ (Settings) → **Project settings**
2. Go to **Service accounts** tab
3. Click **"Generate new private key"**
4. Click **Generate key** (downloads a JSON file)
5. **⚠️ IMPORTANT**: Rename it to `serviceAccountKey.json`
6. Move it to: `scripts/serviceAccountKey.json`
7. **⚠️ SECURITY**: Add to `.gitignore` (never commit this file!)

### Step 7b: Organize Your Images Locally
1. Create folder: `scripts/images-to-upload/`
2. Organize your images like this:

```
scripts/
  images-to-upload/
    birthday/
      birthday-theme-1.jpg
      birthday-theme-2.jpg
    wedding/
      haldi/
        haldi-stage-1.jpg
      mehendi/
        mehendi-decor-1.jpg
      reception/
        reception-stage-1.jpg
      mandap/
        mandap-traditional.jpg
    baby-shower/
      welcome-baby/
        welcome-baby-blue.jpg
      baby-shower/
        baby-shower-pastel.jpg
```

### Step 8b: Update Upload Script Config
1. Open: `scripts/upload-images.js`
2. Line 15: Replace `'YOUR_STORAGE_BUCKET_URL'` with your bucket name
   - Example: `'decornest-123.appspot.com'`

### Step 9b: Install Dependencies & Upload
1. Open terminal
2. Run:
```bash
npm install firebase-admin --save-dev
```

3. Run upload script:
```bash
node scripts/upload-images.js
```

4. **Watch the console** - it will print URLs for each uploaded image:
```
✅ Uploaded: products/birthday/birthday-theme-1.jpg
   URL: https://storage.googleapis.com/decornest-123.appspot.com/products/birthday/birthday-theme-1.jpg
```

5. **SAVE THESE URLs** - copy them into a text file!

---

## 📋 Part 4: Update Your Products Data (5 minutes)

### Step 10: Update products.ts
1. Open: `constants/products.ts`
2. Replace Unsplash URLs with your Firebase URLs:

**BEFORE:**
```typescript
image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
```

**AFTER:**
```typescript
image: 'https://storage.googleapis.com/decornest-123.appspot.com/products/wedding/mandap/mandap-traditional.jpg',
```

### Example Product with Firebase Images:
```typescript
{
  id: '1',
  title: 'Traditional Mandap Setup',
  price: 8999,
  category: 'Wedding',
  subcategory: 'Mandap',
  image: 'https://storage.googleapis.com/decornest-123.appspot.com/products/wedding/mandap/mandap-traditional.jpg',
  images: [
    'https://storage.googleapis.com/decornest-123.appspot.com/products/wedding/mandap/mandap-traditional.jpg',
    'https://storage.googleapis.com/decornest-123.appspot.com/products/wedding/mandap/mandap-flowers.jpg',
    'https://storage.googleapis.com/decornest-123.appspot.com/products/wedding/mandap/mandap-night.jpg',
  ],
  // ... rest of product data
}
```

---

## 📋 Part 5: Secure Your Storage (5 minutes)

### Step 11: Update Storage Rules
1. Go to Firebase Console → **Storage** → **Rules** tab
2. Replace default rules with these:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow public read for product images
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Only authenticated users can upload
    }
    
    // Allow authenticated users to manage their own uploads
    match /user-uploads/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **Publish**

---

## ✅ You're Done! Test Everything

### Step 12: Test in Your App
1. Run: `npm start`
2. Open app on device/emulator
3. Navigate to product listings
4. **You should see your Firebase images!**

---

## 🎯 Image URL Format Reference

Your Firebase Storage URLs will look like:
```
https://storage.googleapis.com/[YOUR-BUCKET]/products/[category]/[image-name].jpg
```

Example:
```
https://storage.googleapis.com/decornest-123.appspot.com/products/birthday/birthday-theme-1.jpg
```

---

## 🚨 Troubleshooting

### Images not loading?
1. Check Firebase Console → Storage - are files there?
2. Check Storage Rules - is read access allowed?
3. Check URL format - should start with `https://storage.googleapis.com/`

### Upload script fails?
1. Verify `serviceAccountKey.json` is in `scripts/` folder
2. Check bucket name in upload script matches your project
3. Install firebase-admin: `npm install firebase-admin --save-dev`

### Storage quota exceeded?
- Free tier: 5GB storage, 1GB/day downloads
- Upgrade to Blaze plan (pay-as-you-go) if needed

---

## 📚 Next Steps

1. **Optimize images** before uploading:
   - Resize to max 1200px width
   - Use JPG for photos (smaller size)
   - Compress with tools like [TinyPNG](https://tinypng.com/)

2. **Add image caching**:
   - Use `expo-image` component (already in your app)
   - It handles caching automatically!

3. **Set up CDN** (optional):
   - Firebase Storage already uses Google's CDN
   - Images are cached globally automatically

---

## 🆘 Need Help?

If you get stuck:
1. Check Firebase Console → Storage for errors
2. Check browser console / React Native logs
3. Verify all URLs are correct
4. Test uploading one image first before bulk upload

---

**Created on:** February 10, 2026  
**For:** DecorNest Event Décor Bazaar App
