# NYC Rentals Platform Deployment Guide

This document outlines the deployment process for the NYC Rentals Platform using Vercel.

## Prerequisites

- GitHub repository with the application code
- Vercel account (can be created at https://vercel.com)
- Supabase project with credentials

## Deployment Steps

### 1. Connect GitHub Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import the GitHub repository: `rirachii/nyc-rentals-app`
4. Configure the project settings:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

### 2. Configure Environment Variables

Add the following environment variables in the Vercel project settings:

```
NEXT_PUBLIC_SUPABASE_URL=https://otlefskeqtkaiutalyhv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90bGVmc2tlcXRrYWl1dGFseWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMTc1NTcsImV4cCI6MjA1Nzc5MzU1N30.nRjdfkt2FLJe915K4OKumrh0Eww2ajERcwDov-i1kB0
NEXT_PUBLIC_IMGPROXY_URL=https://imgproxy.example.com
```

### 3. Deploy the Application

1. Click "Deploy" to start the deployment process
2. Vercel will automatically build and deploy the application
3. Once complete, you'll receive a URL for your deployed application (e.g., `nyc-rentals-app.vercel.app`)

### 4. Set Up Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository:

- New commits to the main branch will trigger automatic deployments
- Pull requests will generate preview deployments
- You can configure additional deployment settings in the Vercel dashboard

### 5. Custom Domain Setup (Optional)

To add a custom domain:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain (e.g., `nycrentals.com`)
4. Follow the DNS configuration instructions provided by Vercel

### 6. Post-Deployment Verification

After deployment, verify the following:

- User authentication works correctly
- Property listings are displayed properly
- Search and filtering functionality works
- Admin dashboard is accessible and functional
- Image uploads and optimization are working
- Forms submit data correctly to Supabase

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the Vercel dashboard
2. Verify environment variables are set correctly
3. Ensure Supabase permissions are configured properly
4. Check for any CORS issues with Supabase or Imgproxy

## Monitoring and Analytics

Vercel provides built-in analytics and monitoring:

- Real-time performance metrics
- Error tracking
- Usage statistics
- Deployment history

Access these features from your project dashboard in Vercel.

## Scaling Considerations

As your platform grows:

- Consider upgrading your Vercel plan for additional resources
- Monitor Supabase usage and upgrade if necessary
- Implement caching strategies for frequently accessed data
- Optimize image delivery further with a dedicated CDN if needed
