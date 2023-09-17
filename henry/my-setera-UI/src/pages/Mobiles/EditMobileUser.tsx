import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import AxiosMain from "../../components/layout/AxiosMain";
import LoaderScreen from "../../components/layout/LoaderScreen";
import { useFormik } from "formik";
import * as Yup from 'yup';
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, TextField, Checkbox, FormControlLabel, MenuItem, FormControl, Grid, Select, Modal, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, InputAdornment, Pagination } from "@mui/material";
import PaginationDropDown from "../../components/layout/PaginationDropDown";
import { useTranslation } from "react-i18next";
import colorConfigs from "../../configs/colorConfigs";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { setAppNextRoute, setAppcurrentPageForm } from "../../redux/features/appStateSlice";
import PaginationEditDropDown from "../../components/layout/PaginationEditDropDown";

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
interface formiktypes {
    name: string;
    number: "";
    mobile_product: string;
    voicemail_number: string;
    organization: string;
    barring_data: string;
    barring_mms: string;
    barring_roaming: string;
    barring_roamingdata: string;
    barring_sms: string;
    barring_voice: string;
}
function EditMobileUser() {
    const param = useParams();
    const { id } = param;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [singleuserdata, setSingeluserDaa] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [isAPIOn, setApiOn] = useState(false);
    const dispatch = useDispatch();
    //const [isLoading, setIsLoading] = useState(false);
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const OrgnisationData = useSelector((state: RootState) => state.appState.appOrg);
    const isCurrenFormEidt = useSelector((state: RootState) => state.appState.appCurrentPageForm);
    const isNextRoute = useSelector((state: RootState) => state.appState.appNextRoute);
    const isPervRoute = useSelector((state: RootState) => state.appState.appPrevRoute);
    const [editStartDate, setEditStartDate] = useState(new Date());
    const [form_did_number_Value, setform_did_number_Value] = useState("");
    const [isDataLoaded, setDataLoaded] = useState(true);
    const [barringsData, setBarringsData] = useState([]);
    const [isBarringsModalOpen, setBarringsModalOpen] = useState(false);
    const [barringstotalPage, setBarringsTotalPage] = useState(0);
    const [barringsCurrentPage, setBarringsCurrentPage] = useState(1);
    const [barringsTableNextPage, setBarringsNextPage] = useState(1);
    const [barringsDropValue, setBarringsDropValue] = useState('no');
    const [barringsTableData, setBarringsTableData] = useState([]);
    const [catalougeSData, setCatalougeSData] = useState([]);
    const [barringsSelectedRows, setBarringsSelectedRows] = React.useState(0);
    const [isCatalougeSModalOpen, setCatalougeSModalOpen] = useState(false);
    const [formDependData, setFormDependData] = useState("");
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
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
    const formSwalTranslation = {
        formSwalTitle: t("AreYouWanttoSave"),
        formSwalText: t("Youwontbeabletorevertthis"),
        fomrSwalCancel: t("Cancel"),
        formSwalSaved: t("YesSavedit"),
        formSwalDataSaved: t("YourDatahasbeensaved"),
        formSwalSubmited: t("Submited"),
        form_Delete: t('Delete'),
        formSwalWentWrong: t("SomethingWentWrong"),
        formSwalSureDele: t('Areyousureyouwanttodelete'),
        formdontSaveChanges: t('Areyousureyoudontwanttosavethechanges?'),
        emptyData: t('EmptyData'),
        formSwalWrong: t("SomethingWentWrong"),
    };
    const cancelCatalogeForm = () => {
        catalougeSFormik.resetForm();
        setCatalougeSModalOpen(false)
    }
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
    const formikEditSim = useFormik({
        initialValues: {
            form_temp_close_subscriptioin: false,
            form_reopen_temp_close_subscriptioin: false,
            form_end_sub_status: false,
            form_end_subscription: editStartDate,
            form_change_sim_card: "",
            customDataHandle: ""
        },
        onSubmit: (values: any) => {
            console.log("Submit Edit Sim ", values);
        }
    })
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
    const setValueinForm = () => {
        if (barringsData.length > 0) {
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
    const saveBarringsData = () => {
        setBarringsModalOpen(false);
        setBarringsDropValue("no");
    }
    const barringsDataCancel = () => {
        setBarringsModalOpen(false);
        setBarringsDropValue("no");
    }
    const deleteBarringsData = (val: any) => {
        if (val === 'barringvoice') {
            formik.setFieldValue("barring_voice", "");
        }
        if (val === 'barringsms') {
            formik.setFieldValue("barring_sms", "");
        }
        if (val === 'barringdata') {
            formik.setFieldValue("barring_data", "");
        }
        if (val === 'barringmms') {
            formik.setFieldValue("barring_mms", "");
        }
        if (val === 'barringroaming') {
            formik.setFieldValue("barring_roaming", "");
        }
        if (val === 'barringroamingdata') {
            formik.setFieldValue("barring_roamingdata", "");
        }
        const removedt = barringsData.filter((item: any) => item.name !== val);
        setBarringsData(removedt);
    }
    const deleteMobileUser = (row: any) => {

        console.log("Delete ", row);
        Swal.fire({
            text: `${formSwalTranslation.formSwalSureDele} ${row.name} ${t('user?')}`,
            icon: 'warning',
            cancelButtonText: formSwalTranslation.fomrSwalCancel,
            showCancelButton: true,
            confirmButtonColor: '#103256',
            cancelButtonColor: '#d33',
            confirmButtonText: formSwalTranslation.form_Delete,
        }).then((result: any) => {
            if (result.isConfirmed) {
                AxiosMain.delete(`/mobile/subscription/${row.id}/`, config).then((res) => {
                    if (res.status === 204 && res.data === '') {
                        //setCustomTabs(0);
                        navigate("/mobiles/mobile-user-list/")
                        Swal.fire({ title: formSwalTranslation.form_Delete, icon: "success" });
                    }
                }).catch((e) => {
                    Swal.fire({
                        title: formSwalTranslation.formSwalWentWrong,
                        icon: "error"
                    });
                })
            }
        })
    }
    const AddUserSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        number: Yup.number().required('Required'),
        mobile_product: Yup.string().required('Required'),
        // barring_voice: Yup.number().required('Required'),
        // barring_sms: Yup.number().required('Required'),
        // barring_mms: Yup.number().required('Required'),
        // barring_data: Yup.number().required('Required'),
        // barring_roaming: Yup.number().required('Required'),
        // barring_roamingdata: Yup.number().required('Required'),
        sim: Yup.number().required('Required'),
    });
    const formikDefaultValues = {
        name: "",
        number: "",
        mobile_product: "",
        voicemail_number: "",
        organization: "",
        barring_data: "",
        barring_mms: "",
        barring_roaming: "",
        barring_roamingdata: "",
        barring_sms: "",
        barring_voice: "",
        carrier: "",
        sim: ""
    }
    const formik = useFormik({
        initialValues: formikDefaultValues,
        validationSchema: AddUserSchema,
        onSubmit: (values: any) => {
            const APiValues = { ...values, "organization": OrgnisationData.id };
            console.log("APiValues", APiValues)
            AxiosMain.put(`/mobile/subscription/${singleuserdata.id}/`, APiValues, config).then((res) => {
                console.log("UPdated USer", res);
                if (res.status === 200) {
                    Swal.fire(
                        formSwalTranslation.formSwalSubmited,
                        formSwalTranslation.formSwalDataSaved,
                        "success"
                    );
                    dispatch(setAppNextRoute("/mobiles/mobile-user-list"));
                    dispatch(setAppcurrentPageForm("process"));
                }
            }).catch((e) => {
                console.log("Error While Update User");
                Swal.fire({
                    title: "Error",
                    text: formSwalTranslation.formSwalWrong,
                    icon: "error"
                });
            })
        }
    })

    const getSingleUserData = () => {
        AxiosMain.get(`/mobile/subscription/${id}/`, config).then((res) => {
            if (res.status === 200) {
                setSingeluserDaa(res.data);
            }
            setIsLoading(false);
        }).catch((e) => {
            console.log("error", e);
            setIsLoading(false);
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
            //setBarringsTableData([]);
            setBarringsSelectedRows(0);
            setBarringsCurrentPage(1);
            setBarringsTotalPage(1);
        }
        // eslint-disable-next-line
    }, [barringsTableNextPage, barringsDropValue, barringsSelectedRows, formik.values.carrier])
    useEffect(() => {
        if (Object.keys(singleuserdata).length === 0 && id !== '' && !isAPIOn) {
            getSingleUserData();
        }
        if (Object.keys(singleuserdata).length > 0) {
            console.log("singleuserdata", singleuserdata);
            const { sim, carrier, mobile_product, name, number, voicemail_number, barring_data, barring_voice, barring_mms, barring_sms, barring_roaming, barring_roamingdata
            }: any = singleuserdata;
            let baringDefault: any = [];
            formik.setFieldValue("name", name);
            formik.setFieldValue("voicemail_number", voicemail_number)
            setform_did_number_Value(number);
            formik.setFieldValue("number", number)

            if (carrier !== null && Object.keys(carrier).length > 0) {
                formik.setFieldValue("carrier", carrier.id);
            }
            if (sim !== null && sim?.id !== 1) {
                formik.setFieldValue("sim", sim.id);
            }
            if (mobile_product !== null && mobile_product?.id !== 1) {
                formik.setFieldValue("mobile_product", mobile_product.id);
            }
            if (barring_voice !== null) {
                formik.setFieldValue("barring_voice", barring_voice.id);
                baringDefault.push({
                    name: "barringvoice",
                    data: barring_voice,
                })
            }
            if (barring_sms !== null) {
                formik.setFieldValue("barring_sms", barring_sms.id);
                baringDefault.push({
                    name: "barringsms",
                    data: barring_sms,
                })
            }
            if (barring_data !== null) {
                formik.setFieldValue("barring_data", barring_data.id);
                baringDefault.push({
                    name: "barringdata",
                    data: barring_data,
                })
            }
            if (barring_mms !== null) {
                formik.setFieldValue("barring_mms", barring_mms.id);
                baringDefault.push({
                    name: "barringmms",
                    data: barring_mms,
                })
            }
            if (barring_roaming !== null) {
                formik.setFieldValue("barring_roaming", barring_roaming.id);
                baringDefault.push({
                    name: "barringroaming",
                    data: barring_roaming,
                })
            }
            if (barring_roamingdata !== null) {
                formik.setFieldValue("barring_roamingdata", barring_roamingdata.id);
                baringDefault.push({
                    name: "barringroamingdata",
                    data: barring_roamingdata,
                })
            }
            setTimeout(() => {
                setDataLoaded(true);
                setBarringsData(baringDefault);
            }, 800)

        }
        // eslint-disable-next-line
    }, [singleuserdata, id])
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
                dispatch(setAppcurrentPageForm("process"));
            }
        })
    }
    useEffect(() => {
        if (formik.dirty) {
            dispatch(setAppcurrentPageForm("yes"));
        }
        // eslint-disable-next-line
    }, [formik.dirty]);
    useEffect(() => {
        if (isCurrenFormEidt === "yes" && isNextRoute !== "" && isNextRoute !== isPervRoute) {
            areYouSure();
        }
        // eslint-disable-next-line
    }, [isNextRoute, isCurrenFormEidt, isPervRoute]);

    useEffect(() => {
        if (!formikEditSim.values.form_end_sub_status) {
            formikEditSim.setFieldValue("form_end_subscription", null);
        }
        // eslint-disable-next-line
    }, [formikEditSim.values])
    useEffect(() => {
        //console.log("formik values", formik.values);

        if (formDependData !== '' && formDependData !== formik.values.carrier) {
            console.log(formDependData, formik.values.carrier);
            setBarringsData([]);
            setBarringsNextPage(1);
        }
        // eslint-disable-next-line
    }, [formik]);

    useEffect(() => {
        if (!isBarringsModalOpen) {
            setBarringsNextPage(1);
        }
    }, [isBarringsModalOpen])
    return (
        <>
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
            {
                isLoading ? <LoaderScreen /> : (
                    <>
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

                        <div className="cm-user-tabs-wrapper  cm-global-tabs-wrapper cm-user-main">
                            <div className="cm-user-name-wrap">
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <div className="fw-600">{t("sidebar_Users")}</div>
                                    <CircleIcon sx={{ fontSize: "10px" }} />
                                    <div>{Object.keys(singleuserdata).length > 0 && singleuserdata?.name}</div>
                                </Stack>
                            </div>
                            <div className="cm-user-form-wrap">
                                {isDataLoaded ? (
                                    <Box sx={{ width: "100%" }}>
                                    <>
                                        <Box className="cm-global-tab-inner-content">
                                            <Grid container spacing={5}>
                                                    <Grid item md={7} sm={12} xs={12}>
                                                    <form onSubmit={formik.handleSubmit}>
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
                                                                                    {formik.errors.name && formik.touched.name && <p className="cm-form-error">{t(`${formik.errors.name}`)}</p>}
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
                                                                                            name="number"
                                                                                            variant="outlined"
                                                                                            value={form_did_number_Value}
                                                                                            onChange={(e) => { formik.handleChange(e); formik.setFieldValue("number", e.target.value); setform_did_number_Value(e.target.value) }}
                                                                                        />
                                                                                    </FormControl>
                                                                                        {formik.errors.number && formik.touched.number && <p className="cm-form-error">{t(`${formik.errors.number}`)}</p>}
                                                                                </Box>
                                                                            </Box>
                                                                            </Grid>
                                                                            <Grid item md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                        apiLink="/mobile/mobile-product/"
                                                                                        apiDataMap={{ labelName: "name", valueName: "id" }}
                                                                                        optionLableName={`${t("MobileProduct")}`}
                                                                                        saveValue={formik}
                                                                                        formFiled="mobile_product"
                                                                                        defaultValue={formik.values.mobile_product}
                                                                                    />
                                                                                </Box>
                                                                            </Grid>
                                                                            {/* <Grid item md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        apiLink="/mobile/sim/"
                                                                                        apiDataMap={{ label: "puk1", value: "id" }}
                                                                                        optionLableName={`${t("Sim")}`}
                                                                                        saveValue={formik}
                                                                                        formFiled="sim"
                                                                                        defaultValue={formik.values.sim}
                                                                                    />
                                                                                    {formik.errors.sim && formik.touched.sim && <p className="cm-form-error">{formik.errors.sim}</p>}
                                                                            </Box>
                                                                        </Grid> */}
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                            <Box className="cm-form-inner-fields">
                                                                                <Box className="">
                                                                                    <div className="form-lable-name">
                                                                                        {t("VoicemailNumber")}
                                                                                    </div>
                                                                                    <FormControl sx={{ width: "100%" }}>
                                                                                        <TextField
                                                                                            name="voicemail_number"
                                                                                            variant="outlined"
                                                                                            value={formik.values.voicemail_number}
                                                                                            onChange={(e) => { formik.handleChange(e); formik.setFieldValue("voicemail_number", e.target.value); }}
                                                                                        />
                                                                                    </FormControl>
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
                                                                    {/* <Box sx={{ flexGrow: 1 }}>
                                                                    <Grid container spacing={3}>
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                            <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier__id"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                        apiLink="/mobile/barring-voice/"
                                                                                        apiDataMap={{ labelName: "operator_code", valueName: "id" }}
                                                                                        optionLableName={`${t("Voice")}`}
                                                                                        saveValue={formik}
                                                                                        formFiled="barring_voice"
                                                                                        defaultValue={formik.values.barring_voice}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier__id"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                        apiLink="/mobile/barring-sms/"
                                                                                        apiDataMap={{ labelName: "operator_code", valueName: "id" }}
                                                                                        optionLableName={`${t("SMS")}`}
                                                                                        saveValue={formik}
                                                                                        formFiled="barring_sms"
                                                                                        defaultValue={formik.values.barring_sms}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier__id"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                        apiLink="/mobile/barring-mms/"
                                                                                        apiDataMap={{ labelName: "operator_code", valueName: "id" }}
                                                                                        optionLableName={`${t("MMS")}`}
                                                                                        saveValue={formik}
                                                                                        formFiled="barring_mms"
                                                                                        defaultValue={formik.values.barring_mms}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier__id"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                    apiLink="/mobile/barring-data/"
                                                                                    apiDataMap={{ labelName: "operator_code", valueName: "id" }}
                                                                                    optionLableName={`${t("Data")}`}
                                                                                    saveValue={formik}
                                                                                    formFiled="barring_data"
                                                                                    defaultValue={formik.values.barring_data}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier__id"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                    apiLink="/mobile/barring-roaming/"
                                                                                    apiDataMap={{ labelName: "operator_code", valueName: "id" }}
                                                                                    optionLableName={`${t("Roaming")}`}
                                                                                    saveValue={formik}
                                                                                    formFiled="barring_roaming"
                                                                                    defaultValue={formik.values.barring_roaming}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                        <Grid item lg={6} md={6} sm={6} xs={12}>
                                                                                <Box sx={{ width: "100%" }}>
                                                                                    <PaginationEditDropDown
                                                                                        dependOn="apiParamValue"
                                                                                        apiParamName="carrier__id"
                                                                                        apiParamValue={formik.values.carrier}
                                                                                    apiLink="/mobile/barring-roaming-data/"
                                                                                    apiDataMap={{ labelName: "operator_code", valueName: "id" }}
                                                                                    optionLableName={`${t("RoamingData")}`}
                                                                                    saveValue={formik}
                                                                                    formFiled="barring_roamingdata"
                                                                                    defaultValue={formik.values.barring_roamingdata}
                                                                                />
                                                                            </Box>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Box> */}
                                                            </Box>
                                                        </Box>
                                                    </form>
                                                    <Box className="form-mb-30">
                                                        <div className="form-row-title">
                                                            {t("CatalogServices")}
                                                        </div>
                                                    </Box>
                                                    {
                                                        catalougeSData.length > 0 ?
                                                            (
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
                                                                </>)
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
                                                                        onClick={() => setCatalougeSModalOpen(true)}
                                                                    >
                                                                        {t("Add")}
                                                                    </Button>
                                                                </Box>
                                                            )
                                                    }
                                                </Grid>
                                                <Grid item md={5} sm={12} xs={12}>
                                                    <Box className="cm-right-user-wrapper">
                                                        <div className="form-row-title">
                                                            {t("EditSimCard")}
                                                        </div>

                                                        <form onSubmit={formikEditSim.handleSubmit}>
                                                            <Grid item sm={12} xs={12}>
                                                                <Box sx={{ width: "100%", marginBottom: "15px" }}>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="form_temp_close_subscriptioin"
                                                                                    checked={
                                                                                        formikEditSim.values.form_temp_close_subscriptioin
                                                                                    }
                                                                                    onChange={formikEditSim.handleChange}
                                                                                />
                                                                            }
                                                                            label={t("TemporarilyCloseSubscription")}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={12} xs={12}>
                                                                <Box sx={{ width: "100%", marginBottom: "15px" }}>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="form_reopen_temp_close_subscriptioin"
                                                                                    checked={
                                                                                        formikEditSim.values.form_reopen_temp_close_subscriptioin
                                                                                    }
                                                                                    onChange={formikEditSim.handleChange}
                                                                                />
                                                                            }
                                                                            label={t("ReopeningTemporarilyCloseSubscription")}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item sm={12} xs={12}>
                                                                <Box sx={{ width: "100%", marginBottom: "15px" }}>
                                                                    <FormControl sx={{ width: "100%" }}>
                                                                        <FormControlLabel
                                                                            control={
                                                                                <Checkbox
                                                                                    name="form_end_sub_status"
                                                                                    checked={
                                                                                        formikEditSim.values.form_end_sub_status
                                                                                    }
                                                                                    onChange={formikEditSim.handleChange}
                                                                                />
                                                                            }
                                                                            label={t("EndSubscription")}
                                                                        />
                                                                    </FormControl>
                                                                    {
                                                                        formikEditSim.values.form_end_sub_status && (
                                                                            <FormControl sx={{ width: '100%' }} className="cm-datepicker-wrappwer">
                                                                                    <DatePicker dateFormat="d MMMM yyyy HH:mm" timeFormat="HH:mm" isClearable={true} showTimeSelect minDate={editStartDate} className="cm-date-picker-field" name="form_end_subscription" selected={formikEditSim.values.form_end_subscription} onChange={(date: any) => {
                                                                                    formikEditSim.setFieldValue("form_end_subscription", date);
                                                                                    setEditStartDate(date);
                                                                                }} />
                                                                            </FormControl>
                                                                        ) 
                                                                    }

                                                                </Box>
                                                                {/* <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    name="form_end_subscription"
                                                    checked={
                                                      formikEditSim.values.form_end_subscription
                                                    }
                                                    onChange={formikEditSim.handleChange}
                                                  />
                                                }
                                                label={t("EndSubscription")}
                                              /> */}
                                                            </Grid>
                                                            <Grid item sm={12} xs={12}>
                                                                <Box sx={{ width: "100%" }}>
                                                                    <PaginationDropDown
                                                                        apiLink="/mobile/sim/"
                                                                        apiDataMap={{ labelName: "icc", valueName: "id" }}
                                                                        optionLableName={`${t("ChangeSIMCard")}`}
                                                                        saveValue={formikEditSim}
                                                                        formFiled="form_change_sim_card"
                                                                        defaultValue={formikEditSim.values.form_change_sim_card}
                                                                    />
                                                                    {/* <FormikLayout
                                            labelName="ChangeSIMCard"
                                            name="form_change_sim_card"
                                            type="dropdown"
                                            dropDown={{ data: dropDownSim, label: "icc", value: "id" }}
                                            form={formikEditSim}
                                          /> */}
                                                                    {/* <div className="form-lable-name">
                                                  {t("ChangeSIMCard")}
                                                </div>
                                                <FormControl sx={{ width: "100%" }}>
                                                  <Select
                                                    className="form-select-pad"
                                                    id="form_change_sim_card"
                                                    name="form_change_sim_card"
                                                    label=""
                                                    value={ formikEditSim.values.form_change_sim_card}
                                                    onChange={formikEditSim.handleChange}
                                                  >
                                                    <MenuItem value="" selected>Choose Option</MenuItem>
                                                    {dropDownSim.length > 0 && (
                                                      dropDownSim.map((val: any) => (
                                                        <MenuItem key={`user-edit-sim-carrier-data--${val.id}`} value={val.id}>{val.sim_type}</MenuItem>
                                                      ))
                                                    )}
                                                  </Select>
                                                </FormControl>
                                                {formikEditSim.errors.form_change_sim_card && formikEditSim.touched.form_change_sim_card && (
                                                  <p className="cm-form-error">{`${formikEditSim.errors.form_change_sim_card}`}</p>
                                                )} */}
                                                                </Box>
                                                                {/* <FormControlLabel
                                                control={
                                                  <Checkbox
                                                    name="form_change_sim_card"
                                                    checked={
                                                      formikEditSim.values.form_change_sim_card
                                                    }
                                                    onChange={formikEditSim.handleChange}
                                                  />
                                                }
                                                label={t("ChangeSIMCard")}
                                              /> */}
                                                            </Grid>

                                                            <Button
                                                                variant="contained"
                                                                className="cm-btn-style"
                                                                sx={{
                                                                    color: colorConfigs.btnColor.hoverbgWhite,
                                                                    background: colorConfigs.btnColor.bgColorGreen,
                                                                    marginTop: "40px",
                                                                    "&: hover": {
                                                                        color: colorConfigs.btnColor.bgColorGreen,
                                                                        background: colorConfigs.btnColor.hoverbgWhite,
                                                                    },
                                                                }}
                                                                type="submit"
                                                            >
                                                                {t("UpdateSIMCard")}
                                                            </Button>
                                                        </form>
                                                    </Box>

                                                    <Box className="cm-right-user-wrapper" style={{ marginTop: "40px" }}>
                                                        <div className="form-row-title">
                                                            {t("OtherDetails")}
                                                        </div>
                                                        <Grid item sm={12} xs={12}>
                                                            <hr></hr>
                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                                alignItems="center"
                                                                justifyContent={"between"}
                                                            >
                                                                <Box
                                                                    className="order-sl-th"
                                                                    sx={{ width: "70%" }}
                                                                >
                                                                    puk 1
                                                                </Box>
                                                                <Box
                                                                    className="order-sl-td"
                                                                    sx={{ width: "30%" }}
                                                                >
                                                                    95189965
                                                                </Box>
                                                            </Stack>
                                                            <hr></hr>

                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                                alignItems="center"
                                                                justifyContent={"between"}
                                                            >
                                                                <Box
                                                                    className="order-sl-th"
                                                                    sx={{ width: "70%" }}
                                                                >
                                                                    {t("SubscripionOpenDate")}
                                                                </Box>
                                                                <Box
                                                                    className="order-sl-td"
                                                                    sx={{ width: "30%" }}
                                                                >
                                                                    2019-05-21
                                                                </Box>
                                                            </Stack>
                                                            <hr></hr>

                                                            <Stack
                                                                direction="row"
                                                                spacing={2}
                                                                alignItems="center"
                                                                justifyContent={"between"}
                                                            >
                                                                <Box
                                                                    className="order-sl-th"
                                                                    sx={{ width: "70%" }}
                                                                >
                                                                    {t("SubscriptionCloseDate")}
                                                                </Box>
                                                                <Box
                                                                    className="order-sl-td"
                                                                    sx={{ width: "30%" }}
                                                                >
                                                                    2022-05-21
                                                                </Box>
                                                            </Stack>
                                                        </Grid>
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
                                                justifyContent={"space-between"}
                                                className="form-submit-cancel-btn-wrapper"
                                            >
                                                <Box>
                                                    <Stack
                                                        direction="row"
                                                        spacing={2}
                                                        alignItems="center"
                                                        justifyContent={"start"}
                                                        className="form-submit-cancel-btn-wrapper"
                                                    >
                                                        <Button
                                                            onClick={formik.submitForm}
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

                                                <Button
                                                    variant="contained"
                                                    endIcon={<CancelIcon />}
                                                    className="cm-btn-style justify-self-end"
                                                    sx={{
                                                        color: colorConfigs.btnColor.hoverbgWhite,
                                                        background: colorConfigs.btnColor.bgColorRed,
                                                        "&: hover": {
                                                            color: colorConfigs.btnColor.bgColorRed,
                                                            background: colorConfigs.btnColor.hoverbgWhite,
                                                        },
                                                    }}
                                                    onClick={() => deleteMobileUser(singleuserdata)}
                                                >
                                                    {t("Delete")}
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </>
                                </Box>
                                ) : <LoaderScreen />}

                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
export default EditMobileUser;