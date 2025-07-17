# SceneSwap

a collaborative film and TV recommendation platform for groups.

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
└── app/
    ├── page.tsx          # Main page composition
    ├── layout.tsx        # Root layout
    └── globals.css       # Global styles and animations
```


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


## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

