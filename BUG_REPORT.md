# Bug Report & Audit

## Critical Issues Found

### 1. **Non-unique Keys in ProblemItem Component** ❌
**File**: `src/components/ProblemItem.tsx` (Line 40)
```tsx
{problem.topics.map((topic) => (
  <span key={topic} className="...">  // BUG: topic used as key
```
**Problem**: Using topic name as key is problematic because:
- Same topic name appears in multiple problems
- Keys must be unique within the list
- Can cause rendering/state bugs if same problem appears twice with same topic
- React will warn about duplicate keys

**Fix**: Use index as fallback or create unique key with problem.id
```tsx
{problem.topics.map((topic, idx) => (
  <span key={`${problem.id}-${topic}-${idx}`} className="...">
```

### 2. **Tailwind Class Doesn't Exist** ❌
**File**: `src/components/ProblemItem.tsx` (Line 18)
```tsx
isSolved ? 'bg-zinc-850 border-zinc-700' : 'hover:shadow-md'
```
**Problem**: `bg-zinc-850` is NOT a valid Tailwind color class
- Tailwind only has: zinc-50, 100, 200, ..., 800, 900
- No 850 shade exists
- This class will be silently ignored

**Fix**: Use `bg-zinc-800` instead
```tsx
isSolved ? 'bg-zinc-800 border-zinc-700' : 'hover:shadow-md'
```

---

## Potential Issues

### 3. **No Error Boundary for Crashed Components** ⚠️
**File**: `src/App.tsx`
**Problem**: If any component crashes, entire app fails
**Impact**: Low - components are simple, but best practice

**Recommendation**: Add React Error Boundary

### 4. **localStorage JSON Parse Error Not Handled** ⚠️
**File**: `src/hooks/useLocalStorage.ts` (Line 6)
```tsx
const stored = localStorage.getItem(key);
return stored ? JSON.parse(stored) : initialValue; // Could throw
```
**Problem**: If corrupted data exists in localStorage, `JSON.parse()` throws
**Impact**: Low - rare, but would crash app on reload

**Fix**: Add try-catch
```tsx
try {
  return stored ? JSON.parse(stored) : initialValue;
} catch {
  return initialValue;
}
```

### 5. **No Validation of Problem Data** ⚠️
**File**: `src/App.tsx` (Line 25)
```tsx
.then((data) => setProblems(data))
```
**Problem**: No validation that data matches Problem interface
- Missing fields could cause runtime errors
- Invalid difficulty values won't error until rendered

**Recommendation**: Add validation/type-checking

### 6. **Title Updated But Not Semantic** ⚠️
**File**: `index.html` (Line 6)
```html
<title>lc-progress-tracker</title>
```
**Problem**: Should be descriptive for users/SEO

**Fix**: Use `<title>LeetCode Progress Tracker</title>`

### 7. **No Favicon** ⚠️
**File**: `index.html` (Line 4)
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```
**Problem**: favicon.svg doesn't exist (404 error in console)
**Impact**: Minor - cosmetic

### 8. **Potential Filter State Inconsistency** ⚠️
**File**: `src/App.tsx`
**Problem**: Filters maintain state even if they have no matching data
**Impact**: Minor - can be confusing UX but works correctly

---

## Code Quality Issues (Non-Bugs)

### 9. **helpers.ts is Empty** 
**File**: `src/utils/helpers.ts`
**Status**: Not a bug, just unused
**Recommendation**: Remove or implement if needed

### 10. **Console Error Logging Could Be Better** 
**File**: `src/App.tsx` (Line 26)
```tsx
.catch((err) => console.error('Error loading problems:', err));
```
**Recommendation**: Show error UI to user, not just console

---

## Good Practices ✅
- Proper TypeScript types throughout
- Good use of useMemo for performance
- Proper useEffect dependency arrays
- Good component separation
- Accessible HTML structure
- Proper focus ring styles on inputs

---

## Summary
- **1 Critical Bug**: Non-unique React keys in ProblemItem
- **1 Critical Bug**: Invalid Tailwind class (bg-zinc-850)
- **3 Medium Issues**: Error handling gaps
- **2 Low Issues**: UX/cosmetic improvements
- **Overall Status**: 90% - Mostly solid, but needs 2 quick fixes
