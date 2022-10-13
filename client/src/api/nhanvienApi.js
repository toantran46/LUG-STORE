import axiosClient from "./axiosClient";
import axios from "axios";

export const nhanvienApi = {
    getAll: (params) => {
        return new Promise((resolve, reject) => {
            const url = `/api/nhanviens`
            setTimeout(async () => {
                try {
                    const response = await axiosClient.get(url, { params });
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 500)
        })

    },
    post: data => {
        return new Promise((resolve, reject) => {
            const url = '/api/nhanviens'
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
    update: (params, data) => {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    const url = `/api/nhanviens/${params}`
                    const response = await axiosClient.patch(url, data);
                    resolve(response);

                } catch (error) {
                    reject(error)
                }
            }, 2000)
        })
    },
    delete: (params) => {
        const url = `/api/nhanviens/${params}`
        return axiosClient.delete(url);
    },
    getNewToken: (refreshToken) => {
        const url = `/nhanviens/get_new_token`
        return axios.get(url,
            {
                baseURL: process.env.REACT_APP_API_URL,
                headers: {
                    "content-type": 'application/json',
                    authorization: `Bearer ${refreshToken}`
                }
            }
        );
    }
}