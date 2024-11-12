interface LoginDTO{
    username: string;
    password: string;
}

const prefix = "login"

//AuthController
//+ String login(LoginDto login) /auth/login (post)