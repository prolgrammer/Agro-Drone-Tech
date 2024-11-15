interface AreaDTO{
    id: number;
    userId: number;
    name: string;
    soilType: string;
    sowingDate: string;
}

const prefix = "area"

// AreaController
// + AreaDto findAreaById() /areas/{id} (get)
// + void deleteArea() /areas/{id} (delete)
// + Page<AreaDto> findAllAreas(params: Integer page, Integer size) /areas (get)