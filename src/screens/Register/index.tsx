import { useEffect, useState } from "react"
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
import { ErrorMessage, Formik } from "formik"
import { RegisterForm } from "./interfaces"
import { register } from "../../redux-saga/reducers/Authen/SignUp/actions"
import { State } from "../../redux-saga/reducers"

const schema = yup.object().shape({
  username: yup.string().email().required(),
  password: yup.string().required(),
  repass: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password must match")
  // name: yup.string().required()
})

export default function Register({ user }: any) {
  if (user) {
    return <Navigate to={"/"} replace />
  }
  const theme = useTheme()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const registerResult = useSelector((state: State) => state.registerResult)
  const [err, setErr] = useState<null | string>(null)

  useEffect(() => {
    if (registerResult) {
      if (registerResult.success) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      } else {
        setErr(registerResult.response?.message as string)
      }
    }
  }, [registerResult])

  const handleSubmit = (values: RegisterForm) => {
    dispatch(register(values))
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
          initialValues={
            {
              username: "",
              password: "",
              repass: ""
              // name: ""
            } as RegisterForm
          }
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
              {/* <TextField
                margin="normal"
                required
                fullWidth
                label="User name"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
                autoFocus
              /> */}
              {err && <Alert severity="error">{err}</Alert>}
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email address"
                autoComplete="email"
                onChange={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="string"
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Comfirm password"
                type="password"
                onChange={handleChange("repass")}
                onBlur={handleBlur("repass")}
                value={values.repass}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={LinkDom} to="/login" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Box>
    </Container>
  )
}
