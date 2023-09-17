import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import assets from '../../assets';
import { Button } from '@mui/material';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import Swal from 'sweetalert2'
import Stack from '@mui/material/Stack';
import AxiosMain from '../../components/layout/AxiosMain';
import { useDispatch } from 'react-redux';
import { setAuthState } from '../../redux/features/authStateSlice';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import PhoneIcon from '@mui/icons-material/Phone';
import jwt_decode from "jwt-decode";
import FormikLayout from '../../components/layout/FormikLayout';
type Props = {};
const LoginPage = (props: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isOTPScreen, setOTPScreen] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [otpToken, setOptToken] = useState("");
  // const checkUser = useSelector(
  //   (state: RootState) => state.authState.authState
  // );
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const formSwalTranslation = {
    formSwalTitle: t('SomethingWentWrong'),
    formSwalText: t('CheckYourLoginsDetailsInternet'),
  }
  const loginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "djangotestapi123@yopmail.com",
      password: "admiN@123",
      remember: false
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      //setOTPScreen(true);
      const { email, password } = values;
      const newVal = { email, password };
      AxiosMain.post('/login/', newVal)
        .then((val) => {
          const { data } = val;
          if (val.status === 200) {
            if (Object.keys(data).length > 0 && data.hasOwnProperty("token")) {
              setOptToken(data.token);
              setOTPScreen(true);
              const tokenExplore: any = jwt_decode(data.token);
              if (tokenExplore.hasOwnProperty("otp")) {
                console.log(tokenExplore.otp);
              }
            }
          }
        })
        .catch((e) => {
          const { response } = e;
          console.log("Token Response ", response);
          const { data } = response;
          if (data.hasOwnProperty("message")) {
            Swal.fire({
              title: "Error",
              text: e.response.data.message,
              icon: 'warning',
            })
          } else {
            Swal.fire({
              title: formSwalTranslation.formSwalTitle,
              text: formSwalTranslation.formSwalText,
              icon: 'warning',
            })
          }

        });
    },
  });
  const oTPSchema = Yup.object().shape({
    otp: Yup.string().required("Required").min(4, 'Min 4 digits Allow')
      .max(4, 'Max 5 digits Allow'),
  });
  const otpFormik = useFormik({
    initialValues: {
      otp: "",
      token: otpToken
    },
    validationSchema: oTPSchema,
    onSubmit: (values) => {
      AxiosMain.post('/otp-verify/', values)
        .then((val) => {
          console.log("OTP", val)
          if (val.status === 200) {
            const useroutput = {
              access: val.data.access,
              refresh: val.data.refresh,
              user: jwt_decode(val.data.access)
            }
            setOptToken("");
            setOTPScreen(false);
            dispatch(setAuthState(useroutput));
          }
        })
        .catch((e) => {
          const { response } = e;
          console.log("OTP Response ", response);
          if (response.status === 401) {
            const { data } = response;
            setOptToken("");
            setOTPScreen(false);
            if (data.hasOwnProperty("non_field_errors")) {
              Swal.fire({
                title: "Error",
                text: data.non_field_errors[0],
                icon: 'warning',
              })
            } else {
              Swal.fire({
                title: "Error",
                text: "Token has expired",
                icon: 'warning',
              })
              setOptToken("");
              setOTPScreen(false);
            }

          } else {
            Swal.fire({
              title: formSwalTranslation.formSwalTitle,
              text: formSwalTranslation.formSwalText,
              icon: 'warning',
            })
          }

        });
    },
  });

  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  const sendOtpAPI = (mobile: string) => {
    if (mobile !== '') {
      // AxiosMain.post('/mobile-otp/', { mobile: mobile }).then((val) => {
      //   if (val.status === 200) {
      //     console.log("OTP ", val.data.otp);
      //     if (val.data.hasOwnProperty("otp")) {
      //       formik.setFieldValue("otp", val.data.otp);
      //     }
      //   }
      // }).catch((e) => {
      //   console.log("Error While getting OTP");
      //   if (e.response.status === 400) {
      //     Swal.fire({
      //       title: "Error",
      //       text: e.response.data.mobile[0],
      //       icon: 'warning',
      //     })
      //   } else {
      //     Swal.fire({
      //       title: formSwalTranslation.formSwalTitle,
      //       text: formSwalTranslation.formSwalText,
      //       icon: 'warning',
      //     })
      //   }
      // });
    }
  }
  useEffect(() => {
    if (otpToken !== '') {
      otpFormik.setFieldValue("token", otpToken);
    }
  }, [otpToken])
  return (
    <section className="login-page-wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          className="cm-login-main-row"
          alignItems={"center"}
        >
          <Grid
            item
            lg={7}
            md={6}
            xs={12}
            style={{
              background: `linear-gradient(0deg, rgba(0, 24, 32, 0.81), rgba(0, 24, 32, 0.81)), url(${assets.images.loginBGImage})`,
            }}
            className="cm-col-login-bg cm-login-main-col"
          >
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              className="cm-login-row"
              alignItems="center"
            >
              <Grid item xs={12}>
                <div className="login-innter-content">
                  <h2>{t("login_leftfColTitle")}</h2>
                  <p>{t("login_leftColDescription")}</p>
                  <Button
                    variant="contained"
                    startIcon={
                      <Box
                        sx={{
                          flexGrow: 1,
                          background: "#fff",
                          borderRadius: "100%",
                          height: "30px",
                        }}
                      >
                        <PlayCircleFilledWhiteIcon
                          sx={{ color: "#007992" }}
                        />
                      </Box>
                    }
                    className="cm-login-btn-style"
                  >
                    {t("login_ButtonWatchText")}
                  </Button>
                </div>
              </Grid>
            </Grid>
            <p className="login-copyright">
              © 2021 - Setera | {t("privacy")} {t("Policy")}
            </p>
          </Grid>
          <Grid item lg={5} md={6} xs={12} className="cm-login-main-col">
            <div className="cm-login-form-wrap">
              {isOTPScreen ? (
                <>
                  <h2>2 step verification</h2>
                  <form onSubmit={otpFormik.handleSubmit} onKeyDown={onKeyDown}>
                    <Box sx={{ flexGrow: 1 }} className="form-mb-30">
                      <Grid container spacing={2}>
                        <Grid item xs={12} className="cm-form-grid-col">
                          <div className="form-lable-name">{t("Otp")}</div>
                          <FormControl sx={{ width: "100%" }}>
                            <TextField
                              className="cm-login-filed"
                              variant="outlined"
                              name="otp"
                              value={otpFormik.values.otp}
                              onChange={otpFormik.handleChange}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <LockOutlinedIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                            {otpFormik.errors.otp && otpFormik.touched.otp && (
                              <p className="cm-form-error">{otpFormik.errors.otp}</p>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        className="cm-form-grid-col"
                        sx={{ paddingTop: "18px !important" }}
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          justifyContent={"end"}
                        >
                          <Box sx={{ width: "100%", textAlign: "right" }}>
                            <Button
                              variant="text"
                              className="cm-forgot-pass-btn"
                              onClick={() => {
                                setOTPScreen(false);
                                setOptToken("");
                              }}
                            >Login
                            </Button>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} className="cm-form-grid-col">
                        <Box sx={{ marginTop: "20px" }}>
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            justifyContent={"start"}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              className="cm-login-submit-btn"
                            >
                              Send
                            </Button>
                          </Stack>
                        </Box>
                      </Grid>
                    </Box>

                  </form>
                </>
              ) : (
                <>
                  <h2>{t("login_FormTitle")}</h2>
                  <form onSubmit={formik.handleSubmit} onKeyDown={onKeyDown}>
                    <Box sx={{ flexGrow: 1 }} className="form-mb-30">
                      <Grid container spacing={2}>
                    <Grid item xs={12} className="cm-form-grid-col">
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">{t("email")}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            className="cm-login-filed"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <MailOutlineIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                          {formik.errors.email && formik.touched.email && (
                            <p className="cm-form-error">{formik.errors.email}</p>
                          )}
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} className="cm-form-grid-col">
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">{t("password")}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            className="cm-login-filed"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <LockOpenOutlinedIcon />
                                    ) : (
                                      <LockOutlinedIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          {formik.errors.password && formik.touched.password && (
                            <p className="cm-form-error">{formik.errors.password}</p>
                          )}
                        </FormControl>
                      </Box>
                          </Grid>
                    <Grid
                      item
                      xs={12}
                      className="cm-form-grid-col"
                      sx={{ paddingTop: "18px !important" }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent={"between"}
                      >
                        <Box sx={{ width: "100%" }}>
                          <FormControl sx={{ width: "100%" }}>
                            <FormControlLabel
                              className="form-checkbox-text"
                              control={
                                <Checkbox
                                  name="remember"
                                  checked={formik.values.remember}
                                  onChange={formik.handleChange}
                                />
                              }
                              label={t("rememberMe")}
                            />
                          </FormControl>
                        </Box>
                        <Box sx={{ width: "100%", textAlign: "right" }}>
                          <Button
                            variant="text"
                            className="cm-forgot-pass-btn"
                            onClick={() => navigate("/forgotPass")}
                          >
                            {t("forgotPassword")}
                          </Button>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ marginTop: "40px" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent={"start"}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      className="cm-login-submit-btn"
                    >
                      {t("signIn")}
                    </Button>
                  </Stack>
                </Box>
              </form>
                </>
              )}

            </div>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default LoginPage;