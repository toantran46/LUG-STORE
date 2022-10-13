import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loaisanphamApi } from "api/loaisanphamApi";

export const fetch_product_types = createAsyncThunk("adminPage/fetch_product_types", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await loaisanphamApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})

const initialState = {
    loading: {},
    data: {},
    pagination: {
        product_types: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
    }
}

const userPage = createSlice({
    name: 'userPage',
    initialState,
    reducers: {
        savePagination: (state, action) => {
            const { screen, _page, _totalPage } = action.payload;
            state.pagination[screen] = { ...state.pagination[screen], _page, _totalPage };
        },
    },
    extraReducers: {
        // product_types
        [fetch_product_types.pending]: (state, action) => {
            state.loading.product_types = true;
        },
        [fetch_product_types.fulfilled]: (state, action) => {
            state.loading.product_types = false;
            state.data.product_types = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.product_types._totalRecord = totalRecords;
            state.pagination.product_types._totalPage = Math.ceil(totalRecords / state.pagination.product_types._limit);
        },
        [fetch_product_types.rejected]: (state, action) => {
            state.loading.product_types = false;
            state.error.product_types = action.error;
        },
    }
})

const { actions, reducer } = userPage;
export const { savePagination } = actions;
export default reducer;