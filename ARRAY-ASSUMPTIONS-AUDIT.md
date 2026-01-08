# Array Assumptions Audit

## Search Results for Potentially Risky Patterns

### Patterns Searched:
- `.map(` - Array method calls
- `[...]` - Spread operators
- `Object.entries` / `Object.values` / `Object.keys` - Object iteration
- `.slice(` / `.filter(` / `.forEach(` / `.reduce(` - Array methods

---

## ✅ Safe Patterns (Have Fallbacks)

### 1. Optional Chaining with Fallback Arrays
**Location:** `app/my-pulse/page-new.tsx`

```typescript
// ✅ Safe - Has fallback to empty array
data: (githubData.data?.commits || []).map(commit => ({...}))
data: (openaiData.data?.dailyActivity || []).map(activity => ({...}))
data: (cursorData.data?.dailyActivity || []).map(activity => ({...}))
```

**Status:** ✅ Safe - All have `|| []` fallback

---

### 2. Object.entries with Fallback
**Location:** `hooks/useCursorAnalytics.ts:106`

```typescript
// ✅ Safe - Has fallback to empty object
const dailyActivity = Object.entries(realData.promptsByDay || {}).map(...)
```

**Status:** ✅ Safe - Has `|| {}` fallback

---

## ⚠️ Potentially Risky Patterns

### 1. Spread Operator on QuerySelector Results
**Location:** `utils/scrollUtils.ts:389`

```typescript
const allLazyElements = [...lazyImages, ...iframes];
```

**Context:**
```typescript
const lazyImages = sectionElement.querySelectorAll('img[loading="lazy"]');
const iframes = sectionElement.querySelectorAll('iframe[loading="lazy"]');
```

**Risk:** `querySelectorAll` returns a `NodeList`, which is array-like but not a true array. Spread operator should work, but could fail if `lazyImages` or `iframes` is null/undefined.

**Recommendation:** Add null checks or convert to array:
```typescript
const allLazyElements = [...(lazyImages || []), ...(iframes || [])];
// OR
const allLazyElements = [...Array.from(lazyImages || []), ...Array.from(iframes || [])];
```

---

### 2. Direct Array Method Calls on Potentially Undefined Properties
**Location:** `app/projects/travel-and-ai/projects/[projectId]/TravelProjectDetailClient.tsx`

#### Pattern 1: `identity.interests.map()`
**Line:** 5836
```typescript
{identity.interests.map((interest, tagIndex) => (
```

**Risk:** If `identity.interests` is undefined/null, this will fail.

**Recommendation:**
```typescript
{(identity.interests || []).map((interest, tagIndex) => (
```

#### Pattern 2: Optional Chaining with `.slice().map()`
**Lines:** 6544, 6617, 6652, 6923
```typescript
{project?.research?.insights?.slice(0, 3).map(...)
{project?.overview?.goals?.slice(0, 3).map(...)
{project?.overview?.outcomes?.slice(0, 3).map(...)
```

**Risk:** If `insights`, `goals`, or `outcomes` are undefined, `.slice()` will fail even with optional chaining.

**Recommendation:**
```typescript
{(project?.research?.insights || []).slice(0, 3).map(...)
{(project?.overview?.goals || []).slice(0, 3).map(...)
{(project?.overview?.outcomes || []).slice(0, 3).map(...)
```

#### Pattern 3: Direct Property Access with `.slice().map()`
**Line:** 6717
```typescript
{project.uxDesign.images.slice(0, 3).map(...)
```

**Risk:** No optional chaining - will fail if `project.uxDesign` or `images` is undefined.

**Recommendation:**
```typescript
{(project?.uxDesign?.images || []).slice(0, 3).map(...)
```

---

### 3. Object.entries/values/keys Without Null Checks
**Location:** Multiple files

#### Pattern: Direct Object.entries on Potentially Null Objects
**Files:**
- `hooks/useOpenAIAnalytics.ts:171, 176, 184`
- `components/dashboard/MetricsCard.tsx:55, 88`
- `components/dashboard/MapCard.tsx:69`
- `components/dashboard/ActivityCard.tsx:55, 90`
- `components/dashboard/ProgressCard.tsx:103`

**Example:**
```typescript
{Object.entries(metrics).map(([key, value], index) => (
```

**Risk:** If `metrics` is null/undefined, `Object.entries()` will throw.

**Recommendation:**
```typescript
{Object.entries(metrics || {}).map(([key, value], index) => (
```

---

## 📋 Summary of Risky Patterns Found

### High Risk (No Fallback):
1. ✅ **FIXED:** `StaggerContainer` - `children.map()` (already fixed)
2. ⚠️ `utils/scrollUtils.ts:389` - Spread operator on querySelector results
3. ⚠️ `TravelProjectDetailClient.tsx:5836` - `identity.interests.map()` without fallback
4. ⚠️ `TravelProjectDetailClient.tsx:6717` - `project.uxDesign.images.slice()` without optional chaining
5. ⚠️ Multiple `Object.entries()` calls without null checks

### Medium Risk (Optional Chaining but No Fallback):
1. ⚠️ `TravelProjectDetailClient.tsx:6544, 6617, 6652, 6923` - Optional chaining with `.slice().map()` (slice fails if undefined)

### Low Risk (Have Fallbacks):
1. ✅ `app/my-pulse/page-new.tsx` - All have `|| []` fallbacks
2. ✅ `hooks/useCursorAnalytics.ts:106` - Has `|| {}` fallback

---

## 🔍 Next Steps

1. **Review each risky pattern** to determine if the data is guaranteed to be an array/object
2. **Add fallbacks** where data might be undefined/null
3. **Test edge cases** where data might be missing
4. **Add type guards** where appropriate

---

## Files to Review

1. `utils/scrollUtils.ts` - Spread operator safety
2. `app/projects/travel-and-ai/projects/[projectId]/TravelProjectDetailClient.tsx` - Multiple array assumptions
3. `components/dashboard/MetricsCard.tsx` - Object.entries safety
4. `components/dashboard/MapCard.tsx` - Object.entries safety
5. `components/dashboard/ActivityCard.tsx` - Object.entries safety
6. `components/dashboard/ProgressCard.tsx` - Object.entries safety
