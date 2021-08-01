import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay : number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async respone => {
    try {
        await sleep(1000);
        return respone;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responeBody = <T>(respone: AxiosResponse<T>) => respone.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responeBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responeBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responeBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responeBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

const agent = {
    Activities
}

export default agent;