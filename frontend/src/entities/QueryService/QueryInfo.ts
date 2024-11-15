interface QueryInfoDTO{
    id: number;
    userId: number;
    areaId: number;
    imageIds: string[];
    status: string;
}

const prefix = "query/info"

//QueryController
// + QueryInfoDto getQueryInfo() /queries/info/{id} (get)
// + Page<QueryInfoDto> getAllQueriesInfo(Integer page, Integer size)
// 