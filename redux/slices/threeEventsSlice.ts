import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  events: [],
  loading: false,
  error: null as string | null,
};

export const fetchThreeEvents = createAsyncThunk(
  "events/fetchEvents",
  async () => {
    try {
      const response = await axios.get(
        "https://techeventsmw.com/api/all/events"
      );
      return response.data.threevents;
    } catch (error) {
      throw Error("Failed to fetch events");
    }
  }
);

const fetchThreeEventsSlice = createSlice({
  name: "threevents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreeEvents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchThreeEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchThreeEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch events";
      });
  },
});

export default fetchThreeEventsSlice.reducer;
