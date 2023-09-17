import React from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import assets from "../../assets";
import { useNavigate } from "react-router-dom";
import AxiosMain from "../../components/layout/AxiosMain";
import Swal from "sweetalert2";
import * as Yup from 'yup';
type Props = {};
const ForgetPasswordPage = (props: Props) => {

  const navigate = useNavigate();
  const { t } = useTranslation();

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
  });
  const formSwalTranslation = {
    formSwalTitle: t("SomethingWentWrong"),
    formSwalSucccesTitle: t("Checkyouremail"),
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      AxiosMain.post("/password_reset/", values).then((val) => {
        if (val.data.status === 'OK') {
          Swal.fire({
            text: formSwalTranslation.formSwalSucccesTitle,
            icon: 'success',
            confirmButtonColor: '#103256',
            confirmButtonText: "OK",
            allowOutsideClick: false
          }).then((result) => {
            navigate("/");
          })
        }
      }).catch((e) => {
        if (e.response.status === 400) {
          const msg = e.response.data.email;
          Swal.fire({
            title: formSwalTranslation.formSwalTitle,
            text: msg[0],
            icon: 'warning',
          })
        }
        else {
          Swal.fire({
            title: formSwalTranslation.formSwalTitle,
            icon: 'warning',
          })
        }
      })
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
              <h2>{t("forgotPass_FormTitle")}</h2>
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
                        </FormControl>
                        {formik.errors.email && <p className="cm-form-error">{formik.errors.email}</p>}
                      </Box>
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
                      {t("submit")}
                    </Button>
                  </Stack>
                </Box>
                <Box
                  sx={{ width: "100%", textAlign: "center", marginTop: "10px" }}
                >
                  <Button
                    variant="text"
                    onClick={() => navigate("/")}
                    className="cm-forgot-pass-btn"
                  >
                    {t("back to login")}
                  </Button>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </section>
  );
};

export default ForgetPasswordPage;
