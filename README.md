# Kudos Recognition System - Frontend

A modern Next.js 14 frontend application for peer-to-peer kudos recognition with real-time notifications and beautiful UI.

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)

## Overview

The Kudos Recognition System frontend is a responsive web application that allows team members to give and receive recognition (kudos) from their colleagues. It features real-time notifications, a modern UI with Tailwind CSS, and seamless integration with the Django backend.

## Technology Stack

### Core Technologies

#### Next.js 14.2
**Why Next.js?**
- **React Framework**: Built on top of React with additional features
- **Server-Side Rendering (SSR)**: Faster initial page loads
- **App Router**: Modern routing with layouts and nested routes
- **API Routes**: Built-in API endpoints if needed
- **Automatic Code Splitting**: Faster page loads with optimized bundles
- **TypeScript Support**: First-class TypeScript integration
- **Image Optimization**: Automatic image optimization
- **Production Ready**: Built-in optimizations for production

#### React 18.3
**Why React?**
- **Component-Based**: Reusable UI components
- **Virtual DOM**: Efficient rendering and updates
- **Hooks**: Modern state management with useState, useEffect, useCallback
- **Context API**: Global state management without external libraries
- **Large Ecosystem**: Extensive library and community support
- **Developer Tools**: Excellent debugging and development experience

#### TypeScript 5
**Why TypeScript?**
- **Type Safety**: Catch errors at compile time, not runtime
- **IntelliSense**: Better autocomplete and code navigation
- **Refactoring**: Safer code refactoring with type checking
- **Documentation**: Types serve as inline documentation
- **Scalability**: Essential for large codebases
- **Team Collaboration**: Clearer interfaces and contracts

#### Tailwind CSS 3.4
**Why Tailwind CSS?**
- **Utility-First**: Build designs directly in HTML with utility classes
- **No CSS Files**: No need to write custom CSS
- **Responsive**: Mobile-first responsive design built-in
- **Customizable**: Full theming and configuration control
- **Performance**: Automatically removes unused CSS in production
- **Consistency**: Design system enforced through configuration
- **Fast Development**: Rapid prototyping and iteration

#### shadcn/ui Components
**Why shadcn/ui?**
- **Copy-Paste Components**: Own your components, not a dependency
- **Radix UI Based**: Built on accessible Radix UI primitives
- **Customizable**: Full control over component code
- **Beautiful**: Modern, polished component designs
- **Accessible**: ARIA-compliant and keyboard navigable
- **Consistent**: Cohesive design system
- **TypeScript**: Full TypeScript support

### Supporting Libraries

#### Radix UI Primitives
**Why Radix UI?**
- **Accessibility**: WAI-ARIA compliant components
- **Unstyled**: Complete styling control
- **Composable**: Build complex UIs with primitives
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus trapping and restoration

#### axios 1.7
**Why axios?**
- **HTTP Client**: Promise-based HTTP requests
- **Interceptors**: Request/response interceptors for JWT tokens
- **Error Handling**: Centralized error handling
- **Automatic JSON**: Automatic JSON transformation
- **Request Cancellation**: Cancel requests when needed
- **Browser & Node**: Works in browser and Node.js

#### Pusher JS
**Why Pusher JS?**
- **Real-time Updates**: WebSocket-based real-time communication
- **Instant Notifications**: Receive kudos without page refresh
- **Easy Integration**: Simple API for subscribing to channels
- **Reliable**: Managed service with high uptime
- **Cross-Browser**: Works on all modern browsers

#### react-hot-toast 2.4
**Why react-hot-toast?**
- **Toast Notifications**: Beautiful toast notifications
- **Lightweight**: Small bundle size
- **Customizable**: Full control over appearance
- **Accessible**: Screen reader support
- **Auto-dismiss**: Automatic dismissal with timing control
- **Positioning**: Flexible positioning options

#### lucide-react
**Why lucide-react?**
- **Modern Icons**: Clean, consistent icon set
- **Tree-Shakable**: Only import icons you use
- **TypeScript**: Full TypeScript support
- **Customizable**: Size, color, and stroke width control
- **React Components**: Icons as React components

#### class-variance-authority & clsx
**Why CVA and clsx?**
- **Variant Management**: Easy component variant creation
- **Conditional Classes**: Dynamic class composition
- **Type Safety**: TypeScript support for variants
- **Clean Code**: Organized component styling

#### tailwind-merge
**Why tailwind-merge?**
- **Class Merging**: Intelligent Tailwind class merging
- **Conflict Resolution**: Resolves conflicting utility classes
- **Performance**: Optimized for runtime performance

## Features

- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔐 **Secure Authentication**: JWT token-based authentication
- 🔔 **Real-time Notifications**: Instant kudos updates with Pusher
- ⚡ **Fast Performance**: Optimized with Next.js 14
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🆕 **NEW Badge**: Highlights kudos received within 2 minutes
- 🌍 **Timezone Support**: Displays times in Asia/Kolkata
- ♿ **Accessible**: WCAG compliant with keyboard navigation
- 🎯 **Type Safe**: Full TypeScript coverage
- 🚀 **Production Ready**: Optimized build for deployment

## Installation

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Backend API running on http://localhost:8000

### Step 1: Clone the Repository

```bash
git clone git@github.com:ramp00786/kudos-frontend.git
cd kudos-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

**Dependencies installed:**
- next 14.2.33
- react 18.3.1
- react-dom 18.3.1
- typescript 5
- tailwindcss 3.4.17
- axios 1.7.9
- pusher-js 8.4.0-rc2
- react-hot-toast 2.4.1
- lucide-react 0.469.0
- @radix-ui/react-* (various components)
- class-variance-authority 0.7.1
- clsx 2.1.1
- tailwind-merge 2.6.0

### Step 3: Configure Environment

Create or verify `.env.local` file:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Pusher Configuration for Real-time Updates
NEXT_PUBLIC_PUSHER_KEY=*****************
NEXT_PUBLIC_PUSHER_CLUSTER=ap2
```

### Step 4: Run Development Server

```bash
npm run dev
```

The application will be available at: http://localhost:3000

### Step 5: Build for Production

```bash
npm run build
npm run start
```

## Usage

### Login

1. Navigate to http://localhost:3000
2. Enter credentials from backend demo data:
   - **Username:** jaredbarnes (or any other generated username)
   - **Password:** password123

### Dashboard Features

#### Your Kudos (Sidebar)
- View remaining kudos for the week (0-3)
- See total team members in your organization

#### Give Kudos
1. Click "Give Kudos" button
2. Select a teammate from the list
3. Write a meaningful message (required)
4. Click "Send Kudos"
5. Your remaining kudos count updates automatically

#### Kudos You've Received
- View all kudos you've received
- See sender name, message, and timestamp
- **NEW** badge appears for kudos received within 2 minutes
- Real-time updates when you receive new kudos

#### Kudos You've Sent
- View all kudos you've given to teammates
- See recipient name, message, and timestamp
- Track your recognition activity

### Real-time Notifications

When someone gives you kudos:
1. Toast notification appears immediately
2. New kudo appears at the top of the list
3. **NEW** badge highlights the kudo
4. Badge automatically disappears after 2 minutes

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx               # Login page
│   ├── globals.css            # Global styles
│   └── dashboard/
│       └── page.tsx           # Dashboard page
├── components/
│   ├── ui/                    # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   ├── dialog.tsx
│   │   └── avatar.tsx
│   ├── KudosCard.tsx          # Kudo display component
│   └── GiveKudosModal.tsx     # Modal for giving kudos
├── contexts/
│   └── AuthContext.tsx        # Authentication context
├── hooks/
│   └── usePusher.ts           # Pusher real-time hook
├── lib/
│   ├── api.ts                 # Axios API client
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript type definitions
├── .env.local                 # Environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## Configuration

### Environment Variables

All environment variables must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser:

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# Pusher Real-time
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
```

### Tailwind Configuration

The `tailwind.config.ts` file includes:
- Custom color scheme (primary, secondary, accent)
- Custom animations (fade-in, slide-in)
- Extended spacing and sizing
- Dark mode support (class-based)

### TypeScript Configuration

Configured for:
- Strict type checking
- Path aliases (@/ for src directory)
- JSX support for React
- Incremental compilation

## API Integration

### Authentication Flow

1. **Login**: POST to `/api/auth/login/`
   - Returns access and refresh tokens
   - Tokens stored in localStorage

2. **Automatic Token Refresh**:
   - axios interceptor catches 401 errors
   - Refreshes token using `/api/auth/refresh/`
   - Retries original request with new token

3. **Protected Routes**:
   - AuthContext checks authentication
   - Redirects to login if not authenticated

### API Client (lib/api.ts)

```typescript
// All API calls use axios instance with interceptors
import { login, getCurrentUser, giveKudos, getReceivedKudos } from '@/lib/api';

// Example: Give kudos
const kudo = await giveKudos({
  to_user_id: 5,
  message: "Great work on the presentation!"
});
```

## Component Architecture

### Atomic Design Pattern

**Atoms** (Basic components):
- Button, Input, Label, Avatar

**Molecules** (Composite components):
- Card with Header/Content/Footer
- Form fields with labels

**Organisms** (Complex components):
- KudosCard (displays single kudo)
- GiveKudosModal (modal with form)

**Pages**:
- Login page
- Dashboard page

### State Management

**Local State** (useState):
- Form inputs
- Modal open/close
- Loading states

**Global State** (Context API):
- Authentication (AuthContext)
- User information

**Server State**:
- Kudos data
- User lists
- Fetched with axios, no caching library

## Styling Approach

### Utility-First with Tailwind

```tsx
// Example: Responsive card with hover effect
<Card className="hover:shadow-md transition-shadow duration-200">
  <CardContent className="pt-6">
    <div className="flex items-start space-x-4">
      {/* Component content */}
    </div>
  </CardContent>
</Card>
```

### Component Variants (CVA)

```typescript
// Button variants using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        outline: "border border-gray-300",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
  }
);
```

## Development Tips

### Hot Reload

Next.js supports hot module replacement:
- Save any file to see changes instantly
- No need to refresh the browser

### TypeScript IntelliSense

Use VS Code for best experience:
- Auto-complete for props
- Type checking on save
- Jump to definition (Cmd/Ctrl + Click)

### Debugging

```typescript
// Use React DevTools browser extension
// Add console logs for debugging
console.log('User data:', user);

// Check network requests in browser DevTools
// Verify API responses and errors
```

### Testing API Integration

```bash
# Start backend first
cd backend
python manage.py runserver

# Then start frontend
cd frontend
npm run dev
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_`
- Restart dev server after changing `.env.local`
- Check file is named `.env.local` (not `.env`)

### Real-time Not Working

- Verify Pusher credentials in `.env.local`
- Check browser console for Pusher errors
- Ensure backend is sending Pusher events

## Production Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-api.com/api
NEXT_PUBLIC_PUSHER_KEY=your_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
```

### Other Platforms

1. **Build the application:**
```bash
npm run build
```

2. **Environment variables:**
- Set all `NEXT_PUBLIC_*` variables
- Point `NEXT_PUBLIC_API_URL` to production API

3. **Start production server:**
```bash
npm run start
```

4. **Configure domain and SSL**

## Performance Optimization

### Built-in Next.js Optimizations

- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ Font optimization
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Gzip compression

### Tailwind CSS Optimizations

- ✅ Unused CSS removal (PurgeCSS)
- ✅ Minimal CSS bundle size
- ✅ JIT (Just-In-Time) compilation

### React Optimizations

- ✅ useCallback for event handlers
- ✅ useMemo for expensive computations
- ✅ React.memo for component memoization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- ✅ Semantic HTML elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support
- ✅ Color contrast compliance

## License

This project is part of a coding challenge assignment.

## Support

For issues or questions:
- Check Next.js documentation: https://nextjs.org/docs
- Check React documentation: https://react.dev/
- Review Tailwind CSS documentation: https://tailwindcss.com/docs
- Check shadcn/ui documentation: https://ui.shadcn.com/

---

**Built with ❤️ using Next.js 14 and Tailwind CSS**
