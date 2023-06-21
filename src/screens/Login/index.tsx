import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
  useTheme
} from "@mui/material"
import { ReactComponent as Discord } from "../../assets/discord.svg"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup"
import { Link as LinkDom } from "react-router-dom"
import { Formik } from "formik"
import { LoginForm } from "./interfaces"
import { AUTH_LOGIN } from "../../redux-saga/actions"
import { AuthState } from "../../redux-saga/type"
import { State } from "../../redux-saga/reducers"


const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
})

export default function LoginPage() {

  const dispatch = useDispatch()
  const theme = useTheme()

  const navigate = useNavigate()

  const handleSubmit = (values: LoginForm) => {
    dispatch({ type: AUTH_LOGIN, payload: values });
    console.log(values);
    navigate("/")
  };
  const username = useSelector((state: State) => (state.login as any).username);
  console.log(username);
  const userInfo = useSelector((state: State) => state.logout);
  console.log(userInfo);
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
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
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
              // onClick={handleHome}
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
