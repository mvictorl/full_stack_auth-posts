import { useContext } from 'react'
import { AuthContext } from '../hocs/AuthProvider'

export const useAuth = () => useContext(AuthContext)
