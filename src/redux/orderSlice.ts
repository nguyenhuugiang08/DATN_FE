import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, Product } from "../interfaces/interface";
import type { AxiosError, AxiosInstance } from "axios";
import productApi from "../api/productApi";
import orderApi from "api/orderApi";

interface ValidationErrors {
    errorMessage: string;
    field_errors: Record<string, string>;
}

export const getOrder = createAsyncThunk<Order[], AxiosInstance>(
    "order/getByUserId",
    async (axiosRefresh: AxiosInstance) => {
        try {
            const response = await orderApi.getOrder(axiosRefresh);
            return response.data?.orders;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

export const getOrderById = createAsyncThunk("order/getById", async (id: string | undefined) => {
    try {
        const response = await orderApi.getOrderById(id);
        return response.data;
    } catch (err) {
        let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
        if (!error.response) {
            throw err;
        }
        return error.response.data;
    }
});

export const getAllOrder = createAsyncThunk<Order[], AxiosInstance>(
    "order/getAllOrders",
    async (axiosRefresh: AxiosInstance) => {
        try {
            const response = await orderApi.getAllOrder(axiosRefresh);
            return response.data?.orders;
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err as AxiosError<ValidationErrors>;
            if (!error.response) {
                throw err;
            }
            return error.response.data;
        }
    }
);

interface ProductState {
    error: string | null | undefined;
    orders: Order[];
    order: Order;
    loading: boolean;
    allOrders: Order[];
}

const initialState = {
    error: null,
    orders: [],
    order: {} as Order,
    loading: false,
    allOrders: [],
} as ProductState;

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        userLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOrder.fulfilled, (state, { payload }) => {
            state.orders = [...payload];
        });
        builder.addCase(getOrder.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getOrderById.fulfilled, (state, { payload }) => {
            state.order = { ...payload };
        });
        builder.addCase(getOrderById.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });

        builder.addCase(getAllOrder.fulfilled, (state, { payload }) => {
            state.allOrders = [...payload];
        });
        builder.addCase(getAllOrder.rejected, (state, action) => {
            if (action.payload) {
                state.error = "Have got an exception!";
            } else {
                state.error = action.error.message;
            }
        });
    },
});

export const { userLoading } = orderSlice.actions;
export default orderSlice.reducer;
