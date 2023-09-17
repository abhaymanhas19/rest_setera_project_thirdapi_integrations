import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import assets from "../../assets";
import { Button } from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import Stack from "@mui/material/Stack";
import AxiosMain from "../../components/layout/AxiosMain";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';

type Props = {};
const ResetPasswordPage = (props: Props) => {
  const { customToken } = useParams();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const navigate = useNavigate();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  //Validation 
  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .matches(/[0-9]/, 'Password requires a number')
      .matches(/[a-z]/, 'Password requires a lowercase letter')
      .matches(/[A-Z]/, 'Password requires an uppercase letter')
      .matches(/[^\w]/, 'Password requires a symbol'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  const formSwalTranslation = {
    formSwalTitle: t("SomethingWentWrong"),
    formSwalText: t("CheckYourLoginsDetailsInternet"),
    fomrSWalPassword: t("PasswordSuccefullyChanged"),
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
      token: customToken
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log("Reset Pas", values);
      AxiosMain.post(`/confirm/${customToken}/`, values)
        .then((val) => {
          if (val.data.status === 'OK') {
            Swal.fire({
              text: formSwalTranslation.fomrSWalPassword,
              icon: 'success',
              confirmButtonColor: '#103256',
              confirmButtonText: "OK",
              allowOutsideClick: false
            }).then((result) => {
              navigate("/");
            })
          }
          else {
            Swal.fire({
              title: formSwalTranslation.formSwalTitle,
              text: formSwalTranslation.formSwalText,
              icon: "warning",
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            title: formSwalTranslation.formSwalTitle,
            text: formSwalTranslation.formSwalText,
            icon: "warning",
          });
        });
    },
  });
  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };
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
                        <PlayCircleFilledWhiteIcon sx={{ color: "#007992" }} />
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
              <h2>{t("resetPass_FormTitle")}</h2>
              <form onSubmit={formik.handleSubmit} onKeyDown={onKeyDown}>
                <Box sx={{ flexGrow: 1 }} className="form-mb-30">
                  <Grid container spacing={2}>
                    <Grid item xs={12} className="cm-form-grid-col">
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">
                          {t("New password")}
                        </div>
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
                        </FormControl>
                        {formik.errors.password && <p className="cm-form-error">{formik.errors.password}</p>}
                      </Box>
                    </Grid>

                    <Grid item xs={12} className="cm-form-grid-col">
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">
                          {t("Confirm password")}
                        </div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            className="cm-login-filed"
                            type={showConfirmPassword ? "text" : "password"}
                            variant="outlined"
                            name="confirm_password"
                            value={formik.values.confirm_password}
                            onChange={formik.handleChange}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? (
                                      <LockOpenOutlinedIcon />
                                    ) : (
                                      <LockOutlinedIcon />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                        {formik.errors.confirm_password && <p className="cm-form-error">{formik.errors.confirm_password}</p>}
                      </Box>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      className="cm-form-grid-col"
                      sx={{ paddingTop: "18px !important" }}
                    ></Grid>
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
                      {t("submit  ")}
                    </Button>
                  </Stack>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default ResetPasswordPage;
