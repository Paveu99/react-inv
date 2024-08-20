import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const useApi = () => {
    const baseURL = 'http://localhost:3001';

    const call = async <R, P = {}>(url: string, method: 'GET' | 'DELETE' | 'POST' | 'PUT', body?: P): Promise<R> => {
        const config: AxiosRequestConfig = {
            method: method,
            url: baseURL + url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        };

        try {
            const res: AxiosResponse<R> = await axios(config);
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const apiError = error.response.data as { error: string };
                throw new Error(apiError.error);
            } else {
                throw new Error('An unexpected error occurred');
            }
        }
    }

    const apiDelete = async<R>(url: string) => {
        return await call<R>(url, 'DELETE');
    }

    const apiGet = async<R>(url: string) => {
        return await call<R>(url, 'GET');
    }

    const apiPost = async<R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'POST', data);
    }

    const apiPut = async<R, P>(url: string, data: P) => {
        return await call<R, P>(url, 'PUT', data);
    }

    return {
        apiGet,
        apiDelete,
        apiPost,
        apiPut
    }
}
