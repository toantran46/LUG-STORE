import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { chucvuApi } from 'api/chucvuApi';
import { donhangApi } from 'api/donhangApi';
import { khuyenmaiApi } from 'api/khuyenmaiApi';
import { loaisanphamApi } from 'api/loaisanphamApi';
import { mausacApi } from 'api/mausacApi';
import { nhacungcapApi } from 'api/nhacungcapApi';
import { nhanvienApi } from 'api/nhanvienApi';
import { phieunhapApi } from 'api/phieunhapApi';
import { sanphamApi } from 'api/sanphamApi';
import { thanhvienApi } from 'api/thanhvienApi';
import { thongkeApi } from 'api/thongkeApi';
import { thuonghieuApi } from "api/thuonghieuApi";

export const fetch_brands = createAsyncThunk("adminPage/fetch_brands", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await thuonghieuApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_regencys = createAsyncThunk("adminPage/fetch_regencys", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await chucvuApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_product_types = createAsyncThunk("adminPage/fetch_product_types", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await loaisanphamApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_suppliers = createAsyncThunk("adminPage/fetch_suppliers", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await nhacungcapApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_discounts = createAsyncThunk("adminPage/fetch_discounts", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await khuyenmaiApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_colors = createAsyncThunk("adminPage/fetch_colors", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await mausacApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_employees = createAsyncThunk("adminPage/fetch_employees", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await nhanvienApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_members = createAsyncThunk("adminPage/fetch_members", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await thanhvienApi.getAll(params);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_products = createAsyncThunk("adminPage/fetch_products", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await sanphamApi.getAll(params);
        // console.log(result);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_orders = createAsyncThunk("adminPage/fetch_orders", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await donhangApi.getAll(params);
        // console.log(result);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_order_undo = createAsyncThunk("adminPage/fetch_order_undo", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await donhangApi.getAll(params);
        console.log(result);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_goodsrecipi = createAsyncThunk("adminPage/fetch_goodsrecipi", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await phieunhapApi.getAll(params);
        console.log(result);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})
export const fetch_thongkes = createAsyncThunk("adminPage/fetch_thongkes", async (params, { rejectWithValue }) => {

    try {
        const { result, totalRecords } = await thongkeApi.getAll(params);
        // console.log(result);
        return { result, totalRecords };

    } catch (error) {
        return rejectWithValue(error.respone.data)
    }

})

const initialState = {
    loading: {},
    data: {
        thongkes: {}
    },
    pagination: {
        brands: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        regencys: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        product_types: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        suppliers: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        discounts: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        colors: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        employees: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        members: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        products: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        orders: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        order_undo: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
        goodsrecipi: {
            _limit: 10,
            _page: 1,
            _totalPage: 1,
            _totalRecord: 0
        },
    }
}

const adminPage = createSlice({
    name: 'adminPage',
    initialState,
    reducers: {
        savePagination: (state, action) => {
            const { screen, page } = action.payload;
            state.pagination[screen]._page = page;
        },

    },
    extraReducers: {
        // brands
        [fetch_brands.pending]: (state, action) => {
            state.loading.brands = true;
        },
        [fetch_brands.fulfilled]: (state, action) => {
            state.loading.brands = false;
            state.data.brands = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.brands._totalRecord = totalRecords;
            state.pagination.brands._totalPage = Math.ceil(totalRecords / state.pagination.brands._limit);
        },
        [fetch_brands.rejected]: (state, action) => {
            state.loading.brands = false;
            state.error.brands = action.error;
        },
        // regencys
        [fetch_regencys.pending]: (state, action) => {
            state.loading.regencys = true;
        },
        [fetch_regencys.fulfilled]: (state, action) => {
            state.loading.regencys = false;
            state.data.regencys = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.regencys._totalRecord = totalRecords;
            state.pagination.regencys._totalPage = Math.ceil(totalRecords / state.pagination.regencys._limit);
        },
        [fetch_regencys.rejected]: (state, action) => {
            state.loading.regencys = false;
            state.error.regencys = action.error;
        },
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
        // suppliers
        [fetch_suppliers.pending]: (state, action) => {
            state.loading.suppliers = true;
        },
        [fetch_suppliers.fulfilled]: (state, action) => {
            state.loading.suppliers = false;
            state.data.suppliers = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.suppliers._totalRecord = totalRecords;
            state.pagination.suppliers._totalPage = Math.ceil(totalRecords / state.pagination.suppliers._limit);
        },
        [fetch_suppliers.rejected]: (state, action) => {
            state.loading.suppliers = false;
            state.error.suppliers = action.error;
        },
        // discounts
        [fetch_discounts.pending]: (state, action) => {
            state.loading.discounts = true;
        },
        [fetch_discounts.fulfilled]: (state, action) => {
            state.loading.discounts = false;
            state.data.discounts = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.discounts._totalRecord = totalRecords;
            state.pagination.discounts._totalPage = Math.ceil(totalRecords / state.pagination.discounts._limit);
        },
        [fetch_discounts.rejected]: (state, action) => {
            state.loading.discounts = false;
            state.error.discounts = action.error;
        },
        // colors
        [fetch_colors.pending]: (state, action) => {
            state.loading.colors = true;
        },
        [fetch_colors.fulfilled]: (state, action) => {
            state.loading.colors = false;
            state.data.colors = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.colors._totalRecord = totalRecords;
            state.pagination.colors._totalPage = Math.ceil(totalRecords / state.pagination.colors._limit);
        },
        [fetch_colors.rejected]: (state, action) => {
            state.loading.colors = false;
            state.error.colors = action.error;
        },
        // employees
        [fetch_employees.pending]: (state, action) => {
            state.loading.employees = true;
        },
        [fetch_employees.fulfilled]: (state, action) => {
            state.loading.employees = false;
            state.data.employees = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.employees._totalRecord = totalRecords;
            state.pagination.employees._totalPage = Math.ceil(totalRecords / state.pagination.employees._limit);
        },
        [fetch_employees.rejected]: (state, action) => {
            state.loading.employees = false;
            state.error.employees = action.error;
        },
        // members
        [fetch_members.pending]: (state, action) => {
            state.loading.members = true;
        },
        [fetch_members.fulfilled]: (state, action) => {
            state.loading.members = false;
            state.data.members = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.members._totalRecord = totalRecords;
            state.pagination.members._totalPage = Math.ceil(totalRecords / state.pagination.members._limit);
        },
        [fetch_members.rejected]: (state, action) => {
            state.loading.members = false;
            state.error.members = action.error;
        },
        // products
        [fetch_products.pending]: (state, action) => {
            state.loading.products = true;
        },
        [fetch_products.fulfilled]: (state, action) => {
            state.loading.products = false;
            state.data.products = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.pagination.products._totalRecord = totalRecords;
            state.pagination.products._totalPage = Math.ceil(totalRecords / state.pagination.products._limit);
        },
        [fetch_products.rejected]: (state, action) => {
            state.loading.products = false;
            state.error.products = action.error;
        },
        // orders
        [fetch_orders.pending]: (state, action) => {
            state.loading.orders = true;
        },
        [fetch_orders.fulfilled]: (state, action) => {
            state.loading.orders = false;
            state.data.orders = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            // state.data.thongkes.DH_CHO_XU_LY = totalRecords;
            state.pagination.orders._totalRecord = totalRecords;
            state.pagination.orders._totalPage = Math.ceil(totalRecords / state.pagination.orders._limit);
        },
        [fetch_orders.rejected]: (state, action) => {
            state.loading.orders = false;
            state.error.orders = action.error;
        },
        // order_undo
        [fetch_order_undo.pending]: (state, action) => {
            state.loading.order_undo = true;
        },
        [fetch_order_undo.fulfilled]: (state, action) => {
            state.loading.order_undo = false;
            state.data.order_undo = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            state.data.thongkes.DHCHUAXULY = totalRecords;
            state.pagination.order_undo._totalRecord = totalRecords;
            state.pagination.order_undo._totalPage = Math.ceil(totalRecords / state.pagination.order_undo._limit);
        },
        [fetch_order_undo.rejected]: (state, action) => {
            state.loading.order_undo = false;
            state.error.order_undo = action.error;
        },
        // thongkes
        [fetch_thongkes.pending]: (state, action) => {
            state.loading.thongkes = true;
        },
        [fetch_thongkes.fulfilled]: (state, action) => {
            state.loading.thongkes = false;
            state.data.thongkes = action.payload.result;
        },
        [fetch_thongkes.rejected]: (state, action) => {
            state.loading.thongkes = false;
            state.error.thongkes = action.error;
        },
        // goodsrecipi
        [fetch_goodsrecipi.pending]: (state, action) => {
            state.loading.goodsrecipi = true;
        },
        [fetch_goodsrecipi.fulfilled]: (state, action) => {
            state.loading.goodsrecipi = false;
            state.data.goodsrecipi = action.payload.result.map((e, idx) => ({ ...e, key: idx }));

            const totalRecords = action.payload.totalRecords;
            // state.data.thongkes.DH_CHO_XU_LY = totalRecords;
            state.pagination.goodsrecipi._totalRecord = totalRecords;
            state.pagination.goodsrecipi._totalPage = Math.ceil(totalRecords / state.pagination.goodsrecipi._limit);
        },
        [fetch_goodsrecipi.rejected]: (state, action) => {
            state.loading.goodsrecipi = false;
            state.error.goodsrecipi = action.error;
        },
    }
})

const { actions, reducer } = adminPage;
export const { savePagination } = actions;
export default reducer;