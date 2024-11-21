import { $api } from "@shared/axios-instanse";

const prefix = "users"

export interface UserDTO{
    id?: string
    name?: string
    surname?: string
    email?: string
}

export const getUserById = async (userId: string) => {
    return await $api.request({
        method: "GET",
        url: `${prefix}/${userId}`
    }).then(response => response.data)
}

export const updateUser = async (userId: string, data: UserDTO) => {
    return await $api.request({
        method: "PUT",
        url: `${prefix}/${userId}`,
        data: data
    }).then(response => response.data)
}
