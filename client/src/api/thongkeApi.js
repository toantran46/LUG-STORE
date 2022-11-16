import axiosClient from "./axiosClient"

export const thongkeApi = {
    getAll: (params) => {
        return new Promise((resolve, reject) => {
            const url = `/api/thongkes`
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
    getThongKeDashboards: (params) => {
        return new Promise((resolve, reject) => {
            const url = `/api/thongkes/thongkedashboards`
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
}