# 🛒 Order Processing System - RxJS mergeMap Demo

A complete Angular application demonstrating the power of RxJS `mergeMap` operator for parallel order processing in an e-commerce system.

## 🎯 Problem Statement

Build an Order Processing System where:
- Multiple order IDs `[101, 102, 103, 104]` are generated when "Place Orders" is clicked
- Each order ID triggers an API call to fetch order details
- All API calls run **in parallel** (not sequentially)
- Results display **as soon as they arrive** (not waiting for all to complete)
- **No requests are cancelled** (unlike `switchMap`)

## ⚡ Why mergeMap?

The `mergeMap` operator is perfect for this scenario because:

| Feature | mergeMap | switchMap | concatMap |
|---------|----------|-----------|-----------|
| Parallel Execution | ✅ Yes | ❌ No (cancels previous) | ❌ No (sequential) |
| Maintains All Requests | ✅ Yes | ❌ No (cancels) | ✅ Yes |
| Order of Results | As they complete | Latest only | Sequential |
| Use Case | Parallel API calls | Search/Autocomplete | Ordered operations |

## 🚀 Features

- ✅ **Parallel Processing**: All 4 orders are processed simultaneously
- ✅ **Real-time Updates**: Orders appear as soon as they're processed
- ✅ **Progress Tracking**: Shows processing status (e.g., "Processed 2/4 orders")
- ✅ **Simulated API Delays**: Each order takes 500-2000ms to simulate real API calls
- ✅ **Beautiful UI**: Modern, responsive design with animations
- ✅ **Order Details**: Shows product name, quantity, price, and timestamp

## 📁 Project Structure

```
src/app/
├── app.ts              # Main component with mergeMap logic
├── app.html            # Template with order display
├── app.css             # Styling
└── order.service.ts    # Service simulating API calls
```

## 🔥 Key Implementation

### The mergeMap Magic

```typescript
from(orderIds)
  .pipe(
    mergeMap(orderId => this.orderService.getOrderDetails(orderId))
  )
  .subscribe({
    next: (order) => {
      // Add order as soon as it arrives
      this.orders.update(orders => [...orders, order]);
    },
    complete: () => {
      console.log('All orders processed!');
    }
  });
```

### How It Works

1. **from(orderIds)** - Converts array `[101, 102, 103, 104]` to Observable
2. **mergeMap(...)** - For each ID, calls API in parallel
3. **subscribe(...)** - Receives results as they complete

## 🛠️ Development

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v20+)

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm start
```

Navigate to `http://localhost:4200/` to see the app.

### Build for Production
```bash
npm run build
```

## 📊 Expected Behavior

1. Click **"Place Orders"** button
2. All 4 orders start processing in parallel
3. Orders appear one-by-one as they complete (random order due to different delays)
4. Status updates show progress: "Processed 2/4 orders"
5. Final status: "All orders processed successfully! ✓"

## 🎨 UI Components

- **Header**: Title and description
- **Action Buttons**: "Place Orders" and "Clear Orders"
- **Status Bar**: Real-time processing status
- **Info Card**: Explains why mergeMap is used
- **Order Cards**: Display processed orders with details
- **Empty State**: Shown when no orders are processed

## 📚 Learning Points

### mergeMap vs Other Operators

**Use mergeMap when:**
- Multiple independent operations need to run in parallel
- All operations should complete (don't cancel)
- Order of completion doesn't matter

**Use switchMap when:**
- Only latest result matters (e.g., search autocomplete)
- Previous operations should be cancelled

**Use concatMap when:**
- Operations must complete in order
- Sequential execution is required

## 🔍 Code Highlights

### Service with Simulated Delay
```typescript
getOrderDetails(orderId: number): Observable<Order> {
  const randomDelay = Math.floor(Math.random() * 1500) + 500;
  return of(order).pipe(delay(randomDelay));
}
```

### Reactive State Management
```typescript
orders = signal<Order[]>([]);
isProcessing = signal(false);
processingStatus = signal('');
```

## 🎯 Real-World Applications

This pattern is useful for:
- Processing multiple file uploads
- Parallel API calls for different data
- Batch operations on multiple items
- Real-time data aggregation
- Concurrent database queries

## 📝 License

This project is for educational purposes demonstrating RxJS operators in Angular.

## 🤝 Contributing

Feel free to fork, modify, and use this project as a learning resource!

---

Built with ❤️ using Angular 20 and RxJS