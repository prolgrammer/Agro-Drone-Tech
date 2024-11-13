interface UserUpdateDTO{
    password: string;
    name: string;
    surname: string;
    patronymic: string;
}

const prefix = "user/update"

// UserController
// + void updateUser(UserUpdateDto update) /users/ {id} (put)
// 