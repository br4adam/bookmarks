import { useAuthStore } from "../stores/AuthStore"
import Button from "./Button"

const Login = () => {
  const { session, loading, login, logout } = useAuthStore(state => ({ session: state.session, loading: state.loading, login: state.login, logout: state.logout }))

  if (session) return <Button onClick={logout} loading={loading}>Logout</Button>

  return <Button onClick={login} loading={loading}>Login</Button>
}

export default Login