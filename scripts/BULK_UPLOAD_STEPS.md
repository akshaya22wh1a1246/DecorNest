# 🚀 Bulk Upload - Step by Step Instructions

Follow these steps exactly. Check off each box as you complete it.

---

## ✅ STEP 1: Create Firebase Project (3 minutes)

- [ ] 1. Go to: https://console.firebase.google.com/
- [ ] 2. Click **"Add project"** or **"Create a project"**
- [ ] 3. Name: `DecorNest` → Click **Continue**
- [ ] 4. Disable Google Analytics (or keep it) → Click **Create project**
- [ ] 5. Wait 30 seconds → Click **Continue**

---

## ✅ STEP 2: Enable Storage (1 minute)

- [ ] 6. In left sidebar, click **Build** → **Storage**
- [ ] 7. Click **"Get Started"**
- [ ] 8. Choose **"Start in test mode"** → Click **Next**
- [ ] 9. Select location: Choose closest to you (e.g., `asia-south1` for India)
- [ ] 10. Click **Done**

---

## ✅ STEP 3: Download Service Account Key (2 minutes)

**IMPORTANT:** This file contains sensitive credentials. Keep it secure!

- [ ] 11. Click ⚙️ (Settings icon) next to "Project Overview" at top
- [ ] 12. Click **"Project settings"**
- [ ] 13. Click **"Service accounts"** tab at top
- [ ] 14. Scroll down → Click **"Generate new private key"** button
- [ ] 15. Click **"Generate key"** in popup (downloads a JSON file)
- [ ] 16. The file downloads as something like: `decornest-abc123-firebase-adminsdk-xyz.json`

**Now rename and move it:**
- [ ] 17. Rename the file to: `serviceAccountKey.json`
- [ ] 18. Move it to: `c:\Users\User\OneDrive\ドキュメント\GITHUB\DecorNest\scripts\serviceAccountKey.json`

---

## ✅ STEP 4: Get Your Storage Bucket Name (30 seconds)

- [ ] 19. In Firebase Console, go to **Project settings** → **General** tab
- [ ] 20. Find **"Storage bucket"** - it looks like: `decornest-abc123.appspot.com`
- [ ] 21. **COPY THIS** - you'll need it in next step

---

## ✅ STEP 5: Organize Your Images (2 minutes)

- [ ] 22. Open your project folder: `c:\Users\User\OneDrive\ドキュメント\GITHUB\DecorNest\scripts\`
- [ ] 23. Create new folder: `images-to-upload`
- [ ] 24. Inside it, create: `baby-shower` folder
- [ ] 25. Inside that, create: `welcome-baby` folder
- [ ] 26. **Copy your 13 images** into the `welcome-baby` folder

**Final structure should look like:**
```
scripts/
├── upload-images.js
├── serviceAccountKey.json          ← You put this here
└── images-to-upload/               ← You create this
    └── baby-shower/                ← You create this
        └── welcome-baby/           ← You create this
            ├── image1.jpg          ← Your images here
            ├── image2.jpg
            └── ... (13 total)
```

---

## ✅ STEP 6: Update Upload Script Config (1 minute)

- [ ] 27. Open file: `scripts/upload-images.js` in VS Code
- [ ] 28. Find line 15: `storageBucket: 'YOUR_STORAGE_BUCKET_URL'`
- [ ] 29. Replace `YOUR_STORAGE_BUCKET_URL` with your bucket name from Step 20
- [ ] 30. Example: `storageBucket: 'decornest-abc123.appspot.com'`
- [ ] 31. Save the file (Ctrl+S)

---

## ✅ STEP 7: Install Dependencies (1 minute)

- [ ] 32. Open VS Code Terminal (View → Terminal or Ctrl+`)
- [ ] 33. Run this command:
```powershell
npm install firebase-admin --save-dev
```
- [ ] 34. Wait for installation to complete

---

## ✅ STEP 8: Run Upload Script (1 minute)

- [ ] 35. In terminal, run:
```powershell
node scripts/upload-images.js
```

- [ ] 36. Watch the console output - it will show:
```
🚀 Starting image upload to Firebase Storage...

✅ Uploaded: products/baby-shower/welcome-baby/image1.jpg
   URL: https://storage.googleapis.com/decornest-abc123.appspot.com/products/baby-shower/welcome-baby/image1.jpg

✅ Uploaded: products/baby-shower/welcome-baby/image2.jpg
   URL: https://storage.googleapis.com/decornest-abc123.appspot.com/products/baby-shower/welcome-baby/image2.jpg
...
```

- [ ] 37. **COPY ALL THE URLs** - paste them in a notepad file

---

## ✅ DONE! 🎉

Your images are now uploaded to Firebase Storage!

**Next:** Tell me you're done and I'll help you update your products to use these URLs.

---

## 🚨 Troubleshooting

**Error: "Cannot find module './serviceAccountKey.json'"**
- Check file is named exactly: `serviceAccountKey.json`
- Check it's in the `scripts/` folder
- Check path in upload script is correct

**Error: "Bucket not found"**
- Double-check bucket name in `upload-images.js` line 15
- Make sure you enabled Storage in Firebase Console

**Error: "Permission denied"**
- Make sure you downloaded the correct service account key
- Try generating a new key

**Error: "ENOENT: no such file or directory 'images-to-upload'"**
- Create the `scripts/images-to-upload/baby-shower/welcome-baby/` folders
- Make sure your images are inside

---

**Need help?** Let me know which step you're stuck on!
