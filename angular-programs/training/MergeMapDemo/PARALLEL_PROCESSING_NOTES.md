# Parallel Processing in MergeMapDemo

## Overview
This project demonstrates how `mergeMap` operator in RxJS enables parallel processing of multiple asynchronous operations.

## What's Happening in Parallel?

When you click the "Place Orders" button, **all 4 API calls execute simultaneously** (in parallel).

### Execution Flow:

1. **Order IDs Emission**: Four order IDs `[101, 102, 103, 104]` are emitted from the source observable

2. **Parallel API Calls**: The `mergeMap` operator immediately initiates **all 4 API calls at once** without waiting for any to complete:
   - Order 101 → API call (random delay 500-2000ms)
   - Order 102 → API call (random delay 500-2000ms)
   - Order 103 → API call (random delay 500-2000ms)
   - Order 104 → API call (random delay 500-2000ms)

3. **Out-of-Order Results**: Orders appear on screen **as soon as each API call completes**, not in sequential order. For example, Order 103 might finish before Order 101.

## Key Characteristics:

✅ **All requests start at roughly the same time** (parallel execution)

✅ **Results arrive in unpredictable order** based on which API call finishes first

✅ **Total processing time ≈ slowest single request** (not the sum of all requests)

✅ **Each API call is independent** and doesn't block others

## Code Location:

- **Service**: `src/app/order.service.ts` - Simulates API calls with random delays
- **Component**: `src/app/app.ts` - Uses `mergeMap` to process orders in parallel
- **Observable Pipeline**:
  ```typescript
  from(orderIds)
    .pipe(
      mergeMap(orderId => this.orderService.getOrderDetails(orderId))
    )
  ```

## Why This Matters:

`mergeMap` provides maximum throughput for scenarios where:
- You need to process multiple independent operations
- Order of completion doesn't matter
- You want results as soon as they're available
- You need optimal performance for batch processing

## Comparison with Other Operators:

| Operator | Behavior | Use Case |
|----------|----------|----------|
| `mergeMap` | **Parallel execution**, results in completion order | Maximum throughput, independent operations |
| `concatMap` | **Sequential execution**, maintains order | When order matters or need to prevent overload |
| `switchMap` | **Cancels previous**, only latest completes | Search/autocomplete, user input scenarios |
| `exhaustMap` | **Ignores new**, completes current first | Prevent duplicate form submissions |

## Try It Out:

1. Run the application: `npm start`
2. Click "Place Orders" button
3. Watch the orders appear in different order each time
4. Notice the total time is much less than processing sequentially would take

## Expected Behavior:

- **Sequential processing** would take: 500-2000ms × 4 = 2000-8000ms total
- **Parallel processing** takes: Max(500-2000ms) = 500-2000ms total
- **Speed improvement**: Up to 4x faster!

---

*This demo is designed to illustrate RxJS reactive programming patterns and the power of parallel asynchronous operations.*
