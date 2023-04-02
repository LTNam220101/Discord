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
import { useDispatch } from "react-redux"
import * as yup from "yup"
import { Link as LinkDom } from "react-router-dom"
import { Formik } from "formik"
import { LoginForm } from "./interfaces"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

export default function LoginPage() {
  const dispatch = useDispatch()
  const theme = useTheme()

  const navigate = useNavigate()

  const handleSubmit = (values: LoginForm) => {
    console.log(values)
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
          initialValues={{ email: "", password: "" } as LoginForm}
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
                label="Email address"
                autoComplete="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
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
