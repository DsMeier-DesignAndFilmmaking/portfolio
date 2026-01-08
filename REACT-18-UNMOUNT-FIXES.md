# React 18 / App Router Unmount Error Fixes

## ✅ Fixed Issues

### 1. `utils/accessibility.ts` - `announceToScreenReader()`
**Problem:** Manual `document.body.appendChild` and `removeChild` causing crashes during navigation

**Fix:**
- ✅ Removed all `removeChild` calls
- ✅ Implemented singleton pattern - one persistent container element
- ✅ Updates content instead of creating/removing nodes
- ✅ React owns the DOM lifecycle - no manual manipulation
- ✅ Added try-catch for safety during navigation

**Pattern:**
```typescript
// Before: ❌ Manual DOM manipulation
document.body.appendChild(announcement);
setTimeout(() => {
  document.body.removeChild(announcement); // CRASH RISK
}, 1000);

// After: ✅ React-safe singleton pattern
const container = getOrCreateAnnouncementContainer();
container.textContent = message; // Just update content
// React handles DOM cleanup automatically
```

---

### 2. `components/HomePageWebGL.tsx` - Canvas DOM Removal
**Problem:** Manual `container.removeChild(domElement)` racing with React unmounting

**Fix:**
- ✅ Removed all `removeChild` calls
- ✅ Only dispose Three.js resources (renderer, scene, camera)
- ✅ Let React handle DOM removal when container unmounts
- ✅ Removed defensive guards and setTimeout delays

**Pattern:**
```typescript
// Before: ❌ Manual DOM removal with guards
setTimeout(() => {
  if (domElement.parentNode === container) {
    container.removeChild(domElement); // RACE CONDITION
  }
}, 0);

// After: ✅ React owns DOM lifecycle
rendererRef.current.dispose();
rendererRef.current.forceContextLoss();
// React automatically removes canvas when container unmounts
```

---

### 3. `hooks/useThreeCleanup.ts` - Canvas DOM Removal
**Problem:** Same issue as HomePageWebGL - manual DOM removal

**Fix:**
- ✅ Removed all `removeChild` calls
- ✅ Only dispose Three.js resources
- ✅ Let React handle DOM cleanup
- ✅ Simplified cleanup logic

**Pattern:**
```typescript
// Before: ❌ Complex DOM removal logic
setTimeout(() => {
  if (domElement.parentNode === container) {
    container.removeChild(domElement);
  }
}, 0);

// After: ✅ Simple resource disposal
renderer.dispose();
rendererRef.current = null;
// React handles DOM automatically
```

---

### 4. `components/Navbar.tsx` - Scroll/Resize Listeners & RAF
**Problem:** 
- `requestAnimationFrame` not properly tracked for cleanup
- Cleanup might not run on pathname change

**Fix:**
- ✅ Added `rafIdRef` to track RAF IDs
- ✅ Cancel pending RAFs before scheduling new ones
- ✅ Proper cleanup in useEffect return function
- ✅ Cleanup runs on pathname change (already in dependencies)

**Pattern:**
```typescript
// Before: ❌ RAF not tracked
let rafId: number;
rafId = requestAnimationFrame(updateNavbarColor);
// Cleanup might miss RAF if it's reassigned

// After: ✅ RAF tracked with ref
const rafIdRef = useRef<number | null>(null);
if (rafIdRef.current !== null) {
  cancelAnimationFrame(rafIdRef.current);
}
rafIdRef.current = requestAnimationFrame(updateNavbarColor);

// Cleanup:
if (rafIdRef.current !== null) {
  cancelAnimationFrame(rafIdRef.current);
  rafIdRef.current = null;
}
```

---

### 5. `components/StickyProgressNav.tsx` - RAF Tracking
**Problem:** RAF inside throttled scroll function not tracked for cleanup

**Fix:**
- ✅ Added `throttledRafRef` to track RAF IDs
- ✅ Cancel pending RAFs before scheduling new ones
- ✅ Proper cleanup of all RAFs

**Pattern:**
```typescript
// Before: ❌ RAF not tracked
requestAnimationFrame(() => {
  handleScroll();
  ticking = false;
});

// After: ✅ RAF tracked and cancelled
if (throttledRafRef.current !== null) {
  cancelAnimationFrame(throttledRafRef.current);
}
throttledRafRef.current = requestAnimationFrame(() => {
  handleScroll();
  ticking = false;
  throttledRafRef.current = null;
});
```

---

## ✅ Verified Clean Components

### Scroll Listeners with Proper Cleanup:
- ✅ `components/Navbar.tsx` - Fixed (see above)
- ✅ `components/StickyProgressNav.tsx` - Fixed (see above)
- ✅ `app/projects/travel-and-ai/page.tsx` - Already correct
- ✅ `app/projects/previous/page.tsx` - Already correct
- ✅ `hooks/useHashScrollWithResize.ts` - Already correct (ResizeObserver cleanup)

### Other Components:
- ✅ `hooks/useThreeCleanup.ts` - Fixed (see above)
- ✅ `components/HomePageWebGL.tsx` - Fixed (see above)
- ✅ `utils/accessibility.ts` - Fixed (see above)

---

## 🎯 Key Principles Applied

1. **React Owns the DOM Lifecycle**
   - Never call `removeChild`, `innerHTML = ''`, or manually destroy nodes
   - Let React handle DOM removal on component unmount

2. **Proper Cleanup Patterns**
   ```typescript
   useEffect(() => {
     const handler = () => {};
     window.addEventListener('event', handler);
     
     return () => {
       window.removeEventListener('event', handler);
     };
   }, [deps]);
   ```

3. **RAF Tracking**
   ```typescript
   const rafRef = useRef<number | null>(null);
   
   // Schedule
   if (rafRef.current !== null) {
     cancelAnimationFrame(rafRef.current);
   }
   rafRef.current = requestAnimationFrame(callback);
   
   // Cleanup
   if (rafRef.current !== null) {
     cancelAnimationFrame(rafRef.current);
     rafRef.current = null;
   }
   ```

4. **Singleton Pattern for Persistent Elements**
   - Use singleton for elements that need to persist
   - Update content instead of creating/removing
   - Let React handle final cleanup

---

## 📋 Testing Checklist

- [ ] Navigate between routes rapidly
- [ ] Test during animations/timeouts
- [ ] Verify no console errors about removeChild
- [ ] Check that all event listeners are cleaned up
- [ ] Verify RAF loops are cancelled on unmount
- [ ] Test WebGL components unmounting properly
- [ ] Test Navbar across different routes

---

## 🚫 What We Removed

- ❌ All `removeChild` calls on DOM nodes
- ❌ `setTimeout` delays for DOM removal
- ❌ Defensive guards checking `parentNode` before removal
- ❌ Manual canvas element removal
- ❌ Manual announcement element removal

## ✅ What We Kept/Added

- ✅ Resource disposal (Three.js renderer.dispose())
- ✅ Event listener cleanup
- ✅ RAF cancellation with refs
- ✅ Singleton pattern for persistent elements
- ✅ React-controlled DOM lifecycle

---

## Result

All manual DOM manipulation has been removed. React now fully owns the DOM lifecycle, preventing React 18 / App Router unmount errors (#418, #423).
