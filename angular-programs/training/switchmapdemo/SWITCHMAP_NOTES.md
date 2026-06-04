# SwitchMap Operator - Implementation Notes

## What is SwitchMap?

`switchMap` is a RxJS operator that **switches** to a new Observable whenever a new value arrives, **automatically unsubscribing from the previous Observable**. This prevents memory leaks and ensures only the latest request completes.

## Why Use SwitchMap?

### Problem Scenario:
When users type quickly in a search box, multiple API calls are triggered. Without `switchMap`:
- All requests complete, even outdated ones
- Results from old searches can arrive after newer ones
- Wastes bandwidth and processing power
- Can display wrong/outdated results

### Solution with SwitchMap:
- **Cancels previous requests** when a new one starts
- Only the **most recent request** completes
- Ensures results always match the current input
- Saves resources and prevents race conditions

## Implementation in This Demo

### 1. Core Setup
```typescript
private searchSubject = new Subject<string>();

constructor() {
  this.searchSubject.pipe(
    tap(() => this.isLoading.set(true)),
    debounceTime(300),           // Wait 300ms after typing stops
    distinctUntilChanged(),      // Only emit if value changed
    switchMap(query => this.getResults(query))  // Switch to new request
  ).subscribe(results => {
    this.searchResults.set(results);
    this.isLoading.set(false);
  });
}
```

### 2. Key Operators Used

| Operator | Purpose | Effect |
|----------|---------|--------|
| `debounceTime(300)` | Waits 300ms after user stops typing | Reduces API calls |
| `distinctUntilChanged()` | Ignores duplicate consecutive values | Prevents unnecessary calls |
| `switchMap()` | Cancels old requests, switches to new | Ensures only latest completes |
| `tap()` | Side effects (like showing loader) | Updates UI state |

### 3. The Fake API
```typescript
private getResults(query: string): Observable<string[]> {
  return new Observable<string[]>(observer => {
    const timeout = setTimeout(() => {
      // Filter and return results after 1 second
      observer.next(filteredResults);
      observer.complete();
    }, 1000);
    
    // Cleanup function - called when switchMap cancels
    return () => {
      clearTimeout(timeout);
      console.log(`API call cancelled for query: "${query}"`);
    };
  });
}
```

### 4. Input Handler
```typescript
onSearchInput(query: string): void {
  this.searchQuery = query;
  this.searchSubject.next(query);  // Emit to the pipeline
}
```

## How to Test SwitchMap Behavior

### Test 1: Quick Typing
1. Type `a` → `an` → `ang` → `angular` quickly
2. **Expected Result**: Only "angular" returns results
3. **Console Shows**: First 3 requests cancelled

### Test 2: Slow Typing
1. Type `react`
2. Wait 2+ seconds
3. Type `node`
4. **Expected Result**: Both complete (first finished before second started)

### Test 3: Race Condition Prevention
1. Type `j` (slow response)
2. Immediately type `angular` (new search)
3. **Expected Result**: Only "angular" results show (never "j" results)

## Common Use Cases for SwitchMap

1. **Search/Autocomplete** - This demo
2. **Type-ahead suggestions**
3. **Form field validation** (check username availability)
4. **Navigation** - Cancel previous route data loads
5. **Infinite scroll** - Load next page, cancel if user scrolls further

## When NOT to Use SwitchMap

❌ **Don't use for:**
- **Saving data** (POST/PUT requests) - Use `concatMap` or `exhaustMap`
- **Actions that must complete** - Canceling could lose data
- **Independent requests** - Use `mergeMap` if all should complete

✅ **Use for:**
- **GET requests** where only latest matters
- **Search/filter operations**
- **Any operation that becomes obsolete when new input arrives**

## Key Takeaways

1. **SwitchMap = Cancel Previous, Subscribe to New**
2. **Perfect for search** - Only latest query matters
3. **Prevents race conditions** - Results always match current input
4. **Saves resources** - Cancels unnecessary requests
5. **Combine with debounce** - Best practice for user input

## Related Operators Comparison

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `switchMap` | Cancel previous, use latest | Search, autocomplete |
| `mergeMap` | Keep all, run in parallel | Independent requests |
| `concatMap` | Queue all, run in order | Sequential operations |
| `exhaustMap` | Ignore new while running | Prevent duplicate saves |

## Try It Yourself

1. Open browser console (F12)
2. Type quickly: `a`, `an`, `ang`, `angular`
3. Observe:
   - "API called for..." messages
   - "API call cancelled..." messages
   - Only final query completes

## Questions to Consider

1. What happens if we remove `switchMap` and use `mergeMap` instead?
2. Why combine `debounceTime` with `switchMap`?
3. How does the cleanup function (return in Observable) work?
4. When would `exhaustMap` be better than `switchMap`?

---

**Demo Application**: http://localhost:4200/  
**Console Logs**: Essential for understanding the cancellation behavior
