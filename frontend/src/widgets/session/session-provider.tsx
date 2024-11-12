// import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
// import { JwtPayload } from 'jsonwebtoken'
// import { useNavigate } from 'react-router-dom'
// // import { verifyToken } from '@features/api/auth-checker'

// const SessionContext = createContext<JwtPayload | null>(null)

// export const useSession = () => useContext(SessionContext)

// interface SessionProviderProps {
//   children: ReactNode
// }

// export const SessionProvider = ({ children }: SessionProviderProps) => {
//   // const router = useNavigate()
//   // const [session, setSession] = useState<JwtPayload | null>(null)

//   // useEffect(() => {
//   //   const userInfo = verifyToken(router)
//   //   if (typeof userInfo === 'object' && userInfo !== null) {
//   //     setSession(userInfo)
//   //   }
//   // }, [])
  
//   return (
//     <SessionContext.Provider value={session}>
//       {children}
//     </SessionContext.Provider>
//   )
// }