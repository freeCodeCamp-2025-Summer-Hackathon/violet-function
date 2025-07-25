# SceneSwap

a collaborative film and TV recommendation platform for groups.

## 🛠️ Tech Stack

- **Next.js 15** – React framework with App Router
- **TypeScript** – Type-safe modern development
- **Tailwind CSS** – Utility-first styling
- **Framer Motion** – Smooth, modern animations
- **Lucide React** – Elegant icon library
- **Radix UI** – Accessible and composable UI primitives
- **Spline** – Interactive 3D scene support
- **TMDb / IMDb API** – For fetching movie & TV data

## 📁 Component Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with global styling
│   ├── page.tsx           # Landing page
│   └── globals.css        # Custom styles and Tailwind config
├── components/
│   ├── Navigation.tsx     # Responsive navigation bar
│   ├── Hero.tsx           # Hero section with Spline animation
│   ├── Features.tsx       # Feature highlights with motion effects
│   ├── HowItWorks.tsx     # Step-by-step guide section
│   ├── CTA.tsx            # Call-to-action + testimonials
│   ├── Footer.tsx         # Footer with links & info
│   ├── MovieCard.tsx      # Reusable movie/TV show card
│   ├── MovieRow.tsx       # Horizontal scrollable row of cards
│   ├── MovieModal.tsx     # Detailed pop-up for media items
│   ├── Searchbar.tsx      # Search input with filters
├── movies/
│   └── page.tsx           # Movies page with categories and search
├── tv/
│   └── page.tsx           # TV shows page with similar layout
├── types/
│   └── index.ts           # Type definitions (Movie, Genre, etc.)
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


# ✨ Features Implemented
## 🔍 Media Browsing (Movies & TV)
- Horizontal scrollable rows for each genre (Popular, Trending, Top Rated, Anime, etc.)
- Separate pages for Movies and TV Shows
- Dynamic rendering via IMDb or TMDb API

## 🎨 Hover-Activated UI
- Styled Play and Watchlist buttons shown only on hover
- Buttons have:
  - Transparent background
  - White border and text for Watchlist
  - Purple border for Play, turning purple on hover

## 🔎 Search Bar
- Placed below the navigation bar
- Fully transparent background with:
  - White border
  - Purple border on focus
- Responsive & mobile-friendly

## 📺 TV Show Support
- Separate layout and rendering logic for TV shows
- Can fetch from multiple genres (not just Breaking Bad)
- Shares design consistency with Movie cards

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

