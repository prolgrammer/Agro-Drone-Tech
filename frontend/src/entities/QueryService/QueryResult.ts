interface QueryResultDTO {
    id: number;
    userId: number;
    areaId: number;
    imageIds: string[];
    status: string;
}

const prefix = "quary/result"

//QueryController
//+ QueryResultDto getQueryResult() /queries/result/{id} (get)
//+ Page<QueryResultDto> getAllQueryResults(Intege page, Integer size)