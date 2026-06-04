import { createSelector } from '@ngrx/store';
 
export const selectCounterState = (state: any) => state.counter;
 
export const selectCount = createSelector(
  selectCounterState,
  counter => counter.count
);