import { $api } from "@shared/axios-instanse";

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
    return await $api.request({
        method: "POST",
        url: `${prefix}/sign-up`,
        data: data
    }).then(response => response.data)
}

export const signIn = async (data: LoginDTO) => {
    return await $api.request({
        method: "POST",
        url: `${prefix}/sign-in`,
        data: data
    }).then(response => response.data)
}
