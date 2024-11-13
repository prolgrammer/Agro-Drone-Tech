interface QuaryCreateDTO{
    areaId: number;
    ImageIds: string[];
}

const prefix = "quary/create"

// QueryController
// + QueryInfoDto createQuery(QueryCreateDto query) /queries (post)