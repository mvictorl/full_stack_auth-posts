import { useSelector, useDispatch } from "react-redux"
import { login, logout } from "./appstore/authSlice"
import "./App.css"

function App() {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // const loginHandler = () => {
  //   dispatch(
  //     login({
  //       user: {
  //         name: "Victor",
  //         email: "victor@ya.ru",
  //       },
  //       roles: ["USER"],
  //       isActivated: true,
  //     })
  //   )
  // }

  const loginHandler = () => {
    const email = "victor@ya.ru"
    const password = "123456"

    dispatch(login({email, password}))
  }
  
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className="App">
      <h2>{auth?.user?.name ?? "no auth"}</h2>
      <button onClick={loginHandler}>Login</button>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default App
