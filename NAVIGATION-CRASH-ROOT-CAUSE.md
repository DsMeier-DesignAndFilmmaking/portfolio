# Navigation Crash Root Cause Analysis

## 🔴 CRITICAL ISSUES - Direct DOM Manipulation

### 1. `utils/accessibility.ts` - `announceToScreenReader()`
**Location:** Lines 115-130

**Problem:**
```typescript
document.body.appendChild(announcement);
setTimeout(() => {
  document.body.removeChild(announcement); // ⚠️ CRASH RISK
}, 1000);
```

**Issue:**
- Element may already be removed by React during route transition
- No check if element still exists before `removeChild`
- No check if element is still a child of `document.body`
- Race condition: React unmounts during navigation while timeout is pending

**Fix Required:**
- Check `announcement.parentNode === document.body` before removal
- Wrap in try-catch
- Use ref to track if component is still mounted

---

### 2. `components/HomePageWebGL.tsx` - Canvas DOM Removal
**Location:** Lines 103-122

**Problem:**
```typescript
setTimeout(() => {
  try {
    if (domElement.parentNode === container && container.contains(domElement)) {
      container.removeChild(domElement); // ⚠️ RACE CONDITION
    }
  } catch (error) {
    // Silently ignore
  }
}, 0);
```

**Issue:**
- Even with guards, React may remove the container during fast navigation
- `setTimeout(0)` doesn't guarantee React reconciliation is complete
- Multiple cleanup calls can race (route change + useEffect cleanup)

**Fix Required:**
- Use `requestAnimationFrame` instead of `setTimeout`
- Add component mount check before DOM manipulation
- Consider letting React handle DOM removal entirely

---

### 3. `hooks/useThreeCleanup.ts` - Canvas DOM Removal
**Location:** Lines 170-180

**Problem:**
```typescript
setTimeout(() => {
  try {
    if (domElement.parentNode === container && container.contains(domElement)) {
      container.removeChild(domElement); // ⚠️ SAME ISSUE
    }
  } catch (error) {
    // Silently ignore
  }
}, 0);
```

**Issue:**
- Same race condition as HomePageWebGL
- Used by multiple components, amplifying the risk

---

### 4. `utils/darkMode.ts` - Meta Theme Color
**Location:** Lines 103-115

**Problem:**
```typescript
let metaThemeColor = document.querySelector('meta[name="theme-color"]');
if (!metaThemeColor) {
  metaThemeColor = document.createElement('meta');
  metaThemeColor.setAttribute('name', 'theme-color');
  document.head.appendChild(metaThemeColor); // ⚠️ PERSISTS ACROSS ROUTES
}
```

**Issue:**
- Element is appended to `document.head` but never removed
- Accumulates across route changes (though querySelector prevents duplicates)
- No cleanup on unmount

**Fix Required:**
- Track if element was created by this instance
- Clean up on component unmount (if used in component context)

---

## 🟡 HIGH RISK - Global Components with Event Listeners

### 5. `components/Navbar.tsx` - Scroll/Resize Listeners
**Location:** Lines 235-246

**Problem:**
- Component persists across routes (via `NavigationWrapper` in layout)
- Has scroll and resize event listeners
- Uses `requestAnimationFrame` loop
- Cleanup depends on `isMountedRef.current` but may not run if component doesn't unmount

**Issue:**
- If Navbar doesn't unmount between routes, old listeners may persist
- `requestAnimationFrame` may continue running after route change
- Multiple instances could stack listeners

**Fix Required:**
- Ensure cleanup runs on pathname change, not just unmount
- Add pathname to useEffect dependencies
- Cancel all RAFs on route change

---

### 6. `components/NavigationWrapper.tsx` - Conditional Rendering
**Location:** Lines 15-58

**Problem:**
- Conditionally renders Navbar based on pathname
- Navbar may unmount/remount on route changes
- Race condition: Navbar cleanup may run while new Navbar is mounting

**Issue:**
- Fast navigation can cause cleanup to run after new instance mounts
- State updates in cleanup may affect new instance

---

### 7. `hooks/useHashScrollWithResize.ts` - ResizeObserver on document.body
**Location:** Lines 35-41

**Problem:**
```typescript
roRef.current = new ResizeObserver(() => {
  scrollToHash();
});
roRef.current.observe(document.body); // ⚠️ OBSERVES ENTIRE BODY
```

**Issue:**
- Observes entire `document.body` which persists across routes
- ResizeObserver may fire during route transitions
- No cleanup if hook is used in component that doesn't unmount

**Fix Required:**
- Ensure cleanup runs on route change
- Consider observing specific elements instead of entire body

---

## 🟠 MEDIUM RISK - Animation Loops & Scroll Listeners

### 8. `components/StickyProgressNav.tsx` - Scroll Listener
**Location:** Lines 75-87

**Issue:**
- Scroll listener with cleanup
- Uses `requestAnimationFrame` internally
- Should be safe if component unmounts properly

**Verify:**
- Ensure component unmounts on route change
- Check if used in global layout

---

### 9. Multiple Project Pages - Scroll Listeners
**Files:**
- `app/projects/travel-and-ai/page.tsx` (line 91)
- `app/projects/previous/page.tsx` (line 49)
- `app/projects/travel-and-ai/projects/[projectId]/TravelProjectDetailClient.tsx` (line 462)

**Issue:**
- Each page has scroll listeners
- Should clean up on unmount, but verify cleanup functions are correct

---

## 🔵 LOW RISK - PageTransition & Framer Motion

### 10. `components/PageTransition.tsx` - Framer Motion
**Location:** Lines 38-60

**Issue:**
- Uses `AnimatePresence` with `mode="sync"`
- Framer Motion may manipulate DOM during transitions
- Could conflict with manual DOM removals

**Note:**
- Framer Motion generally handles cleanup well
- May be contributing factor if combined with manual DOM manipulation

---

## 📋 SUMMARY OF ROOT CAUSES

### Primary Root Cause:
**`utils/accessibility.ts` - `announceToScreenReader()`** is the most likely culprit:
1. Direct `document.body.appendChild/removeChild` without guards
2. No component mount check
3. Timeout-based cleanup races with React unmounting
4. Called from multiple places, increasing crash probability

### Secondary Root Causes:
1. **WebGL canvas removal** - Manual DOM removal races with React
2. **Navbar scroll listeners** - Global component may not clean up properly on route change
3. **ResizeObserver on document.body** - Observes global element that persists

### Contributing Factors:
- Fast route transitions
- Multiple cleanup paths (route change + useEffect cleanup)
- Global components that persist across routes
- Manual DOM manipulation instead of letting React handle it

---

## 🎯 RECOMMENDED FIX PRIORITY

1. **IMMEDIATE:** Fix `announceToScreenReader()` in `utils/accessibility.ts`
2. **HIGH:** Add mount checks to WebGL canvas removal
3. **HIGH:** Ensure Navbar cleanup runs on pathname change
4. **MEDIUM:** Review ResizeObserver usage in `useHashScrollWithResize`
5. **MEDIUM:** Audit all scroll listeners for proper cleanup

---

## 🔍 VERIFICATION CHECKLIST

- [ ] Search for all `document.body.appendChild` calls
- [ ] Search for all `document.body.removeChild` calls
- [ ] Verify all `useEffect` hooks have cleanup functions
- [ ] Check all global components (layout.tsx) for event listeners
- [ ] Verify all `requestAnimationFrame` loops are cancelled
- [ ] Check all `addEventListener` calls have matching `removeEventListener`
- [ ] Test fast navigation between routes
- [ ] Test navigation during animations/timeouts
