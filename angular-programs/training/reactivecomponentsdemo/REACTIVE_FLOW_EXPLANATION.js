// REACTIVE FLOW DEMONSTRATION

// Step 1: Component A changes the category
// User selects "Electronics" from dropdown
CategorySelectorComponent.onSelect() → categoryService.selectCategory('Electronics')

// Step 2: BehaviorSubject updates and broadcasts
selectedCategorySubject.next('Electronics') // Updates internal value
                                           // Automatically notifies ALL subscribers

// Step 3: ALL subscribed components react instantly:

// Header Component gets notified:
selectedCategory$ → emits 'Electronics' → Header shows "Current Selection: Electronics"

// Item List Component gets notified:  
selectedCategory$.pipe(map(...)) → filters items → Shows only Electronics items

// Statistics Component gets notified:
selectedCategory$ → recalculates stats → Shows count and average for Electronics only

// All this happens AUTOMATICALLY - no manual coordination needed!
