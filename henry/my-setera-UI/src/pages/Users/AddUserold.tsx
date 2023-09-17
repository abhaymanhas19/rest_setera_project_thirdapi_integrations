
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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import AxiosMain from "../../components/layout/AxiosMain";

type Props = {};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const AddUser = (props: any) => {
    const { setCustomTabs } = props;
    const { t, i18n } = useTranslation();
    const [customTabValue, setCustomTabValue] = useState(0);
    const { appCountry } = useSelector((state: RootState) => state.appState);
    const dispatch = useDispatch();
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const menurganization = useSelector((state: RootState) => state.organisation.organizationState);
    const [form_did_number_Value, setform_did_number_Value] = useState("");
    const [dropDownMBProduct, setDropDownMBProduct] = useState([]);
    const [dropDownVoice, setDropDownVoice] = useState([]);
    const [dropDownSMS, setDropDownSMS] = useState([]);
    const [dropDownMMS, setDropDownMMS] = useState([]);
    const [dropDownData, setDropDownData] = useState([]);
    const [dropDownRoaming, setDropDownRoaming] = useState([]);
    const [dropDownRoamingData, setDropDownRoamingData] = useState([]);
    const [dropDownCarrier, setDropDownCarrier] = useState([]);
    const [dropDownSim, setDropDownSim] = useState([]);
    const [dropDownUsers, setDropDownUsers] = useState([]);
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
        if (dropDownVoice.length === 0) {
            getDropDownData({ url: "/mobile/barring-voice/", saveData: setDropDownVoice, config });
        }
        if (dropDownSMS.length === 0) {
            getDropDownData({ url: "/mobile/barring-sms/", saveData: setDropDownSMS, config });
        }
        if (dropDownMMS.length === 0) {
            getDropDownData({ url: "/mobile/barring-mms/", saveData: setDropDownMMS, config });
        }
        if (dropDownData.length === 0) {
            getDropDownData({ url: "/mobile/barring-data/", saveData: setDropDownData, config });
        }
        if (dropDownRoaming.length === 0) {
            getDropDownData({ url: "/mobile/barring-roaming/", saveData: setDropDownRoaming, config });
        }
        if (dropDownRoamingData.length === 0) {
            getDropDownData({ url: "/mobile/barring-roaming-data/", saveData: setDropDownRoamingData, config });
        }
        if (dropDownSim.length === 0) {
            getDropDownData({ url: "/mobile/sim/", saveData: setDropDownSim, config });
        }
        if (dropDownMBProduct.length === 0) {
            getDropDownData({ url: "/mobile/mobile-product/", saveData: setDropDownMBProduct, config });
        }
        if (dropDownCarrier.length === 0) {
            getDropDownData({ url: "/mobile/carrier/", saveData: setDropDownCarrier, config });
        }
        if (dropDownUsers.length === 0) {
            getDropDownData({ url: "/users/", saveData: setDropDownUsers, config });
        }
    }, []);

    const formSwalTranslation = {
        formSwalTitle: t("AreYouWanttoSave"),
        formSwalText: t("Youwontbeabletorevertthis"),
        fomrSwalCancel: t("Cancel"),
        formSwalSaved: t("YesSavedit"),
        formSwalDataSaved: t("YourDatahasbeensaved"),
        formSwalSubmited: t("Submited"),
    };
    const AddUserSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        form_did_number: Yup.string().required('Required'),
        form_mobile_product: Yup.string().required('Required'),
        form_voice: Yup.string().required('Required'),
        form_sms: Yup.string().required('Required'),
        form_mms: Yup.string().required('Required'),
        form_data: Yup.string().required('Required'),
        form_roaming: Yup.string().required('Required'),
        form_roaming_data: Yup.string().required('Required'),
        form_carrier: Yup.string().required('Required'),
        form_sim: Yup.string().required('Required'),
        form_user: Yup.string().required('Required')
    });
    const formik = useFormik({
        initialValues: {
            name: "",
            form_did_number: form_did_number_Value,
            form_mobile_product: "",
            form_voice: "",
            form_sms: "",
            form_mms: "",
            form_data: "",
            form_roaming: "",
            form_roaming_data: "",
            form_carrier: "",
            form_sim: "",
            form_user: "",
            form_organisation: ""
        },
        validationSchema: AddUserSchema,
        onSubmit: (values) => {
            console.log(values);
            const APiValues = {
                "number": values.form_did_number,
                "name": values.name,
                "organization": values.form_organisation,
                "sim": values.form_sim,
                "carrier": values.form_carrier,
                "mobile_product": values.form_mobile_product,
                "barring_voice": values.form_voice,
                "barring_mms": values.form_mms,
                "barring_sms": values.form_sms,
                "barring_roaming": values.form_roaming,
                "barring_data": values.form_data,
                "barring_roamingdata": values.form_roaming_data,
            };
            AxiosMain.post("/mobile/subscription/", APiValues, config).then((res) => {
                console.log(res);
                if (res.status === 201) {
                    Swal.fire(
                        formSwalTranslation.formSwalSubmited,
                        formSwalTranslation.formSwalDataSaved,
                        "success"
                    );
                    formik.resetForm();
                    setCustomTabs(0);
                }
            }).catch((e) => {
                console.log("error ", e);
            })
            // Swal.fire({
            //     title: formSwalTranslation.formSwalTitle,
            //     text: formSwalTranslation.formSwalText,
            //     icon: "warning",
            //     cancelButtonText: formSwalTranslation.fomrSwalCancel,
            //     showCancelButton: true,
            //     confirmButtonColor: "#103256",
            //     cancelButtonColor: "#d33",
            //     confirmButtonText: formSwalTranslation.formSwalSaved,
            // }).then((result) => {
            //     if (result.isConfirmed) {
            //         Swal.fire(
            //             formSwalTranslation.formSwalSubmited,
            //             formSwalTranslation.formSwalDataSaved,
            //             "success"
            //         );
            //     }
            // });
        },
    });

    const formikOncluld = useFormik({
        initialValues: {
            form_onclould_first_name: "",
            form_onclould_last_name: "",
            form_onclould_department: "",
            form_onclould_email: "",
            form_onclould_user_ident_telephony_inteigration: "",
            form_onclould_destination_line: "",
            form_onclould_user_role: "",
            form_onclould_organisation: "",
            form_onclould_role: "",
            form_onclould_country: "",
            form_onclould_mobile_client_number: "",
            form_onclould_user_group_membership: "",
            form_onclould_secondary_line: "",
            form_onclould_uprimary_line: "",
            form_onclould_all_linked_organisation: false,
            form_onclould_own_organisation: false,
            form_onclould_lic_mobile_voip: false,
            form_onclould_lic_mobile: false,
            form_onclould_lic_softphone: false,
            form_onclould_admin_role_ipad: false,
            form_onclould_admin_role_premium_supervision: false,
            form_onclould_admin_role_premium_attendant: false,
            form_onclould_admin_role_call_control_api: false,
            form_onclould_admin_role_cloud_cti_api: false,
            form_onclould_admin_role_call_recording: false,
            form_onclould_admin_role_line_state_api: false,
            form_onclould_admin_role_3rd_party_crm_connector: false,
            form_onclould_admin_role_miteam_collaboration: false,
            form_onclould_admin_role_unified_inbox: false,
            form_onclould_admin_role_teams_application: false,
            form_onclould_change_intigration: "no",
            form_onclould_external_telephony_system_intigration: "no",
            form_onclould_two_factor_auth: "no",
            form_onclould_mobile_number: "",
        },
        onSubmit: (values) => {
            console.log("OnClould Data ", values);
            Swal.fire({
                title: formSwalTranslation.formSwalTitle,
                text: formSwalTranslation.formSwalText,
                icon: "warning",
                cancelButtonText: formSwalTranslation.fomrSwalCancel,
                showCancelButton: true,
                confirmButtonColor: "#103256",
                cancelButtonColor: "#d33",
                confirmButtonText: formSwalTranslation.formSwalSaved,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        formSwalTranslation.formSwalSubmited,
                        formSwalTranslation.formSwalDataSaved,
                        "success"
                    );
                }
            });
        },
    });

    const customTabHandleChange = (newValue: number) => {
        setCustomTabValue(newValue);
    };
    return (
        <>
            <div className="cm-user-tabs-wrapper  cm-global-tabs-wrapper">
                <div className="cm-user-name-wrap">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <div className="fw-600">{t("AddUser")}</div>
                    </Stack>
                </div>
                <div className="cm-user-form-wrap">

                    <Box sx={{ width: "100%" }}>
                        <Box sx={{ paddingBottom: "15px", position: "relative" }}>
                            <Tabs
                                value={customTabValue}
                                aria-label="Custom-User-Tabs"
                                sx={{ overflow: "visible" }}
                                className="cm-global-tabs-component"
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    className="cm-global-tab-btn-wrapper"
                                >
                                    <Button
                                        variant="outlined"
                                        {...a11yProps(0)}
                                        onClick={() => customTabHandleChange(0)}
                                        className={
                                            customTabValue === 0
                                                ? "cm-global-tab-btn tab-active ff-popins"
                                                : "cm-global-tab-btn ff-popins"
                                        }
                                    >
                                        {t("phonenumber")}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        {...a11yProps(1)}
                                        onClick={() => customTabHandleChange(1)}
                                        className={
                                            customTabValue === 1
                                                ? "cm-global-tab-btn tab-active ff-popins"
                                                : "cm-global-tab-btn ff-popins"
                                        }
                                    >
                                        {t("mobile")}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        {...a11yProps(2)}
                                        onClick={() => customTabHandleChange(2)}
                                        className={
                                            customTabValue === 2
                                                ? "cm-global-tab-btn tab-active ff-popins"
                                                : "cm-global-tab-btn ff-popins"
                                        }
                                    >
                                        {t("onecloudSettings")}
                                    </Button>
                                </Stack>
                            </Tabs>
                        </Box>

                        <Box className="cm-global-tabs-content">
                            <TabPanel value={customTabValue} index={0}>
                                {customTabValue === 0 && (
                                    <>
                                        <Box className="cm-global-tab-inner-content">
                                            <Box className="cm-form-inner-fields">
                                                <Box className="">
                                                    <div className="form-lable-name">
                                                        {t("didNumber")}
                                                    </div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            id="form_did_number"
                                                            name="form_did_number"
                                                            variant="outlined"
                                                            value={form_did_number_Value}
                                                            onChange={(e) => { formik.handleChange(e); formik.setFieldValue("form_did_number", e.target.value); setform_did_number_Value(e.target.value) }}
                                                        />
                                                    </FormControl>
                                                    {formik.errors.form_did_number && <p className="cm-form-error">{formik.errors.form_did_number}</p>}
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ marginTop: "40px" }}>
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                alignItems="center"
                                                justifyContent={"start"}
                                                className="form-submit-cancel-btn-wrapper"
                                            >
                                                <Button
                                                    variant="contained"
                                                    endIcon={<CheckCircleIcon />}
                                                    className="cm-btn-style "
                                                    sx={{
                                                        color: colorConfigs.btnColor.hoverbgWhite,
                                                        background: colorConfigs.btnColor.bgColorGreen,
                                                        "&: hover": {
                                                            color: colorConfigs.btnColor.bgColorGreen,
                                                            background: colorConfigs.btnColor.hoverbgWhite,
                                                        },
                                                    }}
                                                    onClick={() => customTabHandleChange(1)}
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
                                    </>
                                )}
                            </TabPanel>

                            <TabPanel value={customTabValue} index={1}>
                                {customTabValue === 1 && (
                                    <>
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
                                                                                    {t("name")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <TextField
                                                                                        id="form_name"
                                                                                        name="name"
                                                                                        variant="outlined"
                                                                                        value={formik.values.name}
                                                                                        onChange={formik.handleChange}
                                                                                        onBlur={formik.handleBlur}
                                                                                    />
                                                                                </FormControl>
                                                                                {formik.errors.name && formik.touched.name && <p className="cm-form-error">{formik.errors.name}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("MobileProduct")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_mobile_product"
                                                                                        name="form_mobile_product"
                                                                                        label=""
                                                                                        value={
                                                                                            formik.values.form_mobile_product
                                                                                        }
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownMBProduct.length > 0 && (
                                                                                            dropDownMBProduct.map((val: any) => (
                                                                                                <MenuItem key={`uservoice-${val.id}`} value={val.id}>{val.name}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_mobile_product && formik.touched.form_mobile_product && <p className="cm-form-error">{formik.errors.form_mobile_product}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </Box>
                                                            <Box className="form-mb-30">
                                                                <div className="form-row-title">
                                                                    {t("barrings")}
                                                                </div>
                                                                <Box sx={{ flexGrow: 1 }}>
                                                                    <Grid container spacing={3}>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("Voice")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_voice"
                                                                                        name="form_voice"
                                                                                        label=""
                                                                                        value={formik.values.form_voice}
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownVoice.length > 0 && (
                                                                                            dropDownVoice.map((val: any) => (
                                                                                                <MenuItem key={`uservoice-${val.id}`} value={val.id}>{val.operator_code}</MenuItem>
                                                                                            ))
                                                                                        )}

                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_voice && formik.touched.form_voice && <p className="cm-form-error">{formik.errors.form_voice}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("SMS")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_sms"
                                                                                        name="form_sms"
                                                                                        label=""
                                                                                        value={formik.values.form_sms}
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownSMS.length > 0 && (
                                                                                            dropDownSMS.map((val: any) => (
                                                                                                <MenuItem key={`user-sms-${val.id}`} value={val.id}>{val.operator_code}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_sms && formik.touched.form_sms && <p className="cm-form-error">{formik.errors.form_sms}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("MMS")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_mms"
                                                                                        name="form_mms"
                                                                                        label=""
                                                                                        value={formik.values.form_mms}
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownMMS.length > 0 && (
                                                                                            dropDownMMS.map((val: any) => (
                                                                                                <MenuItem key={`user-mms-${val.id}`} value={val.id}>{val.operator_code}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_mms && formik.touched.form_mms && <p className="cm-form-error">{formik.errors.form_mms}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("Data")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_data"
                                                                                        name="form_data"
                                                                                        label=""
                                                                                        value={formik.values.form_data}
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownData.length > 0 && (
                                                                                            dropDownData.map((val: any) => (
                                                                                                <MenuItem key={`user-data--${val.id}`} value={val.id}>{val.operator_code}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_data && formik.touched.form_data && <p className="cm-form-error">{formik.errors.form_data}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("Roaming")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_roaming"
                                                                                        name="form_roaming"
                                                                                        label=""
                                                                                        value={formik.values.form_roaming}
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownRoaming.length > 0 && (
                                                                                            dropDownRoaming.map((val: any) => (
                                                                                                <MenuItem key={`user-roaming-${val.id}`} value={val.id}>{val.operator_code}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_roaming && formik.touched.form_roaming && <p className="cm-form-error">{formik.errors.form_roaming}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("RoamingData")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_roaming_data"
                                                                                        name="form_roaming_data"
                                                                                        label=""
                                                                                        value={
                                                                                            formik.values.form_roaming_data
                                                                                        }
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownRoamingData.length > 0 && (
                                                                                            dropDownRoamingData.map((val: any) => (
                                                                                                <MenuItem key={`user-roaming-data--${val.id}`} value={val.id}>{val.operator_code}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_roaming_data && formik.touched.form_roaming_data && <p className="cm-form-error">{formik.errors.form_roaming_data}</p>}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("Carrier")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_carrier"
                                                                                        name="form_carrier"
                                                                                        label=""
                                                                                        value={
                                                                                            formik.values.form_carrier
                                                                                        }
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownCarrier.length > 0 && (
                                                                                            dropDownCarrier.map((val: any) => (
                                                                                                <MenuItem key={`user-carrier-data--${val.id}`} value={val.id}>{val.name}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_carrier && formik.touched.form_carrier && (
                                                                                    <p className="cm-form-error">{`${formik.errors.form_carrier}`}</p>
                                                                                )}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("SIM")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_sim"
                                                                                        name="form_sim"
                                                                                        label=""
                                                                                        value={
                                                                                            formik.values.form_sim
                                                                                        }
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownSim.length > 0 && (
                                                                                            dropDownSim.map((val: any) => (
                                                                                                <MenuItem key={`user-carrier-data--${val.id}`} value={val.id}>{val.sim_type}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_sim && formik.touched.form_sim && (
                                                                                    <p className="cm-form-error">{`${formik.errors.form_sim}`}</p>
                                                                                )}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("sidebar_Users")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_user"
                                                                                        name="form_user"
                                                                                        label=""
                                                                                        value={
                                                                                            formik.values.form_user
                                                                                        }
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {dropDownUsers.length > 0 && (
                                                                                            dropDownUsers.map((val: any) => (
                                                                                                <MenuItem key={`user-carrier-data--${val.id}`} value={val.id}>{val.first_name}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_user && formik.touched.form_user && (
                                                                                    <p className="cm-form-error">{`${formik.errors.form_user}`}</p>
                                                                                )}
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                <div className="form-lable-name">
                                                                                    {t("Organisation")}
                                                                                </div>
                                                                                <FormControl sx={{ width: "100%" }}>
                                                                                    <Select
                                                                                        className="form-select-pad"
                                                                                        id="form_organisation"
                                                                                        name="form_organisation"
                                                                                        label=""
                                                                                        value={
                                                                                            formik.values.form_organisation
                                                                                        }
                                                                                        onChange={formik.handleChange}
                                                                                    >
                                                                                        <MenuItem value="">Choose Option</MenuItem>
                                                                                        {menurganization.length > 0 && (
                                                                                            menurganization.map((val: any) => (
                                                                                                <MenuItem key={`user-organisation-data--${val.id}`} value={val.id}>{val.name}</MenuItem>
                                                                                            ))
                                                                                        )}
                                                                                    </Select>
                                                                                </FormControl>
                                                                                {formik.errors.form_user && formik.touched.form_user && (
                                                                                    <p className="cm-form-error">{`${formik.errors.form_user}`}</p>
                                                                                )}
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
                                    </>
                                )}
                            </TabPanel>

                            <TabPanel value={customTabValue} index={2}>
                                {customTabValue === 2 && (
                                    <><form onSubmit={formikOncluld.handleSubmit}>
                                        <Box className="cm-global-tab-inner-content">
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
                                                                            id="form_onclould_first_name"
                                                                            name="form_onclould_first_name"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values.form_onclould_first_name
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("LastName")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_last_name"
                                                                            name="form_onclould_last_name"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values.form_onclould_last_name
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("Department")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_department"
                                                                            name="form_onclould_department"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values.form_onclould_department
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("EmailAddress")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_email"
                                                                            name="form_onclould_email"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values.form_onclould_email
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container spacing={3}>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("Role")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_role"
                                                                            name="form_onclould_role"
                                                                            variant="outlined"
                                                                            value={formikOncluld.values.form_onclould_role}
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("Country")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_country"
                                                                            name="form_onclould_country"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values.form_onclould_country
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("Organisation")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_organisation"
                                                                            name="form_onclould_organisation"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values.form_onclould_organisation
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("UserRole")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <Select
                                                                            className="form-select-pad"
                                                                            id="form_onclould_user_role"
                                                                            name="form_onclould_user_role"
                                                                            label=""
                                                                            value={
                                                                                formikOncluld.values.form_onclould_user_role
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        >
                                                                            <MenuItem value={10}>Ten</MenuItem>
                                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("AdministratorRole")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="form_onclould_own_organisation"
                                                                                    checked={
                                                                                        formikOncluld.values.form_onclould_own_organisation
                                                                                    }
                                                                                    onChange={formikOncluld.handleChange}
                                                                                />
                                                                            }
                                                                            label={t("ManageOnlyOwnOrganization")}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name"></div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="form_onclould_all_linked_organisation"
                                                                                    checked={
                                                                                        formikOncluld.values
                                                                                            .form_onclould_all_linked_organisation
                                                                                    }
                                                                                    onChange={formikOncluld.handleChange}
                                                                                />
                                                                            }
                                                                            label={t(
                                                                                "ManageAllLinkedOrganizations"
                                                                            )}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("UserGroupMembership")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <Select
                                                                            className="form-select-pad"
                                                                            id="form_onclould_user_group_membership"
                                                                            name="form_onclould_user_group_membership"
                                                                            label=""
                                                                            value={
                                                                                formikOncluld.values
                                                                                    .form_onclould_user_group_membership
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        >
                                                                            <MenuItem value={10}>Ten</MenuItem>
                                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("PrimaryLine")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <Select
                                                                            className="form-select-pad"
                                                                            id="form_onclould_uprimary_line"
                                                                            name="form_onclould_uprimary_line"
                                                                            label=""
                                                                            value={
                                                                                formikOncluld.values
                                                                                    .form_onclould_uprimary_line
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        >
                                                                            <MenuItem value={10}>Ten</MenuItem>
                                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("SecondaryLine")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <Select
                                                                            className="form-select-pad"
                                                                            id="form_onclould_secondary_line"
                                                                            name="form_onclould_secondary_line"
                                                                            label=""
                                                                            value={
                                                                                formikOncluld.values
                                                                                    .form_onclould_secondary_line
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        >
                                                                            <MenuItem value={10}>Ten</MenuItem>
                                                                            <MenuItem value={20}>Twenty</MenuItem>
                                                                            <MenuItem value={30}>Thirty</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <Grid container spacing={2}>
                                                        <Grid item md={12} lg={7} sm={12}>
                                                            <Box className="form-mb-30">
                                                                <Grid container spacing={2}>
                                                                    <Grid item md={4} lg={4} sm={4} xs={12}>
                                                                        <Box sx={{ width: "100%" }}>
                                                                            <div className="form-lable-name">
                                                                                {t("licenses")}
                                                                            </div>
                                                                            <FormControl sx={{ width: "100%" }}>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            name="form_onclould_lic_softphone"
                                                                                            checked={
                                                                                                formikOncluld.values
                                                                                                    .form_onclould_lic_softphone
                                                                                            }
                                                                                            onChange={formikOncluld.handleChange}
                                                                                        />
                                                                                    }
                                                                                    label="Softphone"
                                                                                />
                                                                            </FormControl>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item md={4} lg={4} sm={4} xs={12}>
                                                                        <Box sx={{ width: "100%" }}>
                                                                            <div className="form-lable-name"></div>
                                                                            <FormControl sx={{ width: "100%" }}>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            name="form_onclould_lic_mobile"
                                                                                            checked={
                                                                                                formikOncluld.values
                                                                                                    .form_onclould_lic_mobile
                                                                                            }
                                                                                            onChange={formikOncluld.handleChange}
                                                                                        />
                                                                                    }
                                                                                    label={t("mobile")}
                                                                                />
                                                                            </FormControl>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item md={4} lg={4} sm={4} xs={12}>
                                                                        <Box sx={{ width: "100%" }}>
                                                                            <div className="form-lable-name"></div>
                                                                            <FormControl sx={{ width: "100%" }}>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            name="form_onclould_lic_mobile_voip"
                                                                                            checked={
                                                                                                formikOncluld.values
                                                                                                    .form_onclould_lic_mobile_voip
                                                                                            }
                                                                                            onChange={formikOncluld.handleChange}
                                                                                        />
                                                                                    }
                                                                                    label={t("MobileVoip")}
                                                                                />
                                                                            </FormControl>
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                                <Stack direction="row" spacing={3}>
                                                                    {/* <Box sx={{width:"100%"}}>
                                      <div className='form-lable-name'>Licenses</div>
                                      <FormControl sx={{ width:"100%"}}>
                                        <FormControlLabel
                                          control={
                                          <Checkbox 
                                          name="form_onclould_lic_softphone"
                                          checked={formik.values.form_onclould_lic_softphone}
                                          onChange={formik.handleChange} />}
                                          label="Softphone" />
                                      </FormControl>
                                    </Box> */}
                                                                    {/* <Box sx={{width:"100%"}}>
                                      <div className='form-lable-name'></div>
                                      <FormControl sx={{ width:"100%"}}>
                                      <FormControlLabel
                                        control={
                                        <Checkbox 
                                        name="form_onclould_lic_mobile"
                                        checked={formik.values.form_onclould_lic_mobile}
                                        onChange={formik.handleChange} />}
                                        label="Mobile" />
                                    </FormControl>
                                    </Box> */}
                                                                    {/* <Box sx={{width:"100%"}}>
                                      <div className='form-lable-name'></div>
                                      <FormControl sx={{ width:"100%"}}>
                                        <FormControlLabel
                                          control={
                                          <Checkbox 
                                          name="form_onclould_lic_mobile_voip"
                                          checked={formik.values.form_onclould_lic_mobile_voip}
                                          onChange={formik.handleChange} />}
                                          label="Mobile Voip" />
                                      </FormControl>
                                    </Box> */}
                                                                </Stack>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item md={5} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <div className="form-lable-name">
                                                                    {t("MobileClientNumber")}
                                                                </div>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <Select
                                                                        className="form-select-pad"
                                                                        id="form_onclould_mobile_client_number"
                                                                        name="form_onclould_mobile_client_number"
                                                                        label=""
                                                                        value={
                                                                            formikOncluld.values
                                                                                .form_onclould_mobile_client_number
                                                                        }
                                                                        onChange={formikOncluld.handleChange}
                                                                    >
                                                                        <MenuItem value={10}>Ten</MenuItem>
                                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box sx={{ margin: "0 0 20px" }}>
                                                    <div className="form-lable-name">
                                                        {t("AdministratorRole")}
                                                    </div>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <Grid container spacing={2}>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_ipad"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_ipad
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("Ipad")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_premium_supervision"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_premium_supervision
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("PremiumSupervision")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_premium_attendant"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_premium_attendant
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("PremiumAttendant")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_call_control_api"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_call_control_api
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("CallControlAPI")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_cloud_cti_api"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_cloud_cti_api
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("CloudCTIAPI")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_call_recording"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_call_recording
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("CallRecording")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_line_state_api"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_line_state_api
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("LineStateAPI")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_3rd_party_crm_connector"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_3rd_party_crm_connector
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("3rdPartycrmConnector")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_unified_inbox"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_unified_inbox
                                                                                }
                                                                                onChange={formik.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("UnifiedInbox")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_miteam_collaboration"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_miteam_collaboration
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("MiTeamCollaboration")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}>
                                                            <Box sx={{ width: "100%" }}>
                                                                <FormControl sx={{ width: "100%" }}>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                name="form_onclould_admin_role_teams_application"
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_admin_role_teams_application
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("TeamsApplication")}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item lg={3} md={4} sm={6} xs={12}></Grid>
                                                    </Grid>
                                                </Box>
                                                <Box sx={{ margin: "0 0 20px" }}>
                                                    <div className="form-lable-name">
                                                        {t("ExchangeIntegration")}
                                                    </div>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="form_onclould_change_intigration"
                                                            name="form_onclould_change_intigration"
                                                        >
                                                            <Grid container spacing={2}>
                                                                <Grid item sm={2} xs={4}>
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={
                                                                            <Radio
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_change_intigration ===
                                                                                    "yes"
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("Yes")}
                                                                    />
                                                                </Grid>
                                                                <Grid item sm={2} xs={4}>
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={
                                                                            <Radio
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_change_intigration ===
                                                                                    "no"
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("No")}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box sx={{ margin: "0 0 20px" }}>
                                                    <div className="form-lable-name">
                                                        {t("ExternalTelephonySystemIntegration")}
                                                    </div>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="form_onclould_external_telephony_system_intigration"
                                                            name="form_onclould_external_telephony_system_intigration"
                                                        >
                                                            <Grid container spacing={2}>
                                                                <Grid item sm={2} xs={4}>
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={
                                                                            <Radio
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_external_telephony_system_intigration ===
                                                                                    "yes"
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("Yes")}
                                                                    />
                                                                </Grid>
                                                                <Grid item sm={2} xs={4}>
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={
                                                                            <Radio
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_external_telephony_system_intigration ===
                                                                                    "no"
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("No")}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container spacing={3}>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t(
                                                                            "UserIdentifierforTelephonyIntegration"
                                                                        )}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_user_ident_telephony_inteigration"
                                                                            name="form_onclould_user_ident_telephony_inteigration"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values
                                                                                    .form_onclould_user_ident_telephony_inteigration
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <div className="form-lable-name">
                                                                        {t("DestinationLine")}
                                                                    </div>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <TextField
                                                                            id="form_onclould_destination_line"
                                                                            name="form_onclould_destination_line"
                                                                            variant="outlined"
                                                                            value={
                                                                                formikOncluld.values
                                                                                    .form_onclould_destination_line
                                                                            }
                                                                            onChange={formikOncluld.handleChange}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ margin: "0 0 20px" }}>
                                                    <div className="form-lable-name">
                                                        {t("Two-FactorAuthentication")}
                                                    </div>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <RadioGroup
                                                            row
                                                            aria-labelledby="form_onclould_two_factor_auth"
                                                            name="form_onclould_two_factor_auth"
                                                        >
                                                            <Grid container spacing={2}>
                                                                <Grid item sm={2} xs={4}>
                                                                    <FormControlLabel
                                                                        value="yes"
                                                                        control={
                                                                            <Radio
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_two_factor_auth ===
                                                                                    "yes"
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("Yes")}
                                                                    />
                                                                </Grid>
                                                                <Grid item sm={2} xs={4}>
                                                                    <FormControlLabel
                                                                        value="no"
                                                                        control={
                                                                            <Radio
                                                                                checked={
                                                                                    formikOncluld.values
                                                                                        .form_onclould_two_factor_auth ===
                                                                                    "no"
                                                                                }
                                                                                onChange={formikOncluld.handleChange}
                                                                            />
                                                                        }
                                                                        label={t("No")}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Box>
                                                <Box className="">
                                                    <Stack direction="row" spacing={3}>
                                                        <Box sx={{ width: "100%" }}>
                                                            <div className="form-lable-name">
                                                                {t("MobileNumber")}
                                                            </div>
                                                            <FormControl sx={{ width: "100%" }}>
                                                                <TextField
                                                                    id="form_onclould_mobile_number"
                                                                    name="form_onclould_mobile_number"
                                                                    variant="outlined"
                                                                    value={
                                                                        formikOncluld.values.form_onclould_mobile_number
                                                                    }
                                                                    onChange={formikOncluld.handleChange}
                                                                    type="number"
                                                                    inputProps={{
                                                                        inputMode: "numeric",
                                                                        pattern: "[0-9]*",
                                                                    }}
                                                                />
                                                            </FormControl>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ marginTop: "40px" }}>
                                            <Stack
                                                direction="row"
                                                spacing={2}
                                                alignItems="center"
                                                justifyContent={"start"}
                                                className="form-submit-cancel-btn-wrapper"
                                            >
                                                <Button
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
                                                    type="submit"
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
                                    </>
                                )}
                            </TabPanel>
                        </Box>
                    </Box>
                </div>
            </div>
        </>
    );
}
export default AddUser;