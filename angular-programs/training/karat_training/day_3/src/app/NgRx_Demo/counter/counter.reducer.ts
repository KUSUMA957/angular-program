import { createReducer, on } from '@ngrx/store';
import { increment, decrement } from '../counter/counter.action';
import { CounterState, initialCounterState } from '../counter/counter.state';
 
export const counterReducer = createReducer(
  initialCounterState,
 
  on(increment, state => ({
    ...state,
    count: state.count + 1
  })),
 
  on(decrement, state => ({
    ...state,
    count: state.count - 1
  }))
);