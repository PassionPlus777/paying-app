import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppStateType, LprSessionData, LotType } from "../../types";
import { defaultLotData, defaultSessionData } from "../../config";
import { request } from "../../utils";

interface FetchSessionParams {
  lotId: string;
  plate: string; // or any other type that fits your use case
}

export const fetchSession = createAsyncThunk<
  LprSessionData,
  FetchSessionParams
>("datas", async ({ lotId, plate }) => {
  try {
    const { data } = await request({
      method: "GET",
      url: `/data/${lotId}/${plate}`,
    });
    console.log(data);

    return data;
  } catch (error) {
    return defaultSessionData; // Return a default value in case of an error
  }
});

export const fetchLots = createAsyncThunk<LotType[], void>("lots", async () => {
  try {
    const { data } = await request({ method: "GET", url: "/lot" });
    return data;
  } catch (error) {
    return []; // Return an empty array in case of an error
  }
});

interface GetClientSecretRes {
  clientSecret: string;
}

export const getClientSecret = createAsyncThunk<GetClientSecretRes, number>(
  "clientSecret",
  async (amount) => {
    try {
      const { data } = await request({
        method: "POST",
        url: "/create-payment-intent",
        data: { amount },
      });
      return data;
    } catch (error) {
      return { clientSecret: "" }; // Return an object with an empty clientSecret in case of an error
    }
  }
);

const initialState: AppStateType = {
  session: defaultSessionData,
  lots: [],
  lot: defaultLotData,
  clientSecret: "",
};

const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLot: (state, action: PayloadAction<LotType>) => {
      state.lot = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.session = action.payload ? action.payload : defaultSessionData;
    });
    builder.addCase(fetchSession.rejected, (state, action) => {
      state.session = defaultSessionData;
      console.error("Failed to fetch session:", action.error);
    });
    builder.addCase(fetchLots.fulfilled, (state, action) => {
      state.lots = action.payload;
    });
    builder.addCase(fetchLots.rejected, (state, action) => {
      state.lots = [];
      console.error("Failed to fetch lots:", action.error);
    });
    builder.addCase(getClientSecret.fulfilled, (state, action) => {
      state.clientSecret = action.payload.clientSecret;
    });
    builder.addCase(getClientSecret.rejected, (state, action) => {
      state.clientSecret = "";
      console.error("Failed to fetch client secret:", action.error);
    });
  },
});

export const { setLot } = appReducer.actions;

export default appReducer.reducer;
