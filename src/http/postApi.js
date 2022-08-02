import {$authHost, $host} from "./index";

export const createPost = async (formData) => {
    const {data} = await $authHost.post('api/post', formData)
    return data
}
export const updatePost = async (formData) => {
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
      }
    const {data} = await $authHost.put('api/post', formData)
    return data
}
export const deletePost = async (postId) => {
    const {data} = await $authHost.delete(`api/post/${postId}`)
    window.location.reload()
    return data
}

export const getOnePost = async (id) => {
    const {data} = await $host.get(`api/post/${id}`)
    return data;
}
export const getAllPosts = async () => {
    const {data} = await $host.get('api/post')
    return data
}
