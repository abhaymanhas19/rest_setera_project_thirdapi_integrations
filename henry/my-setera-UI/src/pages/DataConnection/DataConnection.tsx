import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import colorConfigs from '../../configs/colorConfigs';
import { useDispatch, useSelector } from 'react-redux';
import { setDataConnectionState } from '../../redux/features/dataConnectionStateSlice';
import DataTableComponent from '../../components/layout/DataTableComponet';
import { useTranslation } from 'react-i18next';

type Props = {};

const DataConnectionEdit = (props: any) => {
    const { setCustomTabs, row } = props;
      console.log("01", row);
      console.log("02", setCustomTabs);
    const { t } = useTranslation();
    const formSwalTranslation = {
        formSwalTitle: t('AreYouWanttoSave'),
        formSwalText: t('Youwontbeabletorevertthis'),
        fomrSwalCancel: t('Cancel'),
        formSwalSaved: t('YesSavedit'),
        formSwalDataSaved: t('YourDatahasbeensaved'),
        formSwalSubmited: t('Submited')
    }
    const formik = useFormik({
        initialValues: {
            form_dc_SiteName: row.siteName ? row.siteName : "",
            form_dc_SiteAddress: row.address ? row.address : "",
            form_dc_ContactName: row.contactName ? row.contactName : "",
            form_dc_ContactPhone: row.contactPhone ? row.contactPhone : "",
            form_dc_ContactEmail: row.contactEmail ? row.contactEmail : "",
            form_dc_ContactHandle: row.contactHandle ? row.contactHandle : "",
            form_dc_Speed: row.speed ? row.speed : "",
            form_dc_Device: row.device ? row.device : "",
            form_dc_DeviceSerialNum: row.deviceSerialNumber ? row.deviceSerialNumber : ""
        },
        onSubmit: (values) => {
            console.log(values);
            Swal.fire({
                title: formSwalTranslation.formSwalTitle,
                text: formSwalTranslation.formSwalText,
                icon: 'warning',
                cancelButtonText: formSwalTranslation.fomrSwalCancel,
                showCancelButton: true,
                confirmButtonColor: '#103256',
                cancelButtonColor: '#d33',
                confirmButtonText: formSwalTranslation.formSwalSaved,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        formSwalTranslation.formSwalSubmited,
                        formSwalTranslation.formSwalDataSaved,
                        'success'
                    )
                }
            })
        },
    });
    return (
        <>
            <div className='cm-single-data-conn-wrapper'>
                <div className='cm-data-conn-form-wrap'>
                    <form onSubmit={formik.handleSubmit}>
                        <Box className='cm-form-inner-fields'>
                            <Box className='form-mb-30'>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Grid container spacing={3}>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('SiteName')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='dc_SiteName'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_SiteName}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('SiteAddress')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        variant="outlined"
                                                        name='form_dc_SiteAddress'
                                                        value={formik.values.form_dc_SiteAddress}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('ContactName')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_ContactName'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_ContactName}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('ContactPhone')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_ContactPhone'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_ContactPhone}
                                                        onChange={formik.handleChange}
                                                        type="number"
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('ContactEmail')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_ContactEmail'
                                                        variant="outlined"
                                                        type="email"
                                                        value={formik.values.form_dc_ContactEmail}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('ContactRipeNicHandle')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_ContactHandle'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_ContactHandle}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('Speed')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_Speed'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_Speed}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('Device')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_Device'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_Device}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                        <Grid item lg={4} md={6} sm={6} xs={12}>
                                            <Box sx={{ width: "100%" }}>
                                                <div className='form-lable-name'>{t('DeviceSerialNumber')}</div>
                                                <FormControl sx={{ width: "100%" }}>
                                                    <TextField
                                                        name='form_dc_DeviceSerialNum'
                                                        variant="outlined"
                                                        value={formik.values.form_dc_DeviceSerialNum}
                                                        onChange={formik.handleChange}
                                                    />
                                                </FormControl>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ marginTop: "36px" }}>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent={"start"} className="form-submit-cancel-btn-wrapper">
                                <Button variant="contained" endIcon={<CheckCircleIcon />}
                                    className="cm-btn-style"
                                    sx={{
                                        color: colorConfigs.btnColor.hoverbgWhite,
                                        background: colorConfigs.btnColor.bgColorGreen,
                                        "&: hover": {
                                            color: colorConfigs.btnColor.bgColorGreen,
                                            background: colorConfigs.btnColor.hoverbgWhite,
                                        }
                                    }} type="submit"> {t("saveChanges")}</Button>
                                <Button variant="contained" endIcon={<CancelIcon />}
                                    className="cm-btn-style"
                                    sx={{
                                        color: colorConfigs.btnColor.hoverbgWhite,
                                        background: colorConfigs.btnColor.bgColorRed,
                                        "&: hover": {
                                            color: colorConfigs.btnColor.bgColorRed,
                                            background: colorConfigs.btnColor.hoverbgWhite,
                                        }
                                    }} onClick={() => setCustomTabs(0)}>{t("discard")}</Button>
                            </Stack>
                        </Box>
                    </form>
                </div>
            </div>
        </>
    )
}

