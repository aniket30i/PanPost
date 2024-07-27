import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchPostCode = createAsyncThunk(
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

      const data = response.json();
      if (data.status === "Success" && data.statusCode === 200) {
        return {
          city: data.city[0].name,
          state: data.state[0].name,
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
    city: "",
    state: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostCode.fulfilled, (state) => {
        state.status = "Success";
        state.city = action.payload.city;
        state.state = action.payload.state;
      })
      .addCase(fetchPostCode.rejected, (state) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postalSlice.reducer;
