import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Booking, BookingDTO} from "@/types/bookings";
import ApiBookings from "@/services/bookings";
import {QuoteDTO} from "@/types/quote";
import {OccupiedSlot} from "@/types/availability";

const initialState = {
  loading: false,
  status: "idle",
  quote: <QuoteDTO>({}),
  booking: <Booking>({}),
  bookingsStudio: <OccupiedSlot[]>([]),
  bookingsUser: <Booking[]>([])
};

export const fetchBookingByStudioId = createAsyncThunk(
  "booking/fetchBookingByStudioId",
  async (id: string) => {
    const response = await ApiBookings.getBookingsByStudioId(id);
    return response.data;
  }
);

export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAllBookings",
  async () => {
    const response = await ApiBookings.getAllBookings();
    return response.data;
  }
);

export const makeBooking = createAsyncThunk(
  "booking/makeBooking",
  async (body: BookingDTO) => {
    const response = await ApiBookings.makeBooking(body);
    return response.data;
  }
);

export const makeQuote = createAsyncThunk(
  "booking/makeQuote",
  async (body: any) => {
    const response = await ApiBookings.makeQuote(body);
    return response.data;
  }
);

export const fetchBookingOfUser = createAsyncThunk(
  "booking/fetchBookingOfUser",
  async () => {
    const response = await ApiBookings.getBookingOfUser();
    return response.data;
  }
);

export const cancelBookingById = createAsyncThunk(
  "booking/cancelBookingById",
  async (id: number) => {
    const response = await ApiBookings.cancelBookingById(id);
    return response.data;
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setQuote: (state, action) => {
      state.quote = action.payload;
    },
    clearQuote: (state) => {
      state.quote = {} as QuoteDTO;
    },
    clearAll: (state) => {
      state.booking = {} as Booking;
      state.quote = {} as QuoteDTO;
      state.bookingsStudio = [];
      state.bookingsUser = [];
    }
  },
  extraReducers: (builder) => {
    // Fetch Booking By Studio Id
    builder
      .addCase(fetchBookingByStudioId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingByStudioId.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingsStudio = action.payload;
      })
      .addCase(fetchBookingByStudioId.rejected, (state) => {
        state.loading = false;
      });

    // Fetch All Bookings
    builder
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingsStudio = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state) => {
        state.loading = false;
      });

    // Make Booking
    builder
      .addCase(makeBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload;
        state.bookingsStudio.push(action.payload as OccupiedSlot);
        state.bookingsUser.push(action.payload);
      })
      .addCase(makeBooking.rejected, (state) => {
        state.loading = false;
      });

    // Make Quote
    builder
      .addCase(makeQuote.pending, (state) => {
        state.loading = true;
      })
      .addCase(makeQuote.fulfilled, (state, action) => {
        state.loading = false;
        state.quote = action.payload;
      })
      .addCase(makeQuote.rejected, (state) => {
        state.loading = false;
      });

    // Fetch Bookings Of User
    builder
      .addCase(fetchBookingOfUser.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(fetchBookingOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.bookingsUser = action.payload;
      })
      .addCase(fetchBookingOfUser.rejected, (state) => {
        state.loading = false;
        state.status = "failed";
      });

    // Cancel Booking By Id
    builder
      .addCase(cancelBookingById.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(cancelBookingById.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.bookingsUser = state.bookingsUser.filter((booking) => booking.id !== action.payload.id);
      })
      .addCase(cancelBookingById.rejected, (state) => {
        state.status = "failed";
        state.loading = false;
      });
  },
});

export default bookingSlice.reducer;