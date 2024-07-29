import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPanVerify = createAsyncThunk(
  "panver/fetchPanVerify",
  async (panNumber) => {
    const url = "https://lab.pixel6.co/api/verify-pan.php";
    const requestBody = { panNumber };

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

      if (data.status === "Success" && data.isValid) {
        return { isValid: true, fullName: data.fullName };
      } else {
        return { isValid: false };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Failed to verify PAN");
    }
  }
);

const panSlice = createSlice({
  name: "pan",
  initialState: {
    isValid: null,
    fullName: "",
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatepan: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPanVerify.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPanVerify.fulfilled, (state, action) => {
        state.status = "Success";
        state.isValid = action.payload.isValid;
        state.fullName = action.payload.fullName || "";
      })
      .addCase(fetchPanVerify.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { resetStatepan } = panSlice.actions;
export default panSlice.reducer;
