import {$authHost, $host} from "./index";

export const registration = async (formData) => {
    const data = await $host.post('user/registration', formData)
    return data
}

export const loginUser = async (wallet, password ) => {
    const {data} = await $host.post('user/login', {wallet, password })
    localStorage.setItem('token', data.token)
    window.location.reload()
    return data
}

// export const checkToken = async (token) => {
//     const {data} = await $authHost.get('api/auth', {headers: {'Authorization': `Bearer ${token}`}})
//     localStorage.setItem('token', data.token)
//     return data 
// }