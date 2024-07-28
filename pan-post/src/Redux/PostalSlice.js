import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPostCode = createAsyncThunk(
  "postal/fetchPostCode",
  async (postcode) => {
    const url = "https://lab.pixel6.co/api/get-postcode-details.php";
    const requestBody = { postcode };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "Success" && data.statusCode === 200) {
        return {
          city: data.city,
          state: data.state,
        };
      } else {
        throw new Error("Failed to fetch postcode details");
      }
    } catch (error) {
      throw new Error("Failed to fetch postcode details");
    }
  }
);

const postalSlice = createSlice({
  name: "postal",
  initialState: {
    status: "idle",
    city: [],
    state: [],
    error: null,
  },
  reducers: {
    resetStatepost: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostCode.fulfilled, (state, action) => {
        state.status = "Success";
        state.city = action.payload.city;
        state.state = action.payload.state;
      })
      .addCase(fetchPostCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetStatepost } = postalSlice.actions;
export default postalSlice.reducer;
