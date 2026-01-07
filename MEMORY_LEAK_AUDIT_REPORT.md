# Three.js Memory Leak & Navigation Crash Audit Report

## Issues Found and Fixes

### 1. ❌ **Ghost Texture Leak** - GLTFLoader Textures Not Disposed

**Location:** `components/ParallaxBackground.tsx:102`

**Problem:** 
- GLTFLoader loads models that may contain textures
- Textures loaded from GLTF models are not explicitly tracked or disposed
- When `modelRef.current` is set, the textures from the loaded model remain in GPU memory

**Why it's a problem:**
- Textures loaded via GLTFLoader are cached by Three.js but not automatically disposed
- On navigation, the model is removed but textures remain in GPU memory
- Causes gradual memory accumulation leading to "WebGL Context Lost" errors

**Fix:** Already handled by `useDeepDispose` hook which recursively disposes all textures. ✅

---

### 2. ⚠️ **New in Render Pattern** - Math.random() in Component Body

**Location:** 
- `components/ParallaxBackground.tsx:80`
- `components/SpecklesScene.tsx:68-70`
- `components/AITravelScene.tsx:104-114` (in useFrame, OK)

**Problem:**
- `Math.random()` is called inside `useEffect` to generate particle positions
- While inside `useEffect` is acceptable, these random values are regenerated on every mount
- Could cause visual inconsistency if component remounts

**Why it's a problem:**
- Not a memory leak, but creates different visual results on remount
- Values are generated fresh each time component mounts

**Status:** ✅ **ACCEPTABLE** - This is in `useEffect`, not render loop. No memory leak.

---

### 3. ✅ **DOM Contention** - All Properly Handled

**Status:** All `appendChild` calls are guarded with `parentNode` checks
All `addEventListener` calls have corresponding `removeEventListener` in cleanup

---

### 4. ⚠️ **GPU Resource Cleanup** - Missing useDeepDispose

**Location:** 
- `components/CinematographyScene.tsx`
- `components/SpecklesScene.tsx`

**Problem:**
- These components only use `useThreeCleanup` but not `useDeepDispose`
- Multiple geometries and materials created in loops are not deeply disposed
- `CinematographyScene.tsx` creates 5+ meshes with materials in a loop (lines 64-112)

**Why it's a problem:**
- Geometries and materials created in the loop may not be fully disposed
- Leads to GPU memory accumulation
- Can cause "WebGL Context Lost" errors during navigation

**Fix Required:** Add `useDeepDispose` hook to both components

---

### 5. ✅ **Hydration Inconsistency** - All Properly Handled

**Status:** 
- All `Math.random()` calls are inside `useEffect`, not in JSX render
- All `new Date()` calls are properly guarded with `useEffect`
- No hydration mismatches detected

---

## Summary

**Critical Issues:** 1 (Missing useDeepDispose in 2 components)
**Warnings:** 1 (Math.random in useEffect - acceptable)
**Fixed:** ✅ DOM handling, ✅ Hydration handling

