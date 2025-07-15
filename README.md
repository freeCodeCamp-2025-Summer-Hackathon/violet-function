# SceneSwap Landing Page

A highly dynamic, sleek, and modern landing page for SceneSwap - a collaborative film and TV recommendation platform for groups.

## 🚀 Features

- **Modular Component Architecture** - Each section is a separate, reusable component
- **Dynamic Animations** - Powered by Framer Motion for smooth, engaging interactions
- **Spline Integration** - 3D interactive scenes (with placeholder fallback)
- **Responsive Design** - Works perfectly on all devices
- **Modern UI Libraries** - Built with Radix UI, Lucide React, and Tailwind CSS
- **Interactive Elements** - Hover effects, loading states, and micro-interactions

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI primitives
- **Spline** - 3D interactive scenes

## 📁 Component Structure

```
src/
├── components/
│   ├── Navigation.tsx      # Fixed navigation with mobile menu
│   ├── Hero.tsx           # Main hero section with Spline integration
│   ├── Features.tsx       # Interactive feature cards
│   ├── HowItWorks.tsx     # Step-by-step process with animations
│   ├── CTA.tsx           # Call-to-action with testimonials
│   ├── Footer.tsx        # Comprehensive footer with links
│   ├── SplineScene.tsx   # Reusable Spline component wrapper
│   └── SplinePlaceholder.tsx # Animated placeholder for Spline
└── app/
    ├── page.tsx          # Main page composition
    ├── layout.tsx        # Root layout
    └── globals.css       # Global styles and animations
```

## 🎨 Customization Guide

### Adding Your Spline Scene

1. Create a scene in [Spline](https://spline.design/)
2. Export and get your scene URL
3. Update the `splineSceneUrl` in `Hero.tsx`:

```tsx
const splineSceneUrl = "https://prod.spline.design/your-scene-url/scene.splinecode";
```

### Customizing Components

Each component is self-contained and can be easily modified:

#### Navigation
- Update navigation items in `Navigation.tsx`
- Modify mobile menu behavior
- Customize branding and colors

#### Hero Section
- Change headline and description
- Update call-to-action buttons
- Modify stats and metrics
- Replace Spline scene or placeholder

#### Features
- Add/remove feature cards
- Customize icons and colors
- Modify animations and timing

#### How It Works
- Update step content and descriptions
- Modify step icons and colors
- Adjust animation timing

#### CTA Section
- Update testimonials
- Modify call-to-action text
- Change background effects

#### Footer
- Update links and social media
- Modify company information
- Customize layout and styling

### Styling Customization

The design uses a consistent color scheme:

```css
/* Primary Colors */
--purple-500: #8b5cf6
--pink-500: #ec4899

/* Background */
--slate-900: #0f172a
--purple-900: #581c87
```

### Animation Customization

All animations use Framer Motion. You can customize:

- **Duration**: `transition={{ duration: 0.8 }}`
- **Delay**: `transition={{ delay: 0.2 }}`
- **Easing**: `transition={{ ease: "easeInOut" }}`

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

The landing page is fully responsive with breakpoints:

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🎯 Performance Optimizations

- **Lazy Loading**: Components load as needed
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Animation Performance**: Hardware-accelerated transforms

## 🔧 Development Tips

### Adding New Components

1. Create component in `src/components/`
2. Import and use in `page.tsx`
3. Add animations with Framer Motion
4. Test responsiveness

### Debugging Animations

Use Framer Motion's dev tools:
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
  // Add this for debugging
  layoutId="debug"
/>
```

### Customizing Spline Integration

The `SplineScene` component provides:
- Loading states
- Error handling
- Fallback options
- Custom styling

## 🎨 Design System

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable fonts
- **Icons**: Lucide React icons

### Colors
- **Primary**: Purple to Pink gradients
- **Background**: Dark slate with purple accents
- **Text**: White with opacity variations

### Spacing
- **Section Padding**: `py-20 px-4 sm:px-6 lg:px-8`
- **Component Spacing**: `gap-8` for grids, `mb-6` for text

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Built with ❤️ for SceneSwap - Making movie nights collaborative and fun!
