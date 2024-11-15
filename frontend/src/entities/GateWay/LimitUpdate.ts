interface LimitUpdateDTO{
   dayLimit: number;
   todayCount: number;
}

const prefix = "limit/update"

//AdminController
//+ void updateLimit(LimitUpdateDto update) /admin/limit/{id} (put)