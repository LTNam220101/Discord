import { Navigate, useNavigate } from "react-router-dom"
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  useTheme,
  Alert
} from "@mui/material"
import { ReactComponent as Discord } from "../../assets/discord.svg"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { Link as LinkDom } from "react-router-dom"
import { LoginForm } from "./interfaces"
import { State } from "../../redux-saga/reducers"
import { useEffect, useState } from "react"
import { LOGIN_CLEAR } from "./reducers"
import { login } from "./actions"
import { Formik } from "formik"

const schema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().required()
})

export default function LoginPage({ user }: any) {
  const theme = useTheme()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginResult = useSelector((state: State) => state.loginResult)
  const [err, setErr] = useState(false)

  useEffect(() => {
    if (user) {
      navigate("/")
    }
    // return () => {
    //   dispatch({
    //     type: LOGIN_CLEAR
    //   })
    // }
  }, [user])

  useEffect(() => {
    if (loginResult) {
      if (loginResult.success) {
        localStorage.setItem(
          "accessToken",
          loginResult.response?.accessToken as string
        )
        localStorage.setItem(
          "refreshToken",
          loginResult.response?.refreshToken as string
        )
        localStorage.setItem("id", loginResult.response?.id as string)
        // navigate("/")
      } else {
        setErr(true)
      }
    }
  }, [loginResult])

  const handleSubmit = (values: LoginForm) => {
    dispatch(login(values))
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "60px"
        }}
      >
        <Discord />
        <Formik
          validationSchema={schema}
          initialValues={{ username: "", password: "" } as LoginForm}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid
          }) => (
            <form className="form" onSubmit={handleSubmit}>
              {err && <Alert severity="error">Invalid email or password</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email address"
                autoComplete="email"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={LinkDom} to="/register" variant="body2">
                    {"Don't have an account? Create one now"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Container>
  )
}
