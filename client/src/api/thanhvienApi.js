import axios from "axios"
import axiosClient from "./axiosClient"

export const thanhvienApi = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            const url = `/api/thanhviens`
            setTimeout(async () => {
                try {
                    const response = await axiosClient.get(url);;
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 2000)
        })

    },
    getUserSocialMedia: (data) => {
        const url = `/api/thanhviens/get_thanhvien_social_media`
        return axiosClient.post(url, data);
    },
    update: (params, data) => {
        const url = `/api/thanhviens/${params}`
        return axiosClient.patch(url, data);
    },
    delete: (params, data) => {
        const url = `/api/thanhviens/${params}`
        return axiosClient.delete(url, data);
    },
    login: (data) => {
        const url = `/api/thanhviens/login`
        return axiosClient.post(url, data);
    },
    register: (data) => {
        return new Promise((resolve, reject) => {
            const url = '/api/thanhviens'
            setTimeout(async () => {
                try {
                    const response = await axiosClient.post(url, data);
                    resolve(response);

                } catch (error) {
                    reject(error)
                }
            }, 2000)
        })
    },
    getMe: () => {
        return new Promise((resolve, reject) => {
            const url = `/api/thanhviens/get_me`
            setTimeout(async () => {
                try {
                    const response = await axiosClient.get(url);
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 200)
        })
    },
    getNewToken: (refreshToken) => {
        const url = `/api/thanhviens/get_new_token`
        return axios.get(url, {
            baseURL: process.env.REACT_APP_API_URL,
            headers: {
                "content-type": 'application/json',
                authorization: `Bearer ${refreshToken}`
            }
        });
    },
}