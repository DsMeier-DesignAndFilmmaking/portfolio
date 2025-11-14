# Global Layout System Documentation

## Overview

The portfolio site uses a **global layout system** powered by Next.js App Router that ensures the Navbar appears consistently across all pages without manual imports.

---

## Architecture

### 1. **Root Layout** (`app/layout.tsx`)

The root layout is the single source of truth for the entire application structure:

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavigationWrapper />  {/* Global Navbar */}
        <PageTransition>
          <main>{children}</main>  {/* Page content */}
        </PageTransition>
        <Footer />  {/* Global Footer */}
      </body>
    </html>
  );
}
```

**Key Features:**
- ✅ Single import point for global components
- ✅ Automatic inclusion on all pages
- ✅ Consistent layout structure
- ✅ No redundant imports needed

---

### 2. **NavigationWrapper** (`components/NavigationWrapper.tsx`)

A client component that conditionally renders the Navbar:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/projects/');
  
  // Don't render global navbar on project pages (they have their own)
  if (isProjectPage) {
    return null;
  }
  
  return <Navbar />;
}
```

**Why Conditional Rendering?**
- Project pages have custom navigation built-in
- Prevents double navbar flash on project pages
- Maintains performance by avoiding duplicate renders
- Shows global navbar on homepage and My Pulse page

---

### 3. **Navbar Component** (`components/Navbar.tsx`)

The Navbar handles its own behavior based on the current route:

**Smart Route Detection:**
```tsx
const pathname = usePathname();
const isOnProjectPage = pathname?.includes('/projects/') || pathname === '/my-pulse';
```

**Adaptive Styling:**
- **Homepage:** Transparent white navbar that turns black when scrolling over dark sections
- **Project Pages:** White navbar that turns black after scrolling 100px
- **My Pulse Page:** Same behavior as project pages
- **Active States:** Highlights current page in navigation

---

## How It Works

### Automatic Navbar Rendering

**Most pages automatically include the Navbar:**

1. User navigates to a route (e.g., `/`, `/my-pulse`)
2. Next.js renders the root layout
3. `NavigationWrapper` checks the current route
4. **If not a project page:** Renders the `Navbar` component
5. **If a project page:** Returns null (project has its own navbar)
6. Navbar applies appropriate styling based on route
7. Page content renders below

**No manual imports needed for non-project pages!**

**Note:** Project pages (`/projects/*`) have custom navigation bars built directly into their components and are excluded from the global navbar system to prevent double navbar flashing.

---

## Page-Specific Behavior

### Homepage (`/`)
- Navbar starts transparent white
- Turns black when overlapping dark sections (#black-section, #video-projects)
- Returns to white when over light sections
- Smooth transitions between states

### Project Pages (`/projects/*`)
- **Use custom navigation bars** built into each page component
- Global navbar is hidden on these pages to prevent double navbar flash
- Each project has its own "Back" button and navigation style
- Varies by project (some use white, some use dark backgrounds)

### My Pulse (`/my-pulse`)
- Same behavior as project pages
- Active "My Pulse" link highlighted in blue
- Black background with white text when scrolled

---

## Styling System

### Navbar Background States

```tsx
className={`backdrop-blur-md transition-colors duration-500 ${
  isOverBlackSection ? 'bg-black/90' : 'bg-white/90'
}`}
```

**Color Scheme:**
- `bg-white/90` - 90% opacity white with backdrop blur
- `bg-black/90` - 90% opacity black with backdrop blur
- 500ms smooth transitions
- Maintains glass morphism effect

### Text Color States

```tsx
className={`transition-colors duration-500 ${
  isOverBlackSection ? 'text-white' : 'text-black'
}`}
```

**Adaptive Text:**
- White text on black backgrounds
- Black text on white backgrounds
- Blue accent for hover and active states
- Smooth 500ms color transitions

---

## Adding New Pages

### To add a new page to the site:

1. Create your page file (e.g., `app/my-new-page/page.tsx`)
2. **That's it!** The Navbar appears automatically.

**Example:**

```tsx
// app/my-new-page/page.tsx
export default function MyNewPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* pt-16 accounts for fixed navbar height */}
      <h1>My New Page</h1>
      <p>The navbar is already here!</p>
    </div>
  );
}
```

**Important:** Add `pt-16` (padding-top: 4rem) to your page container to prevent content from being hidden behind the fixed navbar.

---

## Customizing Navbar Behavior

### To add a new route with special navbar behavior:

**Edit `components/Navbar.tsx`:**

```tsx
const isOnProjectPage = 
  pathname?.includes('/projects/') || 
  pathname === '/my-pulse' ||
  pathname === '/your-new-route';  // Add your route here
```

**To add homepage-style behavior to a new route:**

Keep the route OUT of `isOnProjectPage` and it will automatically get homepage-style section detection.

---

## Global Styles

### Consistent Padding

All pages should include top padding to account for the fixed navbar:

```css
pt-16    /* 64px - Standard navbar height */
pt-20    /* 80px - If you need extra spacing */
pt-24    /* 96px - For hero sections */
```

### Viewport Height Calculations

When using full-screen sections, account for navbar:

```tsx
<section className="min-h-[calc(100vh-4rem)]">
  {/* Subtract 4rem (64px) for navbar */}
</section>
```

---

## Mobile Behavior

### Mobile Menu

The mobile menu is built into the Navbar component:

- Hamburger icon appears on screens < 768px (md breakpoint)
- Full-screen overlay menu with fade animation
- Closes automatically on navigation
- Maintains same active state highlighting
- Smooth AnimatePresence transitions

### Responsive Breakpoints

```tsx
<div className="hidden md:block">Desktop Nav</div>
<div className="md:hidden">Mobile Menu Button</div>
```

**Breakpoints:**
- `< 768px` - Mobile (hamburger menu)
- `≥ 768px` - Desktop (full navigation links)

---

## Performance Optimizations

### GPU-Accelerated Animations

```tsx
motion.nav - Framer Motion for smooth transitions
backdrop-blur-md - GPU-accelerated blur effect
transition-colors duration-500 - CSS hardware acceleration
```

### Scroll Performance

```tsx
window.addEventListener('scroll', handleScroll, { passive: true });
requestAnimationFrame(updateNavbarColor);
```

- Passive scroll listeners for better performance
- RAF for smooth visual updates
- Debounced color calculations

---

## Future Enhancements

### Potential Additions

1. **NavbarContext** for global state management
   ```tsx
   const NavbarContext = createContext();
   export const useNavbar = () => useContext(NavbarContext);
   ```

2. **Dynamic menu items** from CMS or configuration
3. **Multi-language support** with i18n integration
4. **Theme switcher** integration
5. **Breadcrumb navigation** for deep pages

---

## Troubleshooting

### Issue: Navbar not appearing on a page

**Solution:** Check that the page is inside `app/` directory (App Router). Pages Router (`pages/`) won't work with this system.

### Issue: Navbar has wrong styling on a page

**Solution:** Check the route detection logic in `Navbar.tsx`. Make sure your route is categorized correctly in `isOnProjectPage`.

### Issue: Content hidden behind navbar

**Solution:** Add `pt-16` or higher padding to your page container:
```tsx
<div className="pt-16">{/* Your content */}</div>
```

### Issue: Navbar transition is choppy

**Solution:** Ensure parent elements don't have `overflow: hidden` that prevents backdrop-blur. Use `overflow-x-hidden` if needed.

---

## File Structure

```
app/
├── layout.tsx                  ← Root layout (imports NavigationWrapper)
├── page.tsx                    ← Homepage
├── my-pulse/
│   └── page.tsx               ← My Pulse page
└── projects/
    ├── purdue/page.tsx        ← Project pages
    └── ai-sandbox/page.tsx

components/
├── NavigationWrapper.tsx       ← Global navbar wrapper
├── Navbar.tsx                  ← Main navbar component
├── Footer.tsx                  ← Global footer
└── PageTransition.tsx          ← Page transition wrapper
```

---

## Benefits of This System

✅ **Consistency** - Navbar appears identically on every page
✅ **Maintainability** - Edit once, update everywhere
✅ **Performance** - Single component instance, no redundant renders
✅ **DX** - No need to import Navbar in every page
✅ **Flexibility** - Easy to add route-specific behavior
✅ **Type Safety** - Full TypeScript support
✅ **SEO** - Proper SSR and static generation
✅ **Accessibility** - Consistent navigation landmarks

---

## Testing Checklist

When making changes to the global layout:

- [ ] Test on homepage (scroll behavior with sections)
- [ ] Test on project pages (scroll trigger at 100px)
- [ ] Test on My Pulse page (matching project behavior)
- [ ] Test mobile menu (open/close, navigation)
- [ ] Test active state highlighting
- [ ] Test page transitions
- [ ] Verify no layout shifts on load
- [ ] Check backdrop blur performance
- [ ] Test all breakpoints (320px, 768px, 1440px)
- [ ] Verify fixed positioning doesn't break on iOS Safari

---

## Related Documentation

- [Next.js App Router Layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts)
- [Framer Motion AnimatePresence](https://www.framer.com/motion/animate-presence/)
- [Tailwind CSS Backdrop Blur](https://tailwindcss.com/docs/backdrop-blur)

---

**Last Updated:** October 11, 2025  
**Status:** ✅ Fully Implemented and Production-Ready

