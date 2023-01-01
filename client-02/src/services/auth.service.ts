// import axios from "axios"
import { $api } from "../http"

// const API_URL = "http://localhost:5000/api/"
// export const $api = axios.create({
//   withCredentials: true,
//   baseURL: API_URL,
// })

const register = (username: string, email: string, password: string) => {
  return $api.post("registration", {
    username,
    email,
    password,
  })
}

const login = (email: string, password: string) => {
  return $api
    .post('/user/login', { email, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }

      return response.data
    })
}

const logout = () => {
  localStorage.removeItem("user")
}

export const AuthService = {
  register,
  login,
  logout,
}
