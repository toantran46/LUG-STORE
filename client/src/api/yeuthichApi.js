import axiosClient from "./axiosClient"

export const yeuthichApi = {
    getAll: (params) => {
        return new Promise((resolve, reject) => {
            const url = `/api/yeuthichs`
            setTimeout(async () => {
                try {
                    const response = await axiosClient.get(url, { params });
                    resolve(response);
                } catch (error) {
                    reject(error)
                }
            }, 100)
        })

    },
    post: data => {
        return new Promise((resolve, reject) => {
            const url = '/api/yeuthichs'
            setTimeout(async () => {
                try {
                    const response = await axiosClient.post(url, data);
                    resolve(response);

                } catch (error) {
                    reject(error)
                }
            }, 100)


        })
    },
    delete: (params) => {
        const url = `/api/yeuthichs/${params}`
        return axiosClient.delete(url);
    }
}