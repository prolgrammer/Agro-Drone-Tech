interface UserInfoDTO{
    id: number;
    username: string;
    role: string;
    name: string;
    surname: string;
    patronymic: string;
    dayLimit: number;
    todayCount: number;
}

const prefix = "user/info"

// UserController
//+ void deleteUser() /users/{id} (delete)
//+ UserInfoDto getUserInfo() /users/info/{id} (get)
//
//AdminController
//+ UserInfoDto getUserInfo() /admin/users/info/{id} (get)
//+ Page<UserInfoDto> getAllUsersInfo(params: Integer page, Integer size)/admin/users/info (get)
//+ void deleteUser() /admin/users/{id} (delete)
//