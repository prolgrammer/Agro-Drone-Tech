import { $api, $authApi } from "@shared/axios-instanse";

export interface RegisterDTO {
    username: string
    password: string
    role: string
    adminPassword?: string
}

export interface LoginDTO {
    username: string
    password: string
}

const prefix = "auth"

export const signUp = async (data: RegisterDTO) => {
    return await $authApi.request({
        method: "POST",
        url: `${prefix}/sign-up`,
        data: data
    }).then(response => response.data)
}

export const signIn = async (data: LoginDTO) => {
    return await $authApi.request({
        method: "POST",
        url: `${prefix}/sign-in`,
        data: data
    }).then(response => response.data)
}

export const refreshToken = async (accountId: string, refresh: {refresh: string}) => {
    return await $authApi.request({
        method: "POST",
        url: `${prefix}/refresh/${accountId}`,
        data: refresh
    }).then(response => response.data)
}

export const changePassword = async (userId: string, data: {newPassword: string, refresh: string}) => {
    return await $api.request({
        method: "PUT",
        url: `${prefix}/change-password/${userId}`,
        data: data
    }).then(response => response.data)
}
