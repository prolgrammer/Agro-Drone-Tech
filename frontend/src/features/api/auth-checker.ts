// import { SECRETKEY } from "app/constants"
// import { getCookie } from "cookies-next"
// import jwt from 'jsonwebtoken'

// export const verifyToken = (router: any) => {
//   const token = getCookie('token')

//   if (!token) {
//     router.push('/auth/login')
//     console.log('token not found')
//     return null
//   }

//   try {
//     const decoded = jwt.verify(token, SECRETKEY)
//     return decoded
//   } catch (error) {
//     return null
//   }
// }