# CareSpace Enterprise Frontend - Complete Package

## 🚀 Quick Start Guide

This is a complete, ready-to-use frontend package for CareSpace Enterprise. All dependencies and data are included.

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)

### Automatic Installation (Windows)

1. **Double-click** `setup.bat`
2. Wait for installation to complete (2-3 minutes)
3. Run `npm run dev` to start the application

### Manual Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 What's Included

- ✅ Complete React + TypeScript frontend
- ✅ Vite build system
- ✅ Tailwind CSS v4 styling
- ✅ All UI components
- ✅ Complete product database (seeded data included)
- ✅ Category management
- ✅ Responsive design
- ✅ All images and assets

## 🗄️ Database Data

This package includes all seeded data from the backend:

- **10 Categories**: Hospital Beds, Air Mattress, Oxygen Concentrator, CPAP, BiPAP, Ventilator, Patient Monitor, DVT Pump, Syringe Pump, Suction Machine
- **40+ Products**: Complete product information with:
  - Product names and descriptions
  - Pricing (1 month, 2 months, 3 months)
  - Specifications
  - Categories
  - Images

All data is available in: `src/data/seeded_products.ts`

## 🎨 Tech Stack

- **React 18.3.1** - UI Framework
- **TypeScript 5.4** - Type Safety
- **Vite 6.3.5** - Build Tool
- **Tailwind CSS 4** - Styling
- **React Router 7** - Routing
- **Axios** - HTTP Client
- **Lucide React** - Icons
- **Motion** - Animations

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.tsx         # Main app component
│   ├── data/
│   │   └── seeded_products.ts  # Complete database data
│   ├── services/
│   │   └── api.ts          # API configuration
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript types
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.ts          # Vite configuration
└── tsconfig.json           # TypeScript configuration
```

## 🌐 Available Scripts

### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:5173`

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview Production
```bash
npm run preview
```
Preview the production build locally

## 🔧 Port Configuration

Default port: `5173`

To change the port, edit `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000  // Change to your preferred port
  }
})
```

## 📱 Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Product catalog with filtering
- ✅ Category browsing
- ✅ Product details pages
- ✅ Search functionality
- ✅ Contact/Enquiry forms
- ✅ WhatsApp integration
- ✅ Modern UI with glassmorphism effects

## 🎯 Production Deployment

After running `npm run build`, deploy the `dist/` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

## 🐛 Troubleshooting

### Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 5173 (Windows)
npx kill-port 5173
```

## 📄 License

This project is part of CareSpace Enterprise.

## 🆘 Support

For issues or questions, contact the CareSpace Enterprise team.

---

**Version:** 1.0.0  
**Last Updated:** February 5, 2026  
**Package Type:** Complete Standalone Frontend with Seeded Data
