# Custom Parameterized Pipe - Simple Example

This project demonstrates a basic custom parameterized pipe in Angular.

## What is a Parameterized Pipe?

A parameterized pipe is a pipe that accepts additional arguments to modify its behavior.

## Example: Discount Pipe

**Pipe Code:**
```typescript
@Pipe({ name: 'discount', standalone: true })
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercent: number): number {
    return price - (price * discountPercent / 100);
  }
}
```

**Usage in Template:**
```html
<p>Original Price: ₹{{ price }}</p>
<p>After 10% Discount: ₹{{ price | discount:10 }}</p>
<p>After 25% Discount: ₹{{ price | discount:25 }}</p>
```

**Output:**
```
Original Price: ₹2000
After 10% Discount: ₹1800
After 25% Discount: ₹1500
```

## How to Run

```bash
npm install
npm start
```

Visit `http://localhost:4200` to see the demo.

## Key Points

- The pipe takes two parameters: `price` and `discountPercent`
- Use `:` to pass parameters to pipes
- Multiple parameters can be passed: `{{ value | pipe:param1:param2 }}`
