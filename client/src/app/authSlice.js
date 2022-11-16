import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nhanvienApi } from "api/nhanvienApi";
import { thanhvienApi } from "api/thanhvienApi";


export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {

    try {
        const { result } = await thanhvienApi.login(data);
        return { token: result.token, refreshToken: result.refreshToken };

    } catch (error) {
        return rejectWithValue(error)
    }

})

export const getMe = createAsyncThunk("auth/getMe", async (data, { rejectWithValue, dispatch }) => {

    try {
        const { result } = await thanhvienApi.getMe();
        // console.log(result)
        return result;

    } catch (error) {
        return rejectWithValue(error)
    }

})

export const getNewToken = createAsyncThunk("auth/getNewToken", async (params, { rejectWithValue, dispatch }) => {

    try {
        const { data: { result } } = params.isUser ? await thanhvienApi.getNewToken(params.refreshToken) : await nhanvienApi.getNewToken(params.refreshToken);
        return { token: result.token, refreshToken: result.refreshToken };

    } catch (error) {
        return rejectWithValue(error)
    }

})

export const login_socialMedia = createAsyncThunk("auth/userInfoLoginSocial", async (data, { rejectWithValue }) => {

    try {
        const { result } = await thanhvienApi.getUserSocialMedia(data);
        return { token: result.token, refreshToken: result.refreshToken };

    } catch (error) {
        return rejectWithValue(error)
    }

})

const initialState = {
    token: null,
    refreshToken: null,
    user: null,
    isAuth: false,
    errorMessage: '',
    isLoading: {
        login: false,
        getMe: false
    }
}


const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state, action) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.isAuth = false;
        },
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.isLoading.login = true;
        },
        [login.fulfilled]: (state, action) => {
            const { token, refreshToken } = action.payload;
            state.isLoading.login = false;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        [login.rejected]: (state, action) => {
            state.isLoading.login = false;
        },
        //SOCIAL MEDIA
        [login_socialMedia.pending]: (state, action) => {
            state.isLoading.login_socialMedia = true;
        },
        [login_socialMedia.fulfilled]: (state, action) => {
            const { token, refreshToken } = action.payload;
            state.isLoading.login_socialMedia = false;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        [login_socialMedia.rejected]: (state, action) => {
            state.isLoading.login_socialMedia = false;
        },
        // NEW TOKEN
        [getNewToken.fulfilled]: (state, action) => {
            const { token, refreshToken } = action.payload;
            state.token = token;
            state.refreshToken = refreshToken;
        },
        // GETME
        [getMe.pending]: (state, action) => {
            state.isLoading.getMe = true;
        },
        [getMe.fulfilled]: (state, action) => {
            state.isLoading.getMe = false;
            state.user = action.payload;
            state.isAuth = true;
        },
        [getMe.rejected]: (state, action) => {
            state.isLoading.getMe = false;
            state.user = null;
            state.isAuth = false;
        }
    }
}
)

const { actions, reducer } = auth;
export const { logout } = actions;
export default reducer;