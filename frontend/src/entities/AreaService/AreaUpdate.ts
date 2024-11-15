interface AreaUpdateDTO{
    soilType: string;
    sowingDate: string;
}

const prefix = "area/update"

// AreaController
// + void UpdateArea(AreaUpdateDto area) /areas/{id} (put)