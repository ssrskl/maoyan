import { $fetch } from 'ofetch'
export const myfetch = (url: string) => $fetch.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    credentials: 'include',
    mode: 'cors',
    onRequest({ request }) {
        console.log('Making request to:', request.toString)
    },
    onResponse({ response }) {
        console.log('Received response:', response.status)
    },
    onResponseError({ response }) {
        console.error('Error response:', response.status)
    }
})