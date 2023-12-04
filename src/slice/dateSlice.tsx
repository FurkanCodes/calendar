import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface Dates {
  dates: DateRange[];
}

const initialState: Dates = {
  dates: [],
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDates: (state, action) => {
      state.dates = action.payload;
    },
    // Add more reducers as needed
  },
});

export const { setDates } = dateSlice.actions;

export default dateSlice.reducer;
