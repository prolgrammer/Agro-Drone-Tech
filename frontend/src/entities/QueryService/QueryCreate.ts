// interface QuaryCreateDTO{
//     areaId: number;
//     ImageIds: string[];
// }

import { $api } from "@shared/axios-instanse"

const prefix = "auth"

// // QueryController
// // + QueryInfoDto createQuery(QueryCreateDto query) /queries (post)

export const createQuery = async (file: File) => {
    const formData = new FormData()
  
    if (file) {
      formData.append("file", file)
    }

    return await $api.request({
        method: "POST",
        url: `${prefix}/upload`,
        data: formData
    }).then(response => response.data)
}

export const getQueryResponse = async (userId: string) => {
    return await $api.request({
        method: "GET",
        url: `${prefix}/result/${userId}`
    }).then(response => response.data)
}

export interface QueryDTO{
    userId?: string
    disease_class?: string
    disease_description?: string
    general_recommendation?: string
    soil_specific_recommendation?: string
}