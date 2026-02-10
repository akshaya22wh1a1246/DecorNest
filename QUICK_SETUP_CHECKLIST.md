# 🚀 Quick Setup Checklist

Use this as your step-by-step checklist. Check off each step as you complete it.

---

## ✅ PART 1: Firebase Project Setup

- [ ] 1. Go to [console.firebase.google.com](https://console.firebase.google.com/)
- [ ] 2. Click "Create a project" → Name it "DecorNest"
- [ ] 3. Disable Analytics (optional) → Click "Create project"
- [ ] 4. Click Web icon `</>` → Name: "DecorNest App" → Register
- [ ] 5. **COPY the config values** (apiKey, projectId, etc.)
- [ ] 6. Click "Storage" in sidebar → "Get Started"
- [ ] 7. Choose "Test mode" → Select location → Done

---

## ✅ PART 2: Configure App

- [ ] 8. Open file: `config/firebase.js`
- [ ] 9. Paste your Firebase config values
- [ ] 10. Save file
- [ ] 11. Run `npm start` to test (no errors = success!)

---

## ✅ PART 3: Upload Images

**Choose ONE option:**

### OPTION A: Manual Upload (Easy)
- [ ] 12a. Go to Firebase Console → Storage
- [ ] 13a. Create folders: `products/birthday/`, `products/wedding/mandap/`, etc.
- [ ] 14a. Upload images via "Upload file" button
- [ ] 15a. Click each image → Copy "Download URL"
- [ ] 16a. Skip to Part 4

### OPTION B: Bulk Upload (Faster)
- [ ] 12b. Firebase Console → Settings ⚙️ → Service accounts
- [ ] 13b. Click "Generate new private key" → Download
- [ ] 14b. Rename to `serviceAccountKey.json`
- [ ] 15b. Move to: `scripts/serviceAccountKey.json`
- [ ] 16b. Create folder: `scripts/images-to-upload/`
- [ ] 17b. Organize images in subfolders (birthday/, wedding/haldi/, etc.)
- [ ] 18b. Open `scripts/upload-images.js` → Line 15: Add your bucket name
- [ ] 19b. Run: `npm install firebase-admin --save-dev`
- [ ] 20b. Run: `node scripts/upload-images.js`
- [ ] 21b. **COPY all the URLs** printed in console

---

## ✅ PART 4: Update Product Data

- [ ] 22. Open: `constants/products.ts`
- [ ] 23. Replace Unsplash URLs with your Firebase URLs
- [ ] 24. Update both `image:` and `images:[]` arrays
- [ ] 25. Save file

Example:
```typescript
image: 'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/theme1.jpg',
images: [
  'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/theme1.jpg',
  'https://storage.googleapis.com/YOUR-BUCKET/products/birthday/theme2.jpg',
],
```

---

## ✅ PART 5: Secure Storage

- [ ] 26. Firebase Console → Storage → Rules tab
- [ ] 27. Copy rules from `FIREBASE_SETUP_GUIDE.md` (Part 5, Step 11)
- [ ] 28. Click "Publish"

---

## ✅ PART 6: Test Everything

- [ ] 29. Run: `npm start`
- [ ] 30. Open app on device/emulator
- [ ] 31. Navigate to products screen
- [ ] 32. **Images loading? ✅ YOU'RE DONE!**

---

## 🚨 Quick Troubleshooting

**Images not showing?**
- Double-check URLs start with `https://storage.googleapis.com/`
- Verify files exist in Firebase Console → Storage
- Check Storage Rules allow public read

**Upload script fails?**
- Verify `serviceAccountKey.json` is in `scripts/` folder
- Check bucket name matches your Firebase project
- Make sure `images-to-upload/` folder exists with images

**Firebase connection error?**
- Verify all config values in `config/firebase.js`
- Check if Firebase project is active
- Run `npm start` again

---

## 📊 Image Requirements

Before uploading, optimize your images:
- **Format**: JPG (photos), PNG (graphics with transparency)
- **Size**: Max 1200px width recommended
- **File size**: Under 500KB each (use [tinypng.com](https://tinypng.com))
- **Naming**: Use descriptive names with hyphens: `mandap-red-gold.jpg`

---

## 🎯 Your Firebase URLs Will Look Like:

```
https://storage.googleapis.com/[YOUR-PROJECT].appspot.com/products/[category]/[image-name].jpg
```

**Example:**
```
https://storage.googleapis.com/decornest-123.appspot.com/products/wedding/mandap/traditional-red.jpg
```

---

## 📂 Recommended Folder Structure

```
products/
  birthday/
    (your birthday images)
  wedding/
    mandap/
      (mandap images)
    mehendi/
      (mehendi images)  
    haldi/
      (haldi images)
    reception/
      (reception images)
  baby-shower/
    welcome-baby/
      (welcome baby images)
    baby-shower/
      (general baby shower images)
```

---

## ⏱️ Estimated Time

- First-time setup: **20-25 minutes**
- Image upload (manual): **5-10 minutes** per category
- Image upload (bulk script): **2-3 minutes** for all
- Updating product data: **10 minutes**

**Total: About 30-40 minutes** ⏰

---

## ✅ Done?

If all checkboxes are checked and images are loading, congratulations! 🎉

Your DecorNest app now has professional, scalable image storage powered by Firebase!

---

**Need detailed help?** See: [FIREBASE_SETUP_GUIDE.md](FIREBASE_SETUP_GUIDE.md)
