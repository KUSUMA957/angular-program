# 🧠 Custom Parameterized Pipes - Practice Exercises

## Exercise 1: Tax Calculator Pipe

Create a `TaxPipe` that calculates tax on a given amount.

**Requirements:**
- Takes amount and tax percentage as parameters
- Should handle different tax rates (5%, 10%, 18%, etc.)
- Return the tax amount (not the total)

**Example Usage:**
```html
{{ 1000 | tax:18 }}  <!-- Should output: 180 -->
{{ 500 | tax:5 }}    <!-- Should output: 25 -->
```

**Starter Code:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tax',
  standalone: true
})
export class TaxPipe implements PipeTransform {
  transform(amount: number, taxPercent: number): number {
    // Your implementation here
    return 0;
  }
}
```

---

## Exercise 2: Temperature Converter Pipe

Create a `TemperaturePipe` that converts between Celsius, Fahrenheit, and Kelvin.

**Requirements:**
- Takes temperature value, input unit, and output unit
- Support conversions between: 'C', 'F', 'K'
- Return formatted string with unit

**Example Usage:**
```html
{{ 25 | temperature:'C':'F' }}  <!-- Should output: "77°F" -->
{{ 100 | temperature:'C':'K' }} <!-- Should output: "373K" -->
{{ 32 | temperature:'F':'C' }}  <!-- Should output: "0°C" -->
```

**Starter Code:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, fromUnit: string, toUnit: string): string {
    // Your implementation here
    // Hint: Convert to Celsius first, then to target unit
    return '';
  }
}
```

---

## Exercise 3: Word Limiter Pipe

Create a `WordLimitPipe` that limits text to a specified number of words and adds ellipsis.

**Requirements:**
- Takes text and word limit as parameters
- Truncate text if it exceeds the limit
- Add "..." if text was truncated
- Optional parameter for custom suffix

**Example Usage:**
```html
{{ longText | wordLimit:5 }}           <!-- Limit to 5 words with "..." -->
{{ longText | wordLimit:3:'...' }}     <!-- Custom suffix -->
{{ longText | wordLimit:10:'[more]' }} <!-- Custom suffix -->
```

**Starter Code:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordLimit',
  standalone: true
})
export class WordLimitPipe implements PipeTransform {
  transform(text: string, limit: number, suffix: string = '...'): string {
    // Your implementation here
    return '';
  }
}
```

---

## Exercise 4: File Size Formatter Pipe

Create a `FileSizePipe` that formats bytes into human-readable sizes.

**Requirements:**
- Takes size in bytes and optional precision
- Convert to appropriate unit (B, KB, MB, GB, TB)
- Return formatted string with unit

**Example Usage:**
```html
{{ 1024 | fileSize }}        <!-- Should output: "1 KB" -->
{{ 1536 | fileSize:2 }}      <!-- Should output: "1.50 KB" -->
{{ 1048576 | fileSize }}     <!-- Should output: "1 MB" -->
```

**Starter Code:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
  standalone: true
})
export class FileSizePipe implements PipeTransform {
  transform(bytes: number, precision: number = 0): string {
    // Your implementation here
    // Units: B, KB, MB, GB, TB
    return '';
  }
}
```

---

## Exercise 5: Time Ago Pipe

Create a `TimeAgoPipe` that shows relative time (like "2 hours ago").

**Requirements:**
- Takes a date and optional format parameter
- Return relative time string
- Support different formats: 'short', 'long'

**Example Usage:**
```html
{{ pastDate | timeAgo }}         <!-- "2 hours ago" -->
{{ pastDate | timeAgo:'short' }} <!-- "2h ago" -->
{{ pastDate | timeAgo:'long' }}  <!-- "2 hours and 30 minutes ago" -->
```

**Starter Code:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: Date, format: string = 'normal'): string {
    // Your implementation here
    return '';
  }
}
```

---

## 🎯 Bonus Challenge: Chain Multiple Custom Pipes

Create a component that demonstrates chaining multiple custom pipes:

```html
<!-- Example: Apply discount, then add tax, then format currency -->
{{ price | discount:10 | tax:18 | currency:'INR':'symbol':'1.2-2' }}

<!-- Example: Limit words, then convert to uppercase -->
{{ description | wordLimit:5 | uppercase }}

<!-- Example: Convert temperature and format with precision -->
{{ temperature | temperature:'C':'F' | number:'1.1-1' }}
```

---

## 📝 Testing Your Pipes

Don't forget to write unit tests for your pipes! Here's a template:

```typescript
import { YourPipe } from './your-pipe.pipe';

describe('YourPipe', () => {
  let pipe: YourPipe;

  beforeEach(() => {
    pipe = new YourPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform value correctly', () => {
    expect(pipe.transform(/* test values */)).toBe(/* expected result */);
  });

  // Add more test cases
});
```

---

## 🏆 Solutions

Once you complete the exercises, check your solutions against the provided implementations in the `solutions/` folder.

Happy coding! 🚀
