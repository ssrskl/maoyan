import { $fetch } from 'ofetch'
export const myfetch = $fetch.create({
    baseURL: 'https://cloud.appwrite.io/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
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