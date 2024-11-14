interface RegisterDTO{
    username: string;
    password: string;
    name: string;
    surname: string;
    patronymic: string;
    role: string;
    adminPassword: string;
}

const prefix = "register"

//AuthController
//+ String register(RegisterDto register) /auth/register (post)