interface AreaCreateDTO{
    name: string;
    userId: number;
    soilType: string;
    sowingDate: string;
}

const prefix = "area/create"

// AreaControler
// + AreaDto createArea(AreaCreateDto area) /areas (post)
