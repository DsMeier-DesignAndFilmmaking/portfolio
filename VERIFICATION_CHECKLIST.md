# WebGL Navigation Fix - Verification Checklist

## Expected Console Log Pattern

### ✅ Correct Behavior (After Fix)

```
[SafeCanvas] FIRST MOUNT - initializing singleton renderer { pathname: '/', ... }
[SafeCanvas] ✅ singleton renderer initialized (should only see this ONCE per session)
[WebGLSceneManager] rendering scenes { pathname: '/', isEnabled: true }
[ParallaxBackground] updating scene { enabled: true, modelPath: 'torus' }
[PageTransition] route changed { from: '/', to: '/projects/example' }
[ParallaxBackground] cleanup (renderer persists) { enabled: false, ... }
[SafeCanvas] component unmounted (renderer persists as singleton)
[SafeCanvas] component mounted - reusing existing singleton renderer { pathname: '/projects/example', ... }
[PageTransition] route changed { from: '/projects/example', to: '/' }
[SafeCanvas] component unmounted (renderer persists as singleton)
[SafeCanvas] component mounted - reusing existing singleton renderer { pathname: '/', ... }
[ParallaxBackground] updating scene { enabled: true, modelPath: 'torus' }
```

### ❌ Bug Indicators (Before Fix)

```
[SafeCanvas] FIRST MOUNT - initializing singleton renderer
[SafeCanvas] FIRST MOUNT - initializing singleton renderer  // ⛔ BUG: Appears twice = renderer being recreated
THREE.WebGLRenderer: Context Lost  // ⛔ BUG: Context loss during navigation
```

## Manual Verification Steps

### 1. Canvas Count Check
Open browser console and run:
```javascript
// Should return 1-2 canvases MAX (one for each scene that's enabled)
console.log('Canvas count:', document.querySelectorAll('canvas').length);
// Navigate routes and verify count stays stable (doesn't grow)
```

### 2. SafeCanvas Mount Check
```javascript
// Should only see "[SafeCanvas] FIRST MOUNT" ONCE when app loads
// All subsequent route changes should show "reusing existing singleton renderer"
```

### 3. Context Loss Check
```javascript
// Monitor for context loss errors
window.addEventListener('webglcontextlost', (e) => {
  console.error('❌ WebGL Context Lost!', e);
});
window.addEventListener('webglcontextrestored', (e) => {
  console.warn('⚠️ WebGL Context Restored', e);
});
```

### 4. Route Navigation Test
1. Load homepage `/` - should see `[SafeCanvas] FIRST MOUNT` once
2. Navigate to `/projects/*` - should see `reusing existing singleton renderer`
3. Navigate back to `/` - should see `reusing existing singleton renderer` again
4. **CRITICAL**: If you see `[SafeCanvas] FIRST MOUNT` again, the bug still exists

## ✅ Final Sanity Checklist

- [ ] **Only ONE `<canvas>` in DOM** per active scene
  - Check: `document.querySelectorAll('canvas').length` stays ≤ 2 (homepage has 2 scenes)
  - Navigate routes and verify count doesn't grow

- [ ] **SafeCanvas mounts once per session**
  - Check: `[SafeCanvas] FIRST MOUNT` appears exactly ONCE on first page load
  - Check: All subsequent route changes show `reusing existing singleton renderer`
  - ⛔ If `[SafeCanvas] FIRST MOUNT` appears again → bug still exists

- [ ] **Renderer is never disposed on route change**
  - Check: No `renderer.dispose()` calls in cleanup functions
  - Check: No `renderer.forceContextLoss()` calls
  - Check: Cleanup logs show `(renderer persists)`

- [ ] **Scene updates are state-driven**
  - Check: `[ParallaxBackground] updating scene` logs show `enabled` prop changes
  - Check: No conditional rendering (`{isProjectPage && <Scene />}`)
  - Check: Scenes stay mounted, only content updates

- [ ] **No WebGL logic in PageTransition**
  - Check: PageTransition.tsx only handles route change logging
  - Check: No renderer creation/disposal in PageTransition
  - Check: PageTransition only triggers disposal callbacks (which don't dispose renderers)

## Performance Checks

### Memory Leaks
- Open Chrome DevTools → Memory tab
- Take heap snapshot before navigation
- Navigate routes multiple times
- Take heap snapshot after navigation
- Verify WebGL-related memory doesn't grow unbounded

### Context Loss Detection
```javascript
// Add to browser console to monitor context state
const checkContext = () => {
  const canvases = document.querySelectorAll('canvas');
  canvases.forEach((canvas, i) => {
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    if (gl && gl.isContextLost()) {
      console.error(`❌ Canvas ${i} context lost!`);
    } else {
      console.log(`✅ Canvas ${i} context healthy`);
    }
  });
};
setInterval(checkContext, 2000);
```

## Test Scenarios

1. **Homepage → Project Page → Homepage**
   - ✅ Should reuse renderer on all route changes
   - ✅ No black screen
   - ✅ No context loss errors

2. **Multiple Rapid Navigation**
   - Navigate quickly between routes
   - ✅ Canvas count stays stable
   - ✅ No context loss
   - ✅ Console shows renderer reuse pattern

3. **Browser Refresh**
   - Refresh on project page
   - ✅ Page loads correctly
   - ✅ SafeCanvas initializes once
   - ✅ Scenes render properly

4. **Direct URL Access**
   - Navigate directly to `/projects/example`
   - ✅ Page loads correctly
   - ✅ No missing scenes or errors
   - ✅ Navigation back to `/` works
