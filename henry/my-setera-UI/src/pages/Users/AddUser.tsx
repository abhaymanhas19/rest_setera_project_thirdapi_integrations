
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Yup from 'yup';
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import colorConfigs from "../../configs/colorConfigs";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import AxiosMain from "../../components/layout/AxiosMain";
import { useNavigate } from "react-router-dom";
import LoaderScreen from "../../components/layout/LoaderScreen";

const AddUser = (props: any) => {
    const { setCustomTabs } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    //const dispatch = useDispatch();
    const [dropDownRole, setDropDownRole] = useState([]);
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
    const getDropDownData = async ({ url, saveData, config }: any) => {
        AxiosMain.get(url, config).then((res) => {
            if (res.status === 200 && res.data.count > 0) {
                saveData(res.data.results);
            }
        }).catch((e) => {
            console.log("Something went wrong while fetching data");
        })
    }
    useEffect(() => {
        if (dropDownRole.length === 0) {
            getDropDownData({ url: "/add-role/", saveData: setDropDownRole, config });
        }
        // eslint-disable-next-line
    }, []);

    const formSwalTranslation = {
        formSwalTitle: t("AreYouWanttoSave"),
        formSwalText: t("Youwontbeabletorevertthis"),
        fomrSwalCancel: t("Cancel"),
        formSwalSaved: t("YesSavedit"),
        formSwalDataSaved: t("YourDatahasbeensaved"),
        formSwalSubmited: t("Submited"),
        formSwalWrong: t("SomethingWentWrong"),
    };
    const AddUserSchema = Yup.object().shape({
        email: Yup.string().email().required('Required'),
        first_name: Yup.string().required('Required'),
        role: Yup.string().required('Required')
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            role: "",
        },
        validationSchema: AddUserSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            console.log("User Add ", values);
            AxiosMain.post("/add-user/", values, config).then((res) => {
                if (res.status === 201) {
                    Swal.fire({
                        title: formSwalTranslation.formSwalSubmited,
                        text: formSwalTranslation.formSwalDataSaved,
                        icon: "success"
                    });
                    setIsLoading(false);
                    formik.resetForm();
                    setCustomTabs(0);
                }
            }).catch((e) => {
                console.log("error ", e);
                const { response } = e;
                if (response.status === 400) {
                    const { email } = response.data;
                    if (email.length > 0) {
                        Swal.fire({
                            title: "Error",
                            text: email[0],
                            icon: "error"
                        });
                    }
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: formSwalTranslation.formSwalWrong,
                        icon: "error"
                    });
                }
            })
        },
    });
    return (
        <>
            <div className="cm-user-tabs-wrapper  cm-global-tabs-wrapper">
                <div className="cm-user-name-wrap">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <div className="fw-600">{t("AddUser")}</div>
                    </Stack>
                </div>
                <div className="cm-user-form-wrap">
                    {isLoading ?
                        <LoaderScreen />
                        : (
                            <Box sx={{ width: "100%" }}>
                        <Box className="cm-global-tabs-content">

                            <form onSubmit={formik.handleSubmit}>
                                <Box className="cm-global-tab-inner-content">
                                    <Grid container spacing={5}>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Box className="cm-form-inner-fields">
                                                <Box className="form-mb-30">
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container spacing={3}>
                                                        <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("FirstName")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="first_name"
                                                                            name="first_name"
                                                                            variant="outlined"
                                                                            value={formik.values.first_name}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                        />
                                                                    </FormControl>
                                                                    {formik.errors.first_name && formik.touched.first_name && <p className="cm-form-error">{formik.errors.first_name}</p>}
                                                                </Box>
                                                            </Grid>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("email")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="email"
                                                                            name="email"
                                                                            variant="outlined"
                                                                            value={formik.values.email}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                        />
                                                                    </FormControl>
                                                                    {formik.errors.email && formik.touched.email && <p className="cm-form-error">{formik.errors.email}</p>}
                                                                </Box>
                                                            </Grid>
                                                            

                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("Role")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <Select
                                                                            className="form-select-pad"
                                                                            id="role"
                                                                            name="role"
                                                                            label=""
                                                                            value={
                                                                                formik.values.role
                                                                            }
                                                                            onChange={formik.handleChange}
                                                                        >
                                                                            <MenuItem value="">Choose Option</MenuItem>
                                                                            {dropDownRole.length > 0 && (
                                                                                dropDownRole.map((val: any) => (
                                                                                    <MenuItem key={`user-carrier-data--${val.id}`} value={val.id}>{val.name}</MenuItem>
                                                                                ))
                                                                            )}
                                                                        </Select>
                                                                    </FormControl>
                                                                    {formik.errors.role && formik.touched.role && <p className="cm-form-error">{formik.errors.role}</p>}
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                                {/* Button save changes and Discard */}
                                <Box sx={{ marginTop: "40px" }}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        justifyContent={"start"}
                                        className="form-submit-cancel-btn-wrapper"
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            endIcon={<CheckCircleIcon />}
                                            className="cm-btn-style"
                                            sx={{
                                                color: colorConfigs.btnColor.hoverbgWhite,
                                                background: colorConfigs.btnColor.bgColorGreen,
                                                "&: hover": {
                                                    color: colorConfigs.btnColor.bgColorGreen,
                                                    background: colorConfigs.btnColor.hoverbgWhite,
                                                },
                                            }}
                                        >
                                            {t("saveChanges")}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            endIcon={<CancelIcon />}
                                            className="cm-btn-style"
                                            sx={{
                                                color: colorConfigs.btnColor.hoverbgWhite,
                                                background: colorConfigs.btnColor.bgColorRed,
                                                "&: hover": {
                                                    color: colorConfigs.btnColor.bgColorRed,
                                                    background: colorConfigs.btnColor.hoverbgWhite,
                                                },
                                            }}
                                            onClick={() => setCustomTabs(0)}
                                        >
                                            {t("discard")}
                                        </Button>
                                    </Stack>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                        )}


                </div>
            </div>
        </>
    );
}
export default AddUser;