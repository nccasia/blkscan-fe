import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from './store';
// Define a type for the slice state
interface CounterState {
  value: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: '',
};

export const counterSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeValueSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const searchReducer = counterSlice.reducer;
export const searchState = (state: AppState) => state.search.value;

export const { changeValueSearch } = counterSlice.actions;
