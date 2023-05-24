import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import othersApi, { Params } from "api/othersApi";
import { HomeData } from "../interfaces/interface";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getHome = createAsyncThunk("others/getHome", async () => {
    try {
        const response = await othersApi.getHome();
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const search = createAsyncThunk("alias/trash", async (params: Params) => {
    try {
        const response = await othersApi.search(params);
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getReport = createAsyncThunk("others/report", async (year: string | undefined) => {
    try {
        const response = await othersApi.report(year);
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

interface OthersState {
    error: string | null | undefined;
    dataHome: HomeData;
    dataSearch: {};
    report: {
        countUser: number | string;
        countProduct: number | string;
        countOrder: number | string;
        countCategory: number | string;
        revenueByMonthAllMonths: number[];
        listProducts: any[];
    };
}

const initialState = {
    dataHome: {},
    dataSearch: {},
    error: null,
    report: {},
} as OthersState;

const othersSlice = createSlice({
    name: "others",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHome.fulfilled, (state, { payload }) => {
            state.dataHome = { ...payload };
        });
        builder.addCase(getHome.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.dataSearch = { ...payload };
        });
        builder.addCase(search.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getReport.fulfilled, (state, { payload }) => {
            state.report = { ...payload };
        });
        builder.addCase(getReport.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export default othersSlice.reducer;
