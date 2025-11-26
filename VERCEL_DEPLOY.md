# 🚀 Quick Vercel Deployment Guide

## Your Project Configuration

**Backend API:** `https://ramp00786.pythonanywhere.com/api/`

**Environment Variables Required:**
```
NEXT_PUBLIC_API_URL=https://ramp00786.pythonanywhere.com/api
NEXT_PUBLIC_PUSHER_KEY=164bc069aaa63440b713
NEXT_PUBLIC_PUSHER_CLUSTER=ap2
```

---

## Deploy to Vercel in 5 Minutes

### Step 1: Push to GitHub (Already Done ✅)
Your code is already on GitHub at `ramp00786/kudos-frontend`

### Step 2: Sign Up for Vercel
1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### Step 3: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and select **`kudos-frontend`** repository
3. Click **"Import"**

### Step 4: Configure Build Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Framework Preset:** Next.js ✅ (auto-detected)
- **Root Directory:** `./` ✅
- **Build Command:** `npm run build` ✅
- **Output Directory:** `.next` ✅

### Step 5: Add Environment Variables

Click **"Environment Variables"** and add these **3 variables**:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://ramp00786.pythonanywhere.com/api` |
| `NEXT_PUBLIC_PUSHER_KEY` | `164bc069aaa63440b713` |
| `NEXT_PUBLIC_PUSHER_CLUSTER` | `ap2` |

**Important:** Apply to **Production**, **Preview**, and **Development** environments

### Step 6: Deploy! 🎉
1. Click **"Deploy"**
2. Wait 1-2 minutes while Vercel builds your app
3. You'll get a URL like: `https://kudos-frontend-xyz.vercel.app`

---

## Step 7: Update Backend CORS Settings

Your backend needs to allow requests from Vercel domain.

### On PythonAnywhere:

1. Go to **Files** → Navigate to `/home/ramp00786/kudos-backend/`
2. Edit `.env` file
3. Find the `CORS_ALLOWED_ORIGINS` line
4. Update it to include your Vercel URL:

```env
CORS_ALLOWED_ORIGINS=https://kudos-frontend-xyz.vercel.app,http://localhost:3000
```

**Replace `kudos-frontend-xyz.vercel.app` with your actual Vercel URL!**

5. Save the file
6. Go to **Web** tab
7. Click **"Reload ramp00786.pythonanywhere.com"**

---

## Step 8: Test Your Live App

Visit your Vercel URL and test:

- ✅ Login with demo credentials
- ✅ Give kudos to someone
- ✅ Check if real-time notifications work
- ✅ View received kudos
- ✅ Check star ratings

---

## 🎯 Quick Commands Reference

### Local Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Git Deployment
```bash
# Commit and push changes
git add .
git commit -m "Update features"
git push

# Vercel will auto-deploy! 🚀
```

---

## 🔄 Auto-Deployment

Every time you push to GitHub:
- **Main branch** → Automatic production deployment
- **Other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

---

## 🛠️ Common Issues & Solutions

### Issue: "Environment variables not found"
**Solution:** 
1. Go to Vercel dashboard
2. Settings → Environment Variables
3. Add all 3 variables
4. Redeploy from Deployments tab

### Issue: "API connection failed"
**Solution:**
1. Check CORS settings in PythonAnywhere backend
2. Verify API URL in environment variables
3. Test API directly: `https://ramp00786.pythonanywhere.com/api/`

### Issue: "Build failed"
**Solution:**
1. Check build logs in Vercel dashboard
2. Test build locally: `npm run build`
3. Fix errors and push again

### Issue: "Real-time notifications not working"
**Solution:**
1. Verify Pusher credentials in environment variables
2. Check Pusher dashboard for connection issues
3. Verify backend is sending Pusher events

---

## 📊 After Deployment

### Get Your Vercel URL
After deployment completes, Vercel gives you:
- **Production URL:** `https://kudos-frontend-xyz.vercel.app`
- **Deployment URL:** `https://kudos-frontend-git-main-xyz.vercel.app`

### Share Your App
You can share the production URL with your team immediately!

### Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your custom domain (e.g., `kudos.yourcompany.com`)
3. Update DNS records as instructed
4. Update backend CORS with new domain

---

## 🔐 Security Checklist

- ✅ Environment variables are set in Vercel (not in code)
- ✅ `.env.local` is in `.gitignore`
- ✅ CORS is properly configured in backend
- ✅ HTTPS is enabled automatically by Vercel
- ✅ API credentials are secure

---

## 📈 Monitor Your App

### Vercel Dashboard Shows:
- Build status and logs
- Deployment history
- Performance metrics
- Error tracking
- Bandwidth usage

### Access Analytics:
1. Go to your project in Vercel
2. Click "Analytics" tab
3. View real-time usage and performance

---

## 🎉 You're Live!

Your Kudos app is now deployed and accessible worldwide!

**What's Next?**
- Share the URL with your team
- Monitor usage in Vercel dashboard
- Add more features and push to GitHub
- Vercel will auto-deploy updates! 🚀

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Support:** https://vercel.com/support

---

**Happy Deploying! 🚀**
