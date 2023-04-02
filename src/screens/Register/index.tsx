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
import { RegisterForm } from "./interfaces"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordCfm: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password must match"),
  name: yup.string().required()
})

export default function Register() {
  const dispatch = useDispatch()
  const theme = useTheme()

  const handleSubmit = (values: RegisterForm) => {
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
          initialValues={
            {
              email: "",
              password: "",
              passwordCfm: "",
              name: ""
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
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full name"
                onChange={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email address"
                autoComplete="email"
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
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
              <TextField
                margin="normal"
                required
                fullWidth
                label="Comfirm password"
                type="password"
                onChange={handleChange("passwordCfm")}
                onBlur={handleBlur("passwordCfm")}
                value={values.passwordCfm}
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
