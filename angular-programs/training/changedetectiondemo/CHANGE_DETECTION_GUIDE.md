# Angular Change Detection Strategies Guide

## What is Change Detection?

Change detection is the mechanism Angular uses to keep the view (HTML) synchronized with the component state (TypeScript data). When data changes in your component, Angular needs to know when and how to update the DOM.

---

## Three Approaches to Change Detection

### 1. **Default Change Detection Strategy**

#### How It Works:
- Angular checks **ALL components** in the application on every browser event
- Uses Zone.js to automatically detect events (clicks, keyboard input, timers, HTTP requests, etc.)
- Runs change detection from the root component down through the entire component tree
- Very easy to use - just modify properties and Angular handles the rest

#### Pros:
✅ Simple and straightforward - no special handling required  
✅ Works automatically without any configuration  
✅ Great for small to medium applications  

#### Cons:
❌ Inefficient for large applications - checks everything on every event  
❌ Can cause performance issues with many components  
❌ Wastes CPU cycles checking components that haven't changed  

#### When to Use:
- Small applications
- Prototyping and development
- When performance is not a critical concern

#### Code Example:
```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.Default, // This is the default
  template: `
    <input [(ngModel)]="text" />
    <p>{{ text.toUpperCase() }}</p>
  `
})
export class ExampleComponent {
  text = '';
}
```

---

### 2. **OnPush Change Detection Strategy**

#### How It Works:
- Angular **skips** checking this component unless:
  - An `@Input()` property reference changes
  - An event fires **within the component** (click, input, etc.)
  - An Observable emits a new value (via async pipe)
  - You manually trigger change detection with `ChangeDetectorRef`
- Much more efficient - only checks when necessary
- Requires more careful programming

#### Pros:
✅ Significant performance improvement over Default  
✅ Reduces unnecessary change detection cycles  
✅ Forces better coding practices (immutability)  
✅ Scales well for large applications  

#### Cons:
❌ More complex to implement correctly  
❌ Requires understanding of reference vs value changes  
❌ Can lead to bugs if not used properly (view not updating)  
❌ Need to manually trigger detection in some cases  

#### When to Use:
- Large applications with many components
- Performance-critical components
- Components that render frequently (lists, tables)
- When you want fine-grained control

#### Code Example:
```typescript
@Component({
  selector: 'app-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input [(ngModel)]="text" (ngModelChange)="onTextChange()" />
    <p>{{ uppercaseText }}</p>
  `
})
export class ExampleComponent {
  text = '';
  uppercaseText = '';

  constructor(private cdr: ChangeDetectorRef) {}

  onTextChange(): void {
    this.uppercaseText = this.text.toUpperCase();
    this.cdr.detectChanges(); // Manually trigger detection
  }
}
```

---

### 3. **Signals (Modern Angular 16+)**

#### How It Works:
- Uses **fine-grained reactivity** - tracks exactly which data affects which parts of the view
- Automatically updates only the specific DOM elements that depend on changed data
- No need to check the entire component
- Works through `signal()` and `computed()` APIs
- Angular automatically tracks dependencies

#### Pros:
✅ Best performance - only updates what actually changed  
✅ Simpler than OnPush - no manual change detection management  
✅ Automatic dependency tracking  
✅ More predictable and easier to reason about  
✅ Works great with reactive programming patterns  
✅ The future direction of Angular  

#### Cons:
❌ Requires Angular 16+ (16 for basics, 17+ for full features)  
❌ Different mental model from traditional Angular  
❌ May need to refactor existing code  

#### When to Use:
- **All new Angular applications** (Angular 16+)
- When you want the best performance without complexity
- Reactive programming patterns
- Any scenario where Default or OnPush would work

#### Code Example:
```typescript
@Component({
  selector: 'app-example',
  template: `
    <input [value]="text()" (input)="onInput($event)" />
    <p>{{ uppercaseText() }}</p>
    <p>Characters: {{ charCount() }}</p>
  `
})
export class ExampleComponent {
  text = signal('');
  
  // Automatically recomputes when text() changes
  uppercaseText = computed(() => this.text().toUpperCase());
  charCount = computed(() => this.text().length);

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.text.set(input.value); // Updates the signal
  }
}
```

---

## Performance Comparison

| Strategy | Check Frequency | Performance | Complexity | Best For |
|----------|----------------|-------------|------------|----------|
| **Default** | Every event everywhere | ⭐ Slowest | ⭐ Easiest | Small apps, prototyping |
| **OnPush** | Only when triggered | ⭐⭐ Fast | ⭐⭐⭐ Complex | Large apps, optimization |
| **Signals** | Only changed values | ⭐⭐⭐ Fastest | ⭐⭐ Moderate | Modern apps (Angular 16+) |

---

## Key Concepts to Remember

### Immutability with OnPush
When using OnPush, you must create **new object references** for Angular to detect changes:

```typescript
// ❌ BAD - mutating object (OnPush won't detect)
this.user.name = 'John';

// ✅ GOOD - creating new reference
this.user = { ...this.user, name: 'John' };
```

### Signal Updates
Signals provide methods to update values:

```typescript
const count = signal(0);

count.set(5);           // Set to specific value
count.update(n => n + 1); // Update based on current value
```

### Computed Signals
Computed signals automatically track dependencies:

```typescript
const firstName = signal('John');
const lastName = signal('Doe');

// Automatically updates when either signal changes
const fullName = computed(() => `${firstName()} ${lastName()}`);
```

---

## Best Practices

1. **Start with Signals** if using Angular 16+
2. **Use OnPush** for optimization in older Angular versions
3. **Avoid Default** in production apps with many components
4. **Keep components small** - easier to optimize
5. **Use async pipe** with Observables - it handles subscriptions and change detection
6. **Profile your app** - use Chrome DevTools to identify performance bottlenecks

---

## Migration Path

```
Legacy App → Default Strategy
     ↓
Add OnPush to performance-critical components
     ↓
Upgrade to Angular 16+
     ↓
Gradually migrate to Signals
     ↓
Modern, performant Angular app
```

---

## Common Pitfalls

### Default Strategy
- **Problem**: Checking components that never change
- **Solution**: Use OnPush or Signals for static components

### OnPush Strategy
- **Problem**: View not updating after data changes
- **Solution**: Ensure you're creating new object references or manually triggering detection

### Signals
- **Problem**: Mixing signals with traditional change detection
- **Solution**: Be consistent - use signals throughout your component

---

## Additional Resources

- [Angular Change Detection Official Docs](https://angular.dev/guide/change-detection)
- [Angular Signals Guide](https://angular.dev/guide/signals)
- [Zone.js Documentation](https://github.com/angular/angular/tree/main/packages/zone.js)

---

## Summary

- **Default**: Easy but slow - checks everything
- **OnPush**: Fast but complex - checks only when needed
- **Signals**: Fast and simpler - the future of Angular

**Recommendation**: Use **Signals** for all new Angular 16+ projects. They provide the best balance of performance and developer experience.

---

*Last Updated: February 2026*