const DataConnection = (props: Props) => {
    const dispatch = useDispatch();
    const [customTabs, setCustomTabs] = useState(0);
    const getAllDataConnection = useSelector((state: any) => state.dataConnection.dataConnectionState);
    const [selectDataConnection, setSelectDataConnection] = useState({});
    const { t } = useTranslation();
    //Setting Data Connetcion
    useEffect(() => {
        if (getAllDataConnection.length === 0) {
            dispatch(setDataConnectionState(DataConData));
        }
        // eslint-disable-next-line
    }, [getAllDataConnection]);

    const handleTabs = (val: number) => {
        setCustomTabs(val);
    }
    const handleDataConnDetail = (row: any) => {
        setSelectDataConnection(row);
    }
    useEffect(() => {
        if (Object.keys(selectDataConnection).length > 0) {
            handleTabs(1);
        }
    }, [selectDataConnection]);

    const DataConRow = [
        {
            name: t('SiteName'),
            cell: (row: any) => <Box sx={{ cursor: "pointer" }} onClick={() => handleDataConnDetail(row)} className="cm-table-td">{row.siteName}</Box>,

        },
        {
            name: t('SiteAddress'),
            cell: (row: any) => <Box className="cm-table-td">{row.address}</Box>,
        },
        {
            name: t('ContactName'),
            cell: (row: any) => <Box className="cm-table-td">{row.contactName}</Box>,
        },
    ]
    const DataConData = [
        {
            id: 1,
            siteName: 'Lorem Ipsum Dollor',
            address: 'www.example.com',
            contactName: `Smith Jack`,
            contactPhone: "12348910",
            contactEmail: "johndoe@example.com",
            contactHandle: "lorem ipsum dollor set",
            speed: "100 Mbps",
            device: "",
            deviceSerialNumber: "abcd12342323",
        },
        {
            id: 2,
            siteName: 'Nemo Enim Ipsam Voluptatem',
            address: 'www.example.com',
            contactName: `John Doe`,
        },
        {
            id: 3,
            siteName: 'Ipsam Voluptatem Neque',
            address: 'www.example.com',
            contactName: `James Smith`,
        },
        {
            id: 4,
            siteName: 'Nam Libero Tempore',
            address: 'www.example.com',
            contactName: `Elizabeth Doe`,
        },
        {
            id: 5,
            siteName: 'Libero Enim Ipsam',
            address: 'www.example.com',
            contactName: `Alison Hill`,
        },
        {
            id: 6,
            siteName: 'Ipsam Voluptatem Neque',
            address: 'www.example.com',
            contactName: `Amelia Hart`,
        },
        {
            id: 7,
            siteName: 'Voluptatem Enim Ipsam ',
            address: 'www.example.com',
            contactName: `Nicholas Grey`,
        },
        {
            id: 8,
            siteName: 'Libero Enim Ipsam ',
            address: 'www.example.com',
            contactName: `Alison Hill`,
        },
        {
            id: 9,
            siteName: 'Ipsam Voluptatem Neque',
            address: 'www.example.com',
            contactName: `Amelia Hart`,
        },
        {
            id: 10,
            siteName: 'Ipsam Voluptatem Neque',
            address: 'www.example.com',
            contactName: `Amelia Hart`,
        },
        {
            id: 11,
            siteName: 'Voluptatem Enim Ipsam ',
            address: 'www.example.com',
            contactName: `Nicholas Grey`,
        },
    ];
    const DataConnectionComponent = () => (
        <>
            <div className='cm-datacon-Data-table'>
                {getAllDataConnection.length > 0 && (
                    <DataTableComponent isWithBG={false} tRow={DataConRow} tData={getAllDataConnection} isRounded={true} />
                )}
            </div>
        </>
    );
    return (
        <div className='cm-data-connection-main'>
            {customTabs === 0 && (<><DataConnectionComponent /></>)}
            {customTabs === 1 && (<><DataConnectionEdit setCustomTabs={setCustomTabs} row={selectDataConnection} /></>)}
        </div>
    );
};

export default DataConnection;