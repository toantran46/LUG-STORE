import axiosClient from "./axiosClient"

export const yeuthichApi = {
    getAll: (params) => {
        return new Promise((resolve, reject) => {
            const url = `/yeuthichs`
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
            const url = '/yeuthichs'
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
    delete: (params) => {
        const url = `/yeuthichs/${params}`
        return axiosClient.delete(url);
    }
}