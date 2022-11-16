import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { donhangApi } from 'api/donhangApi';
import { loaisanphamApi } from "api/loaisanphamApi";
import { yeuthichApi } from 'api/yeuthichApi';

export const fetch_product_types = createAsyncThunk("adminPage/fetch_product_types", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await loaisanphamApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_order = createAsyncThunk("userPage/fetch_order", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await donhangApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_wishlist = createAsyncThunk("userPage/fetch_wishlist", async (params, { rejectWithValue }) => {

    try {
        const { result } = await yeuthichApi.getAll(params);
        return { result };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})

const initialState = {
    loading: {},
    data: {},
    cart: [],
    shortBy: {},
    listIDProductCart: [],
    onReloadFeedback: false,
    logged: false,
    pagination: {
        product_types: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        order: {
            _limit: 2,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        wishlist: {
            _limit: 8,
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
            const { screen, page } = action.payload;
            state.pagination[screen]._page = page;
        },
        addCart: (state, action) => {
            const { product, quantity, colorInfo, imageProduct, colorClick } = action.payload;
            console.log(state.cart);
            // console.log(colorInfo);
            const index = state.cart.findIndex((sp) => sp.SP_MA === product.SP_MA && sp.MAMAU === colorInfo.MAMAU);
            console.log({ index })
            if (index === -1) {
                state.cart.push(({
                    ...product,
                    SL_SP: quantity || 1,
                    MAMAU: colorInfo.MAMAU,
                    TENMAU: colorInfo.TENMAU,
                    ANHSP: imageProduct,
                    SOLUONGKHO: colorClick.soluong,
                }));
            } else {
                const currentProduct = state.cart[index];
                state.cart[index] = {
                    ...currentProduct,
                    SL_SP: currentProduct.SL_SP + (quantity || 1),
                    MAMAU: currentProduct.MAMAU,
                    TENMAU: currentProduct.TENMAU,
                    ANHSP: currentProduct.ANHSP,
                    SOLUONGKHO: colorClick.soluong,
                }
            }
            state.listIDProductCart = state.cart.map(e => e.SP_MA);
        },
        removeCart: (state, action) => {
            const { id, mamau } = action.payload;
            const index = state.cart.findIndex((sp) => sp.SP_MA === id && sp.MAMAU === mamau);
            if (index === -1) return;
            state.cart.splice(index, 1);
            state.listIDProductCart = state.cart.map(e => e.SP_MA);
        },
        resetCart: (state, action) => {
            state.cart = [];
            state.listIDProductCart = [];
        },

        changeQuantityCart: (state, action) => {
            const { id, quantity, mamau } = action.payload
            // console.log(action.payload)
            const index = state.cart.findIndex((sp) => sp.SP_MA === id && sp.MAMAU === mamau);
            if (index === -1) return;
            const currentProduct = state.cart[index];
            state.cart[index] = { ...currentProduct, SL_SP: currentProduct.SL_SP + quantity }
        },
        onShort: (state, action) => {
            let value = action.payload;
            state.shortBy = value;
        },
        onReloadFeedback: (state, action) => {
            state.onReloadFeedback = prev => !prev
        },
        showLogin: (state, action) => {
            state.logged = action.payload
        }

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
        // order
        [fetch_order.pending]: (state, action) => {
            state.loading.order = true;
        },
        [fetch_order.fulfilled]: (state, action) => {
            state.loading.order = false;
            state.data.order = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.order._totalRecord = totalRecords;
            state.pagination.order._totalPage = Math.ceil(totalRecords / state.pagination.order._limit);
        },
        [fetch_order.rejected]: (state, action) => {
            state.loading.order = false;
            state.error.order = action.error;
        },
        // wishlist
        [fetch_wishlist.pending]: (state, action) => {
            state.loading.wishlist = true;
        },
        [fetch_wishlist.fulfilled]: (state, action) => {
            state.loading.wishlist = false;
            state.data.wishlist = action.payload.result.map((e, idx) => ({ ...e, key: idx }));
            state.data.wishlistID = action.payload.result.map((e, idx) => e.SP_MA);

            const totalRecords = action.payload.totalRecords;
            state.pagination.wishlist._totalRecord = totalRecords;
            state.pagination.wishlist._totalPage = Math.ceil(totalRecords / state.pagination.wishlist._limit);
        },
        [fetch_wishlist.rejected]: (state, action) => {
            state.loading.wishlist = false;
            state.error.wishlist = action.error;
        },
    }
})

const { actions, reducer } = userPage;
export const { savePagination, addCart, removeCart, resetCart, changeQuantityCart, onShort, onReloadFeedback, showLogin } = actions;
export default reducer;