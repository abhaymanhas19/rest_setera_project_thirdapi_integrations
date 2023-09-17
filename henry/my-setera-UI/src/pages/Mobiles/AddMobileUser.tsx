import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Yup from 'yup';
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import colorConfigs from "../../configs/colorConfigs";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import AxiosMain from "../../components/layout/AxiosMain";
import { Modal, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Pagination } from "@mui/material";
import LoaderScreen from "../../components/layout/LoaderScreen";
import { useLocation, useNavigate } from 'react-router-dom';
import { setAppNextRoute, setAppcurrentPageForm } from "../../redux/features/appStateSlice";
import PaginationDropDown from "../../components/layout/PaginationDropDown";
import DatePicker from "react-datepicker";

const AddMobileUser = (props: any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isBarringsModalOpen, setBarringsModalOpen] = useState(false);
    const [isCatalougeSModalOpen, setCatalougeSModalOpen] = useState(false);
    const [barringsDropValue, setBarringsDropValue] = useState('no');
    const [isLoading, setIsLoading] = useState(false);
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const OrgnisationData = useSelector((state: RootState) => state.appState.appOrg);
    const isCurrenFormEidt = useSelector((state: RootState) => state.appState.appCurrentPageForm);
    const isNextRoute = useSelector((state: RootState) => state.appState.appNextRoute);
    const isPervRoute = useSelector((state: RootState) => state.appState.appPrevRoute);
    const [barringsData, setBarringsData] = useState([]);
    const [catalougeSData, setCatalougeSData] = useState([]);
    const [barringsSelectedRows, setBarringsSelectedRows] = React.useState(0);
    const [barringsTableData, setBarringsTableData] = useState([]);
    const [form_did_number_Value, setform_did_number_Value] = useState("");
    const [barringstotalPage, setBarringsTotalPage] = useState(0);
    const [barringsCurrentPage, setBarringsCurrentPage] = useState(1);
    const [barringsTableNextPage, setBarringsNextPage] = useState(1);
    const [formDependData, setFormDependData] = useState("");
    const [activationDate, setActivationDate] = useState(new Date());
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
    const barringsstyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #fff',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    const getBarringsModalDrop = [
        {
            name: "Barring Voice",
            value: "barringvoice"
        },
        {
            name: "Barring SMS",
            value: "barringsms"
        },
        {
            name: "Barring MMS",
            value: "barringmms"
        },
        {
            name: "Barring Data",
            value: "barringdata"
        },
        {
            name: "Barring Roaming",
            value: "barringroaming"
        },
        {
            name: "Barring Roaming Data",
            value: "barringroamingdata"
        }
    ]
    const getDropDownData = async ({ url, saveData, config }: any) => {
        AxiosMain.get(url, config).then((res) => {
            if (res.status === 200 && res.data.count > 0) {
                saveData(res.data.results);
            }
        }).catch((e) => {
            console.log("Something went wrong while fetching data");
        })
    }
    const getBarringsDropDownData = async ({ url, saveData, config }: any) => {
        AxiosMain.get(url, config).then((res) => {
            if (res.status === 200 && res.data.count > 0) {
                setBarringsTotalPage(Math.ceil(res.data.count / 10));
                saveData(res.data.results);
                setFormDependData(formik.values.carrier);
            } else if (res.status === 200 && res.data.count === 0) {
                setIsLoading(false);
                Swal.fire({
                    text: formSwalTranslation.emptyData,
                    icon: "info",
                });
                setBarringsTableData([]);
            } else {
                setIsLoading(false);
                setBarringsTableData([]);
            }
        }).catch((e) => {
            console.log("Something went wrong while fetching data");
        })
    }
    useEffect(() => {
        // if (dropDownSim.length === 0) {
        //     getDropDownData({ url: "/mobile/sim/", saveData: setDropDownSim, config });
        // }
        // if (dropDownMBProduct.length === 0) {
        //     getDropDownData({ url: "/mobile/mobile-product/", saveData: setDropDownMBProduct, config });
        // }
        // if (dropDownCarrier.length === 0) {
        //     getDropDownData({ url: "/mobile/carrier/", saveData: setDropDownCarrier, config });
        // }
        // if (dropDownUsers.length === 0) {
        //     getDropDownData({ url: "/users/", saveData: setDropDownUsers, config });
        // }
        // if (dropDownVoice.length === 0) {
        //     getDropDownData({ url: "/mobile/barring-voice/", saveData: setDropDownVoice, config });
        // }
        // if (dropDownData.length === 0) {
        //     getDropDownData({ url: "/mobile/barring-data/", saveData: setDropDownData, config });
        // }

        // if (dropDownVoicePackage.length === 0) {
        //     getDropDownData({ url: "/mobile/barring-data/", saveData: setDropDownVoicePackage, config });
        // }

        // if (dropDownDataPackage.length === 0) {
        //     getDropDownData({ url: "/mobile/barring-data/", saveData: setDropDownDataPackage, config });
        // }
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
        emptyData: t('EmptyData'),
        formdontSaveChanges: t('Areyousureyoudontwanttosavethechanges?')
    };
    const AddUserSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        number: Yup.string().required('Required'),
        mobile_product: Yup.string().required('Required'),
        barring_voice: Yup.string(),
        barring_sms: Yup.string(),
        barring_mms: Yup.string(),
        barring_data: Yup.string(),
        barring_roaming: Yup.string(),
        barring_roamingdata: Yup.string(),
        carrier: Yup.string().required('Required'),
        sim: Yup.string().required('Required'),
        //voicemail_number: Yup.string().required('Required'),
        //form_user: Yup.string().required('Required')

    });
    const formik = useFormik({
        initialValues: {
            name: "",
            number: form_did_number_Value,
            mobile_product: "",
            voicemail_number: "",
            carrier: "",
            sim: "",
            // subscription_open_date:"",
            // subscription_close_date:"",
            //catalog_status:"",
            barring_voice: "",
            barring_sms: "",
            barring_mms: "",
            barring_data: "",
            barring_roaming: "",
            barring_roamingdata: "",
            form_voice_package: "",
            form_data_package: ""
            //form_user: "",
        },
        validationSchema: AddUserSchema,
        onSubmit: (values) => {
            setValueinForm();
            const APiValues = { ...values, "organization": OrgnisationData.id };
            //console.log("Add Mobile API Data", APiValues);
            AxiosMain.post("/mobile/subscription/", APiValues, config).then((res) => {
                dispatch(setAppcurrentPageForm("process"));
                if (res.status === 201) {
                    Swal.fire(
                        formSwalTranslation.formSwalSubmited,
                        formSwalTranslation.formSwalDataSaved,
                        "success"
                    );
                    dispatch(setAppNextRoute("/mobiles/mobile-user-list"));
                    dispatch(setAppcurrentPageForm("process"));
                }
            }).catch((e) => {
                console.log("error ", e);
                const { response } = e;
                console.log(response.data);
                let errormsg: any = [];
                if (response.status === 400) {
                    // eslint-disable-next-line
                    Object.entries(response.data).map(([key, value]: any) => {
                        console.log(key, value)
                        if (value.length > 0) {
                            // eslint-disable-next-line
                            value.map((val: any) => {
                                errormsg.push(val);
                            })
                        }

                    })
                    if (errormsg.length > 0) {
                        Swal.fire({
                            title: "Error",
                            text: errormsg[0],
                            icon: "error"
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: formSwalTranslation.formSwalWrong,
                            icon: "error"
                        });
                    }

                } else {
                    Swal.fire({
                        title: "Error",
                        text: formSwalTranslation.formSwalWrong,
                        icon: "error"
                    });
                }
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

    const AddCatalougeSSchema = Yup.object().shape({
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        street_address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        postal_code: Yup.string().required('Required')
    });

    const catalougeSFormik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            street_address: "",
            city: "",
            postal_code: ""
        },
        validationSchema: AddCatalougeSSchema,
        onSubmit: (values: any) => {
            console.log("Catalouge Values ", values);
            let data: any = [];
            data.push(values)
            setCatalougeSData(data);
            setCatalougeSModalOpen(false);
        }
    })
    const cancelCatalogeForm = () => {
        catalougeSFormik.resetForm();
        setCatalougeSModalOpen(false)
    }
    //settings up Barrings Modal
    const setValueinForm = () => {
        if (barringsData.length > 0) {
            //console.log(barringsData);
            const noValues = "";
            formik.setFieldValue("barring_roaming", noValues);
            formik.setFieldValue("barring_data", noValues);
            formik.setFieldValue("barring_mms", noValues);
            formik.setFieldValue("barring_sms", noValues);
            formik.setFieldValue("barring_voice", noValues);
            formik.setFieldValue("barring_roamingdata", noValues);
            barringsData.map((item: any) => {
                if (item.name === "barringvoice") {
                    formik.setFieldValue("barring_voice", item.data.id);
                }
                if (item.name === "barringsms") {
                    formik.setFieldValue("barring_sms", item.data.id);
                }
                if (item.name === "barringmms") {
                    formik.setFieldValue("barring_mms", item.data.id);
                }
                if (item.name === "barringdata") {
                    formik.setFieldValue("barring_data", item.data.id);
                }
                if (item.name === "barringroaming") {
                    formik.setFieldValue("barring_roaming", item.data.id);
                }
                if (item.name === "barringroamingdata") {
                    formik.setFieldValue("barring_roamingdata", item.data.id);
                }
            })
        } else {
            const noValues = 1;
            formik.setFieldValue("barring_roamingdata", noValues);
            formik.setFieldValue("barring_roaming", noValues);
            formik.setFieldValue("barring_data", noValues);
            formik.setFieldValue("barring_mms", noValues);
            formik.setFieldValue("barring_sms", noValues);
            formik.setFieldValue("barring_voice", noValues);
        }
    }

    useEffect(() => {
        // if (barringsData.length > 0) {

        // }
        setValueinForm();
        if (barringsDropValue !== 'no') {
            let barringsURL = "";
            if (barringsDropValue === "barringvoice") {
                barringsURL = "/mobile/barring-voice/";
            }
            else if (barringsDropValue === "barringsms") {
                barringsURL = "/mobile/barring-sms/";
            }
            else if (barringsDropValue === "barringmms") {
                barringsURL = "/mobile/barring-mms/";
            }
            else if (barringsDropValue === "barringdata") {
                barringsURL = "/mobile/barring-data/";
            }
            else if (barringsDropValue === "barringroaming") {
                barringsURL = "/mobile/barring-roaming/";
            }
            else if (barringsDropValue === "barringroamingdata") {
                barringsURL = "/mobile/barring-roaming-data/";
            }
            else {
                barringsURL = "";
            }
            if (barringsURL !== '') {
                if (barringsTableNextPage === barringsCurrentPage) {
                    getBarringsDropDownData({ url: formik.values.carrier !== '' ? `${barringsURL}?page=1&carrier__id=${formik.values.carrier}` : `${barringsURL}?page=${barringsCurrentPage}`, saveData: setBarringsTableData, config });
                } 
                else if (barringsTableNextPage !== barringsCurrentPage && barringsTableData.length > 0) {
                    setBarringsCurrentPage(barringsTableNextPage);
                    getBarringsDropDownData({ url: formik.values.carrier !== '' ? `${barringsURL}?page=${barringsTableNextPage}&carrier__id=${formik.values.carrier}` : `${barringsURL}?page=${barringsTableNextPage}`, saveData: setBarringsTableData, config });
                }
                else {
                    setBarringsTableData(barringsTableData);
                }
            } 
        } else {
            setBarringsTableData([]);
            setBarringsSelectedRows(0);
            setBarringsCurrentPage(1);
            setBarringsTotalPage(1);
        }
        // eslint-disable-next-line
    }, [barringsTableNextPage, barringsDropValue, barringsSelectedRows, formik.values.carrier])
    const saveBarringsData = () => {
        setBarringsModalOpen(false);
        setBarringsDropValue("no");
    }
    const barringsDataCancel = () => {
        setBarringsModalOpen(false);
        setBarringsDropValue("no");
    }
    const updateCatalogeForm = () => {
        if (catalougeSData.length > 0) {
            catalougeSData.map((item: any) => {
                catalougeSFormik.setFieldValue("firstname", item.firstname);
                catalougeSFormik.setFieldValue("lastname", item.lastname);
                catalougeSFormik.setFieldValue("street_address", item.street_address);
                catalougeSFormik.setFieldValue("city", item.city);
                catalougeSFormik.setFieldValue("postal_code", item.postal_code);
            })
        }
    }
    const deleteBarringsData = (val: any) => {
        const removedt = barringsData.filter((item: any) => item.name !== val);
        setBarringsData(removedt);
    }

    const areYouSure = () => {
        Swal.fire({
            text: formSwalTranslation.formdontSaveChanges,
            icon: 'warning',
            cancelButtonText: formSwalTranslation.fomrSwalCancel,
            showCancelButton: true,
            confirmButtonColor: '#103256',
            cancelButtonColor: '#d33',
            confirmButtonText: `${t('Yes')}`,
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("User Want to leave");
                dispatch(setAppcurrentPageForm("process"));
            }
        })
    }
    useEffect(() => {
        if (formik.dirty) {
            dispatch(setAppcurrentPageForm("yes"));
        }
    }, [formik.dirty]);
    useEffect(() => {
        if (isCurrenFormEidt === "yes" && isNextRoute !== "" && isNextRoute !== isPervRoute) {
            areYouSure();
        }
    }, [isNextRoute, isCurrenFormEidt, isPervRoute]);
    useEffect(() => {
        //console.log("formik.errors", formik.errors);
        if (formDependData !== formik.values.carrier) {
            setBarringsData([]);
            setBarringsNextPage(1);
        }
    }, [formik]);

    useEffect(() => {
        if (!isBarringsModalOpen) {
            setBarringsNextPage(1);
        }
    }, [isBarringsModalOpen])

    const discardChanges = () => {
        dispatch(setAppNextRoute("/mobiles/mobile-user-list"));
        Swal.fire({
            text: formSwalTranslation.formdontSaveChanges,
            icon: 'warning',
            cancelButtonText: formSwalTranslation.fomrSwalCancel,
            showCancelButton: true,
            confirmButtonColor: '#103256',
            cancelButtonColor: '#d33',
            confirmButtonText: `${t('Yes')}`,
        }).then((result: any) => {
            if (result.isConfirmed) {
                dispatch(setAppcurrentPageForm("process"));
                //navigate("/mobiles/mobile-user-list")
            }
        })
    }
    return (
        <>
            <div className="cm-user-tabs-wrapper cm-global-tabs-wrapper cm-user-main">
                <div className="cm-user-name-wrap">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <div className="fw-600">{t("AddNewMobile")}</div>
                    </Stack>
                </div>
                <div>
                    {/* Barrings Modal */}
                    <Modal open={isBarringsModalOpen} onClose={() => setBarringsModalOpen(false)}>
                        <Box sx={barringsstyle}>
                            <Box className="form-mb-30">
                                <Box component={"h3"} sx={{
                                    marginTop: "-10px"
                                }}>{barringsDropValue === "no" ? "Please Select Data" : getBarringsModalDrop.length > 0 && getBarringsModalDrop.map((item) => {
                                    if (item.value === barringsDropValue) {
                                        return (item.name);
                                    }
                                })}</Box>
                                <Box sx={{ flexGrow: 1 }}>
                                    {
                                        isLoading ? (
                                            <LoaderScreen />
                                        ) :
                                            (
                                                <Grid container spacing={3}>
                                                    <Grid item lg={6} md={6} sm={6} xs={12}>
                                                        <Box sx={{ width: "100%" }}>
                                                            {/* <div className="form-lable-name">
                                                                {t("Carrier")}
                                                            </div> */}
                                                            <FormControl sx={{ width: "100%" }}>
                                                                <Select
                                                                    className="form-select-pad"
                                                                    label=""
                                                                    onChange={(e) => setBarringsDropValue(e.target.value)}
                                                                    placeholder=">Choose Option"
                                                                    value={barringsDropValue}
                                                                >
                                                                    <MenuItem value="no">Choose Option</MenuItem>
                                                                    {getBarringsModalDrop.length > 0 && (
                                                                        getBarringsModalDrop.map((val: any, index: any) => (
                                                                            <MenuItem key={`barring-modal-data--${index}`} value={val.value}>{val.name}</MenuItem>
                                                                        ))
                                                                    )}
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                    </Grid>
                                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                                        <Box className="form-mb-30" sx={{
                                                            maxHeight: "350px",
                                                            overflow: "auto",
                                                            borderRadius: "10px"
                                                        }}>
                                                            <TableContainer className="cm-barrring-cm-table-dt">
                                                                <Table>
                                                                    <TableHead className="cm-barrring-cm-table-hd">
                                                                        <TableRow>
                                                                            <TableCell>Action</TableCell>
                                                                            <TableCell>Name</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {
                                                                            barringsTableData.length > 0 && barringsTableData.map((item: any, index: any) => (
                                                                                <TableRow key={`barrings-data-${index}-${barringsDropValue}`} onClick={() => {
                                                                                    if (barringsData.findIndex((f: any) => f.name === barringsDropValue) === -1) {
                                                                                        let firstTime: any = [...barringsData, {
                                                                                            data: item,
                                                                                            name: barringsDropValue
                                                                                        }];
                                                                                        setBarringsData(firstTime);
                                                                                    } else {
                                                                                        const upd_obj: any = barringsData.map((obj: any) => {
                                                                                            if (obj.name === barringsDropValue) {
                                                                                                obj.data = item;
                                                                                            }
                                                                                            return obj;
                                                                                        })
                                                                                        setBarringsData(upd_obj);
                                                                                    }

                                                                                }}>
                                                                                    <TableCell>
                                                                                        {
                                                                                            barringsData.findIndex((f: any) => f.name === barringsDropValue) === -1
                                                                                                ? <Button size="small" variant="contained" key={`barrings-data-btn-${index}-${barringsDropValue}`}>ADD</Button>
                                                                                                : barringsData.map((itemInner: any, index) => {
                                                                                                    if (itemInner.name === barringsDropValue) {
                                                                                                        if (item.id === itemInner.data.id) {
                                                                                                            return <Button key={`barrings-data-btn-${index}-${barringsDropValue}`} size="small" variant="contained" color="success">Added</Button>
                                                                                                        }
                                                                                                        return (<Button key={`barrings-data-btn-${index}-${barringsDropValue}`} size="small" variant="contained" >ADD</Button>)
                                                                                                    }
                                                                                                }
                                                                                                )
                                                                                        }
                                                                                    </TableCell>
                                                                                    <TableCell>{item.code} - {item.name}</TableCell>
                                                                                </TableRow>
                                                                            ))
                                                                        }
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Box>
                                                        {
                                                            barringstotalPage > 1 && (
                                                                <Pagination
                                                                    count={barringstotalPage}
                                                                    page={barringsCurrentPage}
                                                                    onChange={(e, page) => setBarringsNextPage(page)}
                                                                />
                                                            )
                                                        }

                                                    </Grid>
                                                </Grid>

                                            )
                                    }
                                    <Box sx={{ marginTop: "40px" }}>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            justifyContent={"end"}
                                            className="form-submit-cancel-btn-wrapper"
                                        >
                                            <Button
                                                disabled={barringsData.length > 0 ? false : true}
                                                onClick={() => saveBarringsData()}
                                                variant="contained"
                                                endIcon={<CheckCircleIcon />}
                                                className="cm-btn-sm-style"
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
                                                className="cm-btn-sm-style"
                                                variant="contained"
                                                endIcon={<CancelIcon />}
                                                onClick={() => barringsDataCancel()}
                                                sx={{
                                                    color: colorConfigs.btnColor.hoverbgWhite,
                                                    background: colorConfigs.btnColor.bgColorRed,
                                                    "&: hover": {
                                                        color: colorConfigs.btnColor.bgColorRed,
                                                        background: colorConfigs.btnColor.hoverbgWhite,
                                                    },
                                                }}
                                            >Cancel</Button>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                    {/* Catalog Services  */}
                    <Modal open={isCatalougeSModalOpen} onClose={() => setCatalougeSModalOpen(false)}>
                        <Box sx={barringsstyle}>
                            <form onSubmit={catalougeSFormik.handleSubmit}>
                                <Grid container spacing={5}>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Box sx={{ width: "100%" }}>
                                            <div className="form-lable-name">
                                                {t("FirstName")}
                                            </div>
                                            <FormControl sx={{ width: "100%" }}>
                                                <TextField
                                                    name="firstname"
                                                    variant="outlined"
                                                    value={catalougeSFormik.values.firstname}
                                                    onChange={catalougeSFormik.handleChange}
                                                    onBlur={catalougeSFormik.handleBlur}
                                                />
                                            </FormControl>
                                            {catalougeSFormik.errors.firstname && catalougeSFormik.touched.firstname && <p className="cm-form-error">{t(`${catalougeSFormik.errors.firstname}`)}</p>}
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Box sx={{ width: "100%" }}>
                                            <div className="form-lable-name">
                                                {t("LastName")}
                                            </div>
                                            <FormControl sx={{ width: "100%" }}>
                                                <TextField
                                                    name="lastname"
                                                    variant="outlined"
                                                    value={catalougeSFormik.values.lastname}
                                                    onChange={catalougeSFormik.handleChange}
                                                    onBlur={catalougeSFormik.handleBlur}
                                                />
                                            </FormControl>
                                            {catalougeSFormik.errors.lastname && catalougeSFormik.touched.lastname && <p className="cm-form-error">{t(`${catalougeSFormik.errors.lastname}`)}</p>}
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Box sx={{ width: "100%" }}>
                                            <div className="form-lable-name">
                                                {t("PostalCode")}
                                            </div>
                                            <FormControl sx={{ width: "100%" }}>
                                                <TextField
                                                    name="postal_code"
                                                    variant="outlined"
                                                    value={catalougeSFormik.values.postal_code}
                                                    onChange={catalougeSFormik.handleChange}
                                                    onBlur={catalougeSFormik.handleBlur}
                                                />
                                            </FormControl>
                                            {catalougeSFormik.errors.postal_code && catalougeSFormik.touched.postal_code && <p className="cm-form-error">{t(`${catalougeSFormik.errors.postal_code}`)}</p>}
                                        </Box>
                                    </Grid>
                                    <Grid item md={6} sm={12} xs={12}>
                                        <Box sx={{ width: "100%" }}>
                                            <div className="form-lable-name">
                                                {t("City")}
                                            </div>
                                            <FormControl sx={{ width: "100%" }}>
                                                <TextField
                                                    name="city"
                                                    variant="outlined"
                                                    value={catalougeSFormik.values.city}
                                                    onChange={catalougeSFormik.handleChange}
                                                    onBlur={catalougeSFormik.handleBlur}
                                                />
                                            </FormControl>
                                            {catalougeSFormik.errors.city && catalougeSFormik.touched.city && <p className="cm-form-error">{t(`${catalougeSFormik.errors.city}`)}</p>}
                                        </Box>
                                    </Grid>
                                    <Grid item md={12} sm={12} xs={12}>
                                        <Box sx={{ width: "100%" }}>
                                            <div className="form-lable-name">
                                                {t("StreetAddress")}
                                            </div>
                                            <FormControl sx={{ width: "100%" }}>
                                                <TextField
                                                    multiline
                                                    rows={4}
                                                    name="street_address"
                                                    value={catalougeSFormik.values.street_address}
                                                    onChange={catalougeSFormik.handleChange}
                                                    onBlur={catalougeSFormik.handleBlur}
                                                />
                                            </FormControl>
                                            {catalougeSFormik.errors.street_address && catalougeSFormik.touched.street_address && <p className="cm-form-error">{t(`${catalougeSFormik.errors.street_address}`)}</p>}
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box sx={{ marginTop: "40px" }}>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        justifyContent={"end"}
                                        className="form-submit-cancel-btn-wrapper"
                                    >
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            endIcon={<CheckCircleIcon />}
                                            className="cm-btn-sm-style"
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
                                            className="cm-btn-sm-style"
                                            variant="contained"
                                            endIcon={<CancelIcon />}
                                            onClick={() => cancelCatalogeForm()}
                                            sx={{
                                                color: colorConfigs.btnColor.hoverbgWhite,
                                                background: colorConfigs.btnColor.bgColorRed,
                                                "&: hover": {
                                                    color: colorConfigs.btnColor.bgColorRed,
                                                    background: colorConfigs.btnColor.hoverbgWhite,
                                                },
                                            }}
                                        >Cancel</Button>
                                    </Stack>
                                </Box>
                            </form>
                        </Box>
                    </Modal>
                </div>
                <div className="cm-user-form-wrap">
                    <Box sx={{ width: "100%" }}>
                        <Box className="cm-global-tabs-content">
                            <form onSubmit={formik.handleSubmit}>
                                <Box className="cm-global-tab-inner-content">
                                    <Grid container spacing={5}>
                                        <Grid item md={12} sm={12} xs={12}>
                                            <Box className="cm-form-inner-fields">
                                                <div className="form-row-title">
                                                    {t("BasicDetails")}
                                                </div>
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
                                                                <Box className="cm-form-inner-fields">
                                                                    <Box className="">
                                                                        <div className="form-lable-name">
                                                                            {t("MobileNumber")}
                                                                        </div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                id="number"
                                                                                name="number"
                                                                                variant="outlined"
                                                                                value={form_did_number_Value}
                                                                                onChange={(e) => { formik.handleChange(e); formik.setFieldValue("number", e.target.value); setform_did_number_Value(e.target.value) }}
                                                                            />
                                                                        </FormControl>
                                                                        {formik.errors.number && formik.touched.number && <p className="cm-form-error">{formik.errors.number}</p>}
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <PaginationDropDown
                                                                        apiLink="/mobile/carrier/"
                                                                        apiDataMap={{ labelName: "name", valueName: "id" }}
                                                                        optionLableName={`${t("Carrier")}`}
                                                                        saveValue={formik}
                                                                        formFiled="carrier"
                                                                    />
                                                                    {formik.errors.carrier && formik.touched.carrier && (
                                                                        <p className="cm-form-error">{`${formik.errors.carrier}`}</p>
                                                                    )}

                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <PaginationDropDown
                                                                        defaultSort="no"
                                                                        apiLink="/mobile/sim/"
                                                                        apiDataMap={{ labelName: "icc", valueName: "id" }}
                                                                        optionLableName={`${t("SimCard")}`}
                                                                        saveValue={formik}
                                                                        formFiled="sim"
                                                                    />
                                                                    {formik.errors.sim && formik.touched.sim && (
                                                                        <p className="cm-form-error">{`${formik.errors.sim}`}</p>
                                                                    )}
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <FormControl sx={{ width: '100%' }} className="cm-datepicker-add">
                                                                        <div className="form-lable-name">{t('ActivationDate')}</div>
                                                                        <DatePicker
                                                                            showTimeSelect
                                                                            dateFormat="d MMMM yyyy HH:mm"
                                                                            timeFormat="HH:mm"
                                                                            isClearable={true}
                                                                            minDate={new Date()}
                                                                            className="cm-date-picker-field" name="form_activation_date" selected={activationDate} onChange={(date: any) => {
                                                                                setActivationDate(date);
                                                                            }} />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <div className="form-row-title">
                                                        {t("MobileProduct")}
                                                    </div>
                                                    <Box sx={{ flexGrow: 1 }}>
                                                        <Grid container spacing={3}>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <PaginationDropDown
                                                                        dependOn="apiParamValue"
                                                                        apiParamName="carrier"
                                                                        apiParamValue={formik.values.carrier}
                                                                        apiLink="/mobile/mobile-product/"
                                                                        apiDataMap={{ labelName: "name", valueName: "id" }}
                                                                        optionLableName={`${t("Product")}`}
                                                                        saveValue={formik}
                                                                        formFiled="mobile_product"
                                                                    />
                                                                    {formik.errors.mobile_product && formik.touched.mobile_product && <p className="cm-form-error">{formik.errors.mobile_product}</p>} 
                                                                </Box>
                                                            </Grid>
                                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                <Box className="cm-form-inner-fields">
                                                                    <Box className="">
                                                                        <div className="form-lable-name">
                                                                            {t("VoicemailNumber")}
                                                                        </div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                id="voicemail_number"
                                                                                name="voicemail_number"
                                                                                variant="outlined"
                                                                                value={formik.values.voicemail_number}
                                                                                onChange={(e) => { formik.handleChange(e); formik.setFieldValue("voicemail_number", e.target.value); }}
                                                                            />
                                                                        </FormControl>
                                                                        {formik.errors.voicemail_number && formik.touched.voicemail_number && <p className="cm-form-error">{formik.errors.voicemail_number}</p>}
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <div className="form-row-title">
                                                        {t("barrings")}
                                                    </div>
                                                    {
                                                        barringsData.length > 0 ?
                                                            <>
                                                                {/* <div className="cm-subcription-col-box form-mb-30">
                                                                    {barringsData.map((item: any, index: any) => (
                                                                        <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                                            <Box sx={{ width: "50%" }} className="cm-col-box-th">{item.name}</Box>
                                                                            <Box sx={{ width: "50%" }} className="cm-col-box-td">{item.data.name}</Box>
                                                                        </Stack>
                                                                    ))}
                                                                </div> */}
                                                                <Box className="form-mb-30">
                                                                    <TableContainer className="cm-barrring-cm-table-dt">
                                                                        <Table>
                                                                            <TableHead className="cm-barrring-cm-table-hd">
                                                                                <TableRow>
                                                                                    <TableCell>Bearing Type</TableCell>
                                                                                    <TableCell>Name</TableCell>
                                                                                    <TableCell>Action</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {barringsData.map((item: any, index: any) => (
                                                                                    <TableRow key={`barrings-data-${index}`}>
                                                                                        <TableCell>{item.name}</TableCell>
                                                                                        <TableCell>{item.data.name}</TableCell>
                                                                                        <TableCell>
                                                                                            <Button
                                                                                                className="cm-btn-sm-style"
                                                                                                onClick={() => deleteBarringsData(item.name)}
                                                                                                variant="contained"
                                                                                                sx={{
                                                                                                    color: colorConfigs.btnColor.hoverbgWhite,
                                                                                                    background: colorConfigs.btnColor.bgColorRed,
                                                                                                    "&: hover": {
                                                                                                        color: colorConfigs.btnColor.bgColorRed,
                                                                                                        background: colorConfigs.btnColor.hoverbgWhite,
                                                                                                    },
                                                                                                }}
                                                                                            ><DeleteIcon />
                                                                                            </Button>
                                                                                        </TableCell>
                                                                                    </TableRow>
                                                                                ))}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </TableContainer>
                                                                </Box>
                                                                <Box className="form-mb-30" textAlign={"right"}>
                                                                    <Button
                                                                        variant="contained"
                                                                        endIcon={<AddIcon />}
                                                                        className="cm-btn-sm-style"
                                                                        sx={{
                                                                            color: colorConfigs.btnColor.hoverbgWhite,
                                                                            background: colorConfigs.btnColor.bgColorGreen,
                                                                            "&: hover": {
                                                                                color: colorConfigs.btnColor.bgColorGreen,
                                                                                background: colorConfigs.btnColor.hoverbgWhite,
                                                                            },
                                                                        }}
                                                                        onClick={() => setBarringsModalOpen(true)}
                                                                    >
                                                                        Add Barrings
                                                                    </Button>
                                                                </Box>
                                                            </>
                                                            : (
                                                                <Box className="form-mb-30">
                                                                    <Button
                                                                        variant="contained"
                                                                        endIcon={<AddIcon />}
                                                                        className="cm-btn-md-style"
                                                                        sx={{
                                                                            color: colorConfigs.btnColor.hoverbgWhite,
                                                                            background: colorConfigs.btnColor.bgColorGreen,
                                                                            "&: hover": {
                                                                                color: colorConfigs.btnColor.bgColorGreen,
                                                                                background: colorConfigs.btnColor.hoverbgWhite,
                                                                            },
                                                                        }}
                                                                        onClick={() => setBarringsModalOpen(true)}
                                                                    >
                                                                        {t("AddBarringsSubscription")}
                                                                    </Button>
                                                                </Box>
                                                            )
                                                    }
                                                </Box>
                                                <Box className="form-mb-30">
                                                    <div className="form-row-title">
                                                        {t("CatalogServices")}
                                                    </div>
                                                </Box>
                                                {
                                                    catalougeSData.length > 0
                                                        ?
                                                        <>
                                                            <Box className="form-mb-30">
                                                                <TableContainer className="cm-barrring-cm-table-dt">
                                                                    <Table>
                                                                        <TableHead className="cm-barrring-cm-table-hd">
                                                                            <TableRow>
                                                                                <TableCell>{t("FirstName")}</TableCell>
                                                                                <TableCell>{t("LastName")}</TableCell>
                                                                                <TableCell>{t("PostalCode")}</TableCell>
                                                                                <TableCell>{t("StreetAddress")}</TableCell>
                                                                                <TableCell>{t("City")}</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {
                                                                                catalougeSData.length > 0 && catalougeSData.map((item: any, index: any) => (
                                                                                    <TableRow key={`catlouge-s-data-${index}`}>
                                                                                        <TableCell>{item.firstname}</TableCell>
                                                                                        <TableCell>{item.lastname}</TableCell>
                                                                                        <TableCell>{item.postal_code}</TableCell>
                                                                                        <TableCell sx={{
                                                                                            maxWidth: "300px"
                                                                                        }}>{item.street_address}</TableCell>
                                                                                        <TableCell>{item.city}</TableCell>
                                                                                    </TableRow>
                                                                                ))
                                                                            }
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </Box>
                                                            <Box className="form-mb-30" textAlign={"right"}>
                                                                <Button
                                                                    variant="contained"
                                                                    endIcon={<AddIcon />}
                                                                    className="cm-btn-sm-style"
                                                                    sx={{
                                                                        color: colorConfigs.btnColor.hoverbgWhite,
                                                                        background: colorConfigs.btnColor.bgColorGreen,
                                                                        "&: hover": {
                                                                            color: colorConfigs.btnColor.bgColorGreen,
                                                                            background: colorConfigs.btnColor.hoverbgWhite,
                                                                        },
                                                                    }}
                                                                    onClick={() => setCatalougeSModalOpen(true)}
                                                                >
                                                                    {t("Update")}
                                                                </Button>
                                                            </Box>
                                                        </>
                                                        : <Box className="form-mb-30">
                                                            <Button
                                                                variant="contained"
                                                                endIcon={<AddIcon />}
                                                                className="cm-btn-md-style"
                                                                sx={{
                                                                    color: colorConfigs.btnColor.hoverbgWhite,
                                                                    background: colorConfigs.btnColor.bgColorGreen,
                                                                    "&: hover": {
                                                                        color: colorConfigs.btnColor.bgColorGreen,
                                                                        background: colorConfigs.btnColor.hoverbgWhite,
                                                                    },
                                                                }}
                                                                onClick={() => setCatalougeSModalOpen(true)}
                                                            >
                                                                {t("Add")}
                                                            </Button>
                                                        </Box>
                                                }
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
                                            onClick={() => discardChanges()}
                                        >
                                            {t("discard")}
                                        </Button>
                                    </Stack>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </div>
            </div>
        </>
    );
}
export default AddMobileUser;