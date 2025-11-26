# Vercel Deployment Guide

## Prerequisites
- Vercel account (free tier works perfectly)
- GitHub repository with frontend code

## Step-by-Step Deployment

### 1. Sign Up / Login to Vercel
- Go to https://vercel.com
- Sign up with GitHub account (recommended)

### 2. Import Project
- Click "Add New..." → "Project"
- Import your frontend repository: `kudos-frontend`
- Vercel will auto-detect Next.js configuration

### 3. Configure Project

**Framework Preset:** Next.js (auto-detected)

**Root Directory:** `./` (leave as is)

**Build Command:** `npm run build` (auto-filled)

**Output Directory:** `.next` (auto-filled)

**Install Command:** `npm install` (auto-filled)

### 4. Add Environment Variables

Before deploying, add these environment variables:

Click "Environment Variables" section and add:

```
NEXT_PUBLIC_API_URL=https://ramp00786.pythonanywhere.com/api
NEXT_PUBLIC_PUSHER_KEY=b1bb59e57e8c1fc6ccf0
NEXT_PUBLIC_PUSHER_CLUSTER=ap2
```

### 5. Deploy
- Click "Deploy"
- Wait 1-2 minutes for build to complete
- You'll get a URL like: `https://kudos-frontend-xyz.vercel.app`

### 6. Update Backend CORS Settings

After deployment, update your PythonAnywhere backend:

1. Open bash console on PythonAnywhere
2. Edit .env file:
```bash
cd ~/kudos-backend
nano .env
```

3. Update CORS_ALLOWED_ORIGINS:
```
CORS_ALLOWED_ORIGINS=https://kudos-frontend-xyz.vercel.app,https://your-custom-domain.vercel.app
```

4. Save (Ctrl+X, Y, Enter)

5. Reload web app in PythonAnywhere Web tab

### 7. Test Application
- Visit your Vercel URL: `https://kudos-frontend-xyz.vercel.app`
- Login with demo credentials
- Give and receive kudos
- Check real-time notifications work

## Custom Domain (Optional)

### Add Custom Domain
1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `kudos.yourdomain.com`)
4. Update DNS records as instructed by Vercel
5. Update backend CORS settings with new domain

## Environment Variables Management

### View/Edit Variables
1. Go to project Settings → "Environment Variables"
2. Add, edit, or delete variables
3. **Important:** After changing variables, redeploy:
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Multiple Environments
You can set different values for:
- **Production:** Main branch deployments
- **Preview:** Pull request deployments  
- **Development:** Local development

## Automatic Deployments

Vercel automatically deploys when you:
- **Push to main branch** → Production deployment
- **Create pull request** → Preview deployment
- **Push to other branches** → Branch deployment

### Disable Auto-Deploy (if needed)
1. Settings → Git
2. Uncheck "Production Branch"
3. Deploy manually from Vercel dashboard

## Build & Development Settings

### Build Command
```bash
npm run build
```

### Development Command (local)
```bash
npm run dev
```

### Environment Variables in Code
Access in components:
```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
```

**Note:** Only variables starting with `NEXT_PUBLIC_` are accessible in browser!

## Deployment Logs

### View Build Logs
1. Go to "Deployments" tab
2. Click on a deployment
3. View "Building" logs for errors

### View Function Logs
1. Click "Functions" tab in deployment
2. View runtime logs and errors

## Performance Optimization

Vercel automatically optimizes:
- ✅ Image optimization (Next.js Image component)
- ✅ Code splitting and lazy loading
- ✅ CDN caching for static assets
- ✅ Gzip/Brotli compression
- ✅ HTTP/2 support

## Update Deployment

When you push code changes to GitHub:
1. Vercel automatically detects the push
2. Starts new build
3. Runs tests (if configured)
4. Deploys to production
5. Updates live URL

Manual redeploy:
1. Go to "Deployments" tab
2. Click "..." on any deployment
3. Click "Redeploy"

## Rollback

If deployment has issues:
1. Go to "Deployments" tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"
4. Instant rollback!

## Troubleshooting

### Build Fails

**Check build logs:**
- Deployments → Click failed deployment → View logs
- Common issues:
  - TypeScript errors
  - Missing dependencies
  - Environment variable issues

**Solution:**
```bash
# Test build locally first
npm run build

# Fix errors, commit, push
git add .
git commit -m "Fix build errors"
git push
```

### Environment Variables Not Working

**Checklist:**
- ✅ Variables start with `NEXT_PUBLIC_`
- ✅ Variables added in Vercel dashboard
- ✅ Redeployed after adding variables
- ✅ No typos in variable names

### API Connection Failed

**Check:**
1. NEXT_PUBLIC_API_URL is correct
2. Backend CORS includes Vercel domain
3. Backend is running on PythonAnywhere
4. API endpoint is accessible (test in browser)

### Real-time Not Working

**Check:**
1. NEXT_PUBLIC_PUSHER_KEY is correct
2. NEXT_PUBLIC_PUSHER_CLUSTER is correct
3. Pusher app is active
4. Backend is sending Pusher events

### 404 on Page Refresh

This shouldn't happen with Next.js, but if it does:
- Vercel automatically handles Next.js routing
- Check `vercel.json` if you added custom config

## Analytics (Optional)

Enable Vercel Analytics:
1. Settings → Analytics
2. Enable "Web Analytics"
3. Get insights on:
   - Page views
   - Performance metrics
   - User interactions

## Preview Deployments

Every pull request gets a unique preview URL:
- Test changes before merging
- Share with team for review
- Automatic cleanup after merge

## Cost

**Free Tier Includes:**
- Unlimited personal projects
- 100GB bandwidth/month
- 100 builds/day
- Auto SSL certificates
- Global CDN

**Hobby Tier:** $0/month (free)
**Pro Tier:** $20/month (for teams)

## Security

Vercel provides:
- ✅ Automatic SSL/TLS certificates
- ✅ DDoS protection
- ✅ Secure environment variables
- ✅ Edge network security

## Important Notes

1. **Environment Variables:**
   - Always use `NEXT_PUBLIC_` prefix for client-side variables
   - Server-side variables (API routes) don't need prefix
   - Never expose secrets in client-side variables

2. **Deployment Speed:**
   - Typically 1-2 minutes
   - Instant rollback available
   - Zero-downtime deployments

3. **Custom Domain:**
   - Free SSL certificate
   - Automatic renewal
   - DNS configuration help

4. **Git Integration:**
   - Push to main = Production deploy
   - Pull request = Preview deploy
   - Delete branch = Delete preview

5. **Monorepo Support:**
   - If your repo has both frontend and backend
   - Configure "Root Directory" in settings

## Post-Deployment Checklist

- ✅ Application loads correctly
- ✅ Login works with backend API
- ✅ Can give and receive kudos
- ✅ Real-time notifications work
- ✅ Star ratings display correctly
- ✅ All pages navigate properly
- ✅ Mobile responsive
- ✅ Backend CORS updated with Vercel domain

## Support Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Community Forum: https://github.com/vercel/vercel/discussions
