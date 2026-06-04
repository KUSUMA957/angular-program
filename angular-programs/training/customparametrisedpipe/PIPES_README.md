# Custom Parameterized Pipes in Angular

This project demonstrates how to create and use custom parameterized pipes in Angular. It includes comprehensive examples showing different types of pipes with various parameter configurations.

## 🚀 Quick Start

```bash
npm install
npm start
```

Visit `http://localhost:4200` to see the demo in action.

## 📂 Project Structure

```
src/app/
├── pipes/
│   ├── discount.pipe.ts              # Basic discount pipe
│   ├── discount-with-currency.pipe.ts # Multi-parameter discount pipe
│   ├── grade.pipe.ts                 # Grade formatting pipe
│   └── result.pipe.ts                # Result formatting pipe
├── components/
│   ├── product.component.ts          # Product pricing demo
│   ├── student.component.ts          # Student grading demo
│   └── pipes-demo.component.ts       # Comprehensive demo
└── app.ts                           # Main app component
```

## 🔧 Pipes Included

### 1. DiscountPipe
**Purpose:** Apply percentage discount to prices

```typescript
@Pipe({ name: 'discount', standalone: true })
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercent: number): number {
    return price - (price * discountPercent / 100);
  }
}
```

**Usage:**
```html
{{ 2000 | discount:10 }}  <!-- Output: 1800 -->
{{ 2000 | discount:25 }}  <!-- Output: 1500 -->
```

### 2. DiscountWithCurrencyPipe
**Purpose:** Apply discount and format with currency

```typescript
@Pipe({ name: 'discountWithCurrency', standalone: true })
export class DiscountWithCurrencyPipe implements PipeTransform {
  transform(price: number, discount: number, currency: string = 'INR'): string {
    const result = price - (price * discount / 100);
    return \`\${result} \${currency}\`;
  }
}
```

**Usage:**
```html
{{ 2000 | discountWithCurrency:10:'USD' }}  <!-- Output: 1800 USD -->
{{ 2000 | discountWithCurrency:15:'EUR' }}  <!-- Output: 1700 EUR -->
```

### 3. GradePipe
**Purpose:** Convert marks to grades with different formats

```typescript
@Pipe({ name: 'grade', standalone: true })
export class GradePipe implements PipeTransform {
  transform(marks: number, gradeType: string = 'letter'): string {
    // Returns letter grades (A, B, C) or word grades (Excellent, Good, etc.)
  }
}
```

**Usage:**
```html
{{ 85 | grade:'letter' }}  <!-- Output: 85 - A -->
{{ 85 | grade:'word' }}    <!-- Output: 85 - Very Good -->
```

### 4. ResultPipe
**Purpose:** Format exam results in different ways

```typescript
@Pipe({ name: 'result', standalone: true })
export class ResultPipe implements PipeTransform {
  transform(marks: number, total: number, format: string = 'percentage'): string {
    // Returns percentage, fraction, or grade format
  }
}
```

**Usage:**
```html
{{ 85 | result:100:'percentage' }}  <!-- Output: 85/100 (85.0%) -->
{{ 85 | result:100:'fraction' }}    <!-- Output: 85/100 -->
{{ 85 | result:100:'grade' }}       <!-- Output: 85/100 - A -->
```

## 💡 Key Concepts

### Passing Multiple Parameters
```html
{{ value | myPipe:param1:param2:param3 }}
```

### Parameter Types
- **Numbers:** `{{ price | discount:10 }}`
- **Strings:** `{{ price | discount:10:'USD' }}`
- **Booleans:** `{{ value | format:true }}`
- **Objects:** `{{ data | transform:config }}`

### Default Parameters
```typescript
transform(value: any, param1: string = 'default', param2: number = 0) {
  // Implementation
}
```

## 🎯 Use Cases

1. **E-commerce:** Price calculations with discounts and currency formatting
2. **Education:** Grade calculations and result formatting
3. **Data Display:** Custom formatting for different data types
4. **Internationalization:** Locale-specific formatting

## ✅ Benefits

- **Reusability:** Same pipe, different behaviors
- **Maintainability:** Logic centralized in pipes
- **Performance:** Pure pipes are cached by Angular
- **Clean Templates:** Complex logic moved to pipes
- **Flexibility:** Multiple parameters for different use cases

## 🔍 Advanced Examples

### Chaining Pipes with Parameters
```html
{{ price | discount:10 | currency:'USD':'symbol':'1.2-2' }}
```

### Conditional Parameters
```html
{{ marks | grade:(isAdvanced ? 'letter' : 'word') }}
```

### Dynamic Parameters
```html
{{ price | discount:discountRate | discountWithCurrency:taxRate:selectedCurrency }}
```

## 🧪 Testing Your Pipes

```typescript
describe('DiscountPipe', () => {
  let pipe: DiscountPipe;

  beforeEach(() => {
    pipe = new DiscountPipe();
  });

  it('should apply 10% discount correctly', () => {
    expect(pipe.transform(100, 10)).toBe(90);
  });
});
```

## 📚 Learn More

- [Angular Pipes Documentation](https://angular.io/guide/pipes)
- [Creating Custom Pipes](https://angular.io/guide/pipes-custom-data-trans)
- [Pipe Testing](https://angular.io/guide/testing-pipes)

## 🤝 Contributing

Feel free to add more pipe examples or improve existing ones. Some ideas:

- **TaxPipe:** Calculate tax with different rates
- **FormatPipe:** Format data based on type
- **ValidatorPipe:** Validate and format data
- **CalculatorPipe:** Perform complex calculations

## 📄 License

This project is for educational purposes. Feel free to use and modify as needed.
