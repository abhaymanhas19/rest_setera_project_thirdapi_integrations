import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import colorConfigs from '../../../configs/colorConfigs';
import { useFormik } from 'formik';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import DataTableComponent from "../../../components/layout/DataTableComponet";
import { RootState } from "../../../redux/store";
import { setAppNextRoute, setAppcurrentPageForm } from "../../../redux/features/appStateSlice";
import AxiosMain from "../../../components/layout/AxiosMain";
import LoaderScreen from "../../../components/layout/LoaderScreen";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
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
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}
function SalesOrderEdit() {
    const param = useParams();
    const { id } = param;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [customTabValue, setCustomTabValue] = useState(0);
    const isCurrenFormEidt = useSelector((state: RootState) => state.appState.appCurrentPageForm);
    const isNextRoute = useSelector((state: RootState) => state.appState.appNextRoute);
    const isPervRoute = useSelector((state: RootState) => state.appState.appPrevRoute);
    const checkUser = useSelector((state: RootState) => state.authState.authState);
    const [salesOrderData, setSingleOrder] = useState<any>({});
    const [SingleSaleOrderTableData, setSingleSaleOrderTableData] = useState([]);
    const [soProductFamily, setSOProductFamily] = useState([]);
    const [soProductFamilyTotal, setSOProductFamilyTotal] = useState(0);
    const { t } = useTranslation();
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${checkUser.access}`,
        },
    }
    const SingleSaleOrderTableRow = [
        {
            name: t('Product'),
            cell: (row: any) => row.product_id[1],
        },
        {
            name: t('ProductFamily'),
            cell: (row: any) => row.product_family_id[1],
        },
        {
            name: t('Description'),
            cell: (row: any) => row.name
        },
        {
            name: t('OrderedQty'),
            cell: (row: any) => row.quantity
        },
        {
            name: t('UnitPrice'),
            cell: (row: any) => row.price_unit
        },
        {
            name: t('Subtotal'),
            cell: (row: any) => row.price_subtotal
        },
    ];
    const formSwalTranslation = {
        formSwalTitle: t('AreYouWanttoSave'),
        formSwalText: t('Youwontbeabletorevertthis'),
        fomrSwalCancel: t('Cancel'),
        formSwalSaved: t('YesSavedit'),
        formSwalDataSaved: t('YourDatahasbeensaved'),
        formSwalSubmited: t('Submited'),
        formdontSaveChanges: t('Areyousureyoudontwanttosavethechanges?')
    }
    const formik = useFormik({
        initialValues: {
            name: "Test Name",
            form_so_invoice_address: 10,
            form_so_delivery_address: 10,
            form_so_customer_end_user: 10,
            //form_so_validity: 10,
            form_so_payment_term: 10,
            form_so_contact_duration: 10,
            form_so_delivery_address_2: 10,
            form_so_oi_shipping_policy: 10,
            form_so_oi_expected_date: 10,
            form_so_oi_commitment_date: 10,
            form_so_oi_effective_date: 10,
            form_so_oi_display_lines_without_quantity: false,
            form_so_si_sale_person: 10,
            form_so_si_seller_company: 10,
            form_so_si_customer_refrence: 10,
        },
        onSubmit: (values) => {
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
    const customTabHandleChange = (newValue: number) => {
        setCustomTabValue(newValue);
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
                dispatch(setAppcurrentPageForm("process"));
            }
        })
    }
    useEffect(() => {
        dispatch(setAppcurrentPageForm("yes"));
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (isCurrenFormEidt === "yes" && isNextRoute !== "" && isNextRoute !== isPervRoute) {
            areYouSure();
        }
        // eslint-disable-next-line
    }, [isNextRoute, isCurrenFormEidt, isPervRoute]);
    const saleOrderPage = () => {
        dispatch(setAppNextRoute("/accounting/sales-order"));
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
                // navigate("/accounting/sales-order");
            }
        })
    }

    const getSingleSaleOrder = (id: any) => {
        AxiosMain.get(`/accounting/sales-order/${id}/`, config).then((res) => {
            if (res.status === 200) {
                setSingleOrder(res.data);
            }
        }).catch((e) => {
            console.log("error", e);
            setIsLoading(false);
        })
    }
    useEffect(() => {
        if (id !== '' && Object.keys(salesOrderData).length === 0) {
            getSingleSaleOrder(id);
        }
        if (Object.keys(salesOrderData).length > 0) {
            console.log("salesOrderData", salesOrderData);
            const { salesOrderDetails, orderLines, orderTotals } = salesOrderData
            if (salesOrderDetails['partner_invoice_id'].length > 0) {
                formik.setFieldValue('form_so_invoice_address', salesOrderDetails['partner_invoice_id'][1]);
            }
            if (salesOrderDetails['partner_shipping_id'].length > 0) {
                formik.setFieldValue('form_so_delivery_address', salesOrderDetails['partner_shipping_id'][1]);
            }
            if (salesOrderDetails['partner_end_customer_id'].length > 0) {
                formik.setFieldValue('form_so_customer_end_user', salesOrderDetails['partner_end_customer_id'][1]);
            }
            if (salesOrderDetails['payment_term_id'].length > 0) {
                formik.setFieldValue('form_so_payment_term', salesOrderDetails['payment_term_id'][1]);
            }
            if (salesOrderDetails['carrier_id'].length > 0) {
                formik.setFieldValue('form_so_delivery_address_2', salesOrderDetails['carrier_id'][1]);
            }

            if (salesOrderDetails['original_contract_duration'] !== '' || salesOrderDetails['original_contract_duration'] !== null) {
                formik.setFieldValue('form_so_contact_duration', salesOrderDetails['original_contract_duration']);
            }
            // 
            // 
            if (salesOrderDetails['user_id'].length > 0) {
                formik.setFieldValue('form_so_si_sale_person', salesOrderDetails['user_id'][1]);
            }
            if (salesOrderDetails['seller_company_id'].length > 0) {
                formik.setFieldValue('form_so_si_seller_company', salesOrderDetails['seller_company_id'][1]);
            }
            formik.setFieldValue('form_so_oi_shipping_policy', salesOrderDetails['picking_policy']);
            formik.setFieldValue('form_so_oi_expected_date', salesOrderDetails['expected_date']);
            formik.setFieldValue('form_so_oi_commitment_date', salesOrderDetails['commitment_date']);
            formik.setFieldValue('form_so_oi_effective_date', salesOrderDetails['effective_date']);
            formik.setFieldValue('form_so_si_customer_refrence', salesOrderDetails['client_order_ref']);
            setSingleSaleOrderTableData(orderLines);
            //setSOProductFamily(orderTotals);
            if (orderTotals.length > 0) {
                let pfArray: any = [];
                orderTotals.map((val: any) => {
                    if (val.product_family_id.length > 0) {
                        const obj = { id: val.product_family_id[0], name: val.product_family_id[1] }
                        pfArray.push(obj);
                    }
                    if (val.sub_total !== '' || val.sub_total !== 0) {
                        setSOProductFamilyTotal(val.sub_total);
                    }
                })
                setSOProductFamily(pfArray)
            }
            setIsLoading(false);
        }
    }, [id, salesOrderData])
    return (
        <>
            <div className='cm-global-tabs-wrapper cm-sale-order-wrapper'>
                <Box sx={{ my: "10px" }}>
                    {/* <Button variant="contained" startIcon={<ArrowBackIcon />}
                        className="cm-btn-style"
                        sx={{
                            color: colorConfigs.btnColor.hoverbgWhite,
                            background: colorConfigs.btnColor.bgColorRed,
                            "&: hover": {
                                color: colorConfigs.btnColor.bgColorRed,
                                background: colorConfigs.btnColor.hoverbgWhite,
                            }
                        }} onClick={() => navigate("/accounting/sales-order")}>{t('Back')}</Button> */}
                    <Button variant="contained"
                        className="cm-btn-style"
                        sx={{
                            color: colorConfigs.btnColor.hoverbgWhite,
                            background: colorConfigs.btnColor.bgColorGreen,
                            "&: hover": {
                                color: colorConfigs.btnColor.bgColorGreen,
                                background: colorConfigs.btnColor.hoverbgWhite,
                            }
                        }} onClick={() => saleOrderPage()}><ArrowBackIcon /></Button>
                </Box>
                <div className='cm-user-form-wrap'>
                    {isLoading ? (<LoaderScreen />) : (
                        <>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={12} xs={12}>
                                        <Box className='cm-subcription-col-box'>
                                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('InvoiceAddress')}</Box>
                                                <Box sx={{ width: "50%" }} className="cm-col-box-td">{formik.values.form_so_invoice_address}</Box>
                                            </Stack>
                                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('DeliveryAddress')}</Box>
                                                <Box sx={{ width: "50%" }} className="cm-col-box-td">{formik.values.form_so_delivery_address}</Box>
                                            </Stack>
                                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('CustomerEndUser')}</Box>
                                                <Box sx={{ width: "50%" }} className="cm-col-box-td">{formik.values.form_so_customer_end_user}</Box>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={6} md={12} xs={12}>
                                        <Box className='cm-subcription-col-box'>
                                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('PaymentTerms')}</Box>
                                                <Box sx={{ width: "50%" }} className="cm-col-box-td">{formik.values.form_so_payment_term}</Box>
                                            </Stack>
                                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('ContractDuration')}</Box>
                                                <Box sx={{ width: "50%" }} className="cm-col-box-td">{formik.values.form_so_contact_duration}</Box>
                                            </Stack>
                                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('DeliveryMethod')}</Box>
                                                <Box sx={{ width: "50%" }} className="cm-col-box-td">{formik.values.form_so_delivery_address_2}</Box>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        <form onSubmit={formik.handleSubmit}>
                                <Box sx={{ width: "100%", display: "none" }} className="cm-form-before-tabs">
                                <Box className='cm-form-inner-fields'>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Grid container spacing={3}>
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('InvoiceAddress')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_invoice_address"
                                                            value={formik.values.form_so_invoice_address}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('DeliveryAddress')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_delivery_address"
                                                            value={formik.values.form_so_delivery_address}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('CustomerEndUser')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_customer_end_user"
                                                            value={formik.values.form_so_customer_end_user}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('ConfirmationDate')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_validity"
                                                            value={formik.values.form_so_validity}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid> */}
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('PaymentTerms')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_payment_term"
                                                            value={formik.values.form_so_payment_term}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('ContractDuration')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_contact_duration"
                                                            value={formik.values.form_so_contact_duration}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                                <Box sx={{ width: "100%" }}>
                                                    <div className='form-lable-name'>{t('DeliveryMethod')}</div>
                                                    <FormControl sx={{ width: "100%" }}>
                                                        <TextField
                                                            name="form_so_delivery_address_2"
                                                            value={formik.values.form_so_delivery_address_2}
                                                            onChange={formik.handleChange}
                                                            disabled={true}
                                                        />
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Box>
                                <Box sx={{ marginTop: "46px" }}>
                                <Box sx={{ paddingBottom: '15px', position: "relative" }}>
                                    <Tabs value={customTabValue} aria-label="Custom-User-Tabs" sx={{ overflow: 'visible' }} className="cm-global-tabs-component">
                                        <Stack direction="row" spacing={2} className="cm-global-tab-btn-wrapper">
                                            {/* <Button variant="outlined" {...a11yProps(3)} onClick={() => customTabHandleChange(3)} className={customTabValue === 3 ? "cm-global-tab-btn tab-active" : "cm-global-tab-btn"}>{t('Product')}</Button> */}
                                            <Button variant="outlined" {...a11yProps(0)} onClick={() => customTabHandleChange(0)} className={customTabValue === 0 ? "cm-global-tab-btn tab-active" : "cm-global-tab-btn"}>{t('OrderLines')}</Button>
                                            <Button variant="outlined" {...a11yProps(1)} onClick={() => customTabHandleChange(1)} className={customTabValue === 1 ? "cm-global-tab-btn tab-active" : "cm-global-tab-btn"}>{t('OptionalProducts')}</Button>
                                            <Button variant="outlined" {...a11yProps(2)} onClick={() => customTabHandleChange(2)} className={customTabValue === 2 ? "cm-global-tab-btn tab-active" : "cm-global-tab-btn"}>{t('OtherInformation')}</Button>
                                        </Stack>
                                    </Tabs>
                                </Box>
                                <Box className='cm-global-tabs-content'>
                                    <TabPanel value={customTabValue} index={0}>
                                        {customTabValue === 0 && (
                                            <>
                                                <Box className='cm-global-tab-inner-content'>
                                                    <div className='cm-form-inner-fields'>
                                                        <Box sx={{ marginBottom: '15px' }}>
                                                            {/* <Stack direction="row" spacing={2} alignItems="center" justifyContent={"end"}>
                               <Button variant="contained" endIcon={<AddIcon />}
                                 className="cm-btn-style"
                                 sx={{
                                   color: colorConfigs.btnColor.hoverbgWhite,
                                   background: colorConfigs.btnColor.bgColorGreen,
                                   "&: hover": {
                                     color: colorConfigs.btnColor.bgColorGreen,
                                     background: colorConfigs.btnColor.hoverbgWhite,
                                   }
                                 }}>{t('AddProduct')}</Button>
                             </Stack> */}
                                                        </Box>
                                                        <div className='cm-sale-order-Data-table'>
                                                            <DataTableComponent isWithBG={false} isRounded={false} tRow={SingleSaleOrderTableRow} tData={SingleSaleOrderTableData} />
                                                        </div>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Grid container spacing={3} justifyContent={"space-between"}>
                                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                    <Box sx={{ marginTop: '15px' }}>
                                                                        <Box className='cm-order-sale-total-tbl'>
                                                                            <Box className='order-sale-table-data tfoot'>
                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>{t('ProductFamily')}</Box>
                                                                                </Stack>
                                                                            </Box>
                                                                            {
                                                                                soProductFamily.length > 0 ?
                                                                                    <>
                                                                                        {soProductFamily.map((val: any, ind) => (
                                                                                            <Box className='order-sale-table-data' key={`product-fm-ind-${ind}`}>
                                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>{val.name}</Box>
                                                                                                    <Box className='order-sl-td' sx={{ width: "20%" }}>{val.id}</Box>
                                                                                                </Stack>
                                                                                            </Box>
                                                                                        ))}
                                                                                        <Box className='order-sale-table-data tfoot'>
                                                                                            <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                                <Box className='order-sl-th' sx={{ width: "80%" }}>Sub Total:</Box>
                                                                                                <Box className='order-sl-td' sx={{ width: "20%" }}>{soProductFamilyTotal !== 0 ? "$0.00" : "$0.00"}</Box>
                                                                                            </Stack>
                                                                                        </Box>
                                                                                    </>
                                                                                    : (
                                                                                        <>
                                                                                            <Box className='order-sale-table-data'>
                                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>Recurring:</Box>
                                                                                                    <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
                                                                                                </Stack>
                                                                                            </Box>
                                                                                            <Box className='order-sale-table-data tfoot'>
                                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>One time charge:</Box>
                                                                                                    <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
                                                                                                </Stack>
                                                                                            </Box>
                                                                                        </>
                                                                                    )
                                                                            }

                                                                        </Box>
                                                                    </Box>
                                                                </Grid>
                                                                <Grid item lg={4} md={6} sm={6} xs={12}>
                                                                    <Box sx={{ marginTop: '15px' }}>
                                                                        <Box className='cm-order-sale-total-tbl'>
                                                                            <Box className='order-sale-table-data'>
                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>{t('UntaxedAmount')}:</Box>
                                                                                    <Box className='order-sl-td' sx={{ width: "20%" }}>{Object.keys(salesOrderData).length > 0 ? "$0.00" : "$0.00"}</Box>
                                                                                </Stack>
                                                                            </Box>
                                                                            <Box className='order-sale-table-data'>
                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>{t('Taxes')}:</Box>
                                                                                    <Box className='order-sl-td' sx={{ width: "20%" }}>{Object.keys(salesOrderData).length > 0 ? "$0.00" : "$0.00"}</Box>
                                                                                </Stack>
                                                                            </Box>
                                                                            <Box className='order-sale-table-data tfoot'>
                                                                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                                                                    <Box className='order-sl-th' sx={{ width: "80%" }}>{t('Total')}:</Box>
                                                                                    <Box className='order-sl-td' sx={{ width: "20%" }}>{Object.keys(salesOrderData).length > 0 ? "$0.00" : "$0.00"}</Box>
                                                                                </Stack>
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>
                                                                </Grid>

                                                            </Grid>
                                                        </Box>
                                                        <Box sx={{ marginTop: '30px' }} className="order-sale-term-txt">
                                                            {t('SeteraInternationalGeneralDeliveryTermsforBusinessCustomers')}
                                                        </Box>
                                                    </div>
                                                </Box>
                                            </>
                                        )}
                                    </TabPanel>
                                    <TabPanel value={customTabValue} index={1}>
                                        {customTabValue === 1 && (
                                            <>
                                                <Box className='cm-global-tab-inner-content'>
                                                    <div className='cm-form-inner-fields'>
                                                        {t('OptionalProducts')}
                                                    </div>
                                                </Box>
                                            </>
                                        )}
                                    </TabPanel>
                                    <TabPanel value={customTabValue} index={2}>
                                        {customTabValue === 2 && (
                                            <>
                                                <Box className='cm-global-tab-inner-content'>
                                                    <div className='cm-form-inner-fields'>
                                                        <Grid container spacing={2}>
                                                            <Grid item lg={6} md={12} sm={6} xs={12}>
                                                                <Box className='cm-form-col-title'>{t('ShippingInformation')}</Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('ShippingPolicy')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_oi_shipping_policy"
                                                                                value={formik.values.form_so_oi_shipping_policy}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('ExpectedDate')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_oi_expected_date"
                                                                                value={formik.values.form_so_oi_expected_date}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('CommitmentDate')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_oi_commitment_date"
                                                                                value={formik.values.form_so_oi_commitment_date}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('EffectiveDate')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_oi_effective_date"
                                                                                value={formik.values.form_so_oi_effective_date}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                                {/* <Box className='cm-form-col-title'>{t('Report')}</Box>
                               <Box className=''>
                                 <Box sx={{ width: "100%" }}>
                                   <FormControl sx={{ width: "100%" }}>
                                     <FormControlLabel
                                       control={
                                         <Checkbox
                                           name="form_so_oi_display_lines_without_quantity"
                                           checked={formik.values.form_so_oi_display_lines_without_quantity}
                                           onChange={formik.handleChange} disabled />}
                                       label={t('DisplaylineswithoutQuantity')} />
                                   </FormControl>
                                 </Box>
                               </Box> */}
                                                            </Grid>
                                                            <Grid item lg={6} md={12} sm={6} xs={12}>
                                                                <Box className='cm-form-col-title'>{t('SalesInformation')}</Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('SalesPerson')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_si_sale_person"
                                                                                value={formik.values.form_so_si_sale_person}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('SellerCompany')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_si_seller_company"
                                                                                value={formik.values.form_so_si_seller_company}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                                <Box className='form-mb-30'>
                                                                    <Box sx={{ width: "100%" }}>
                                                                        <div className='form-lable-name'>{t('CustomerReference')}</div>
                                                                        <FormControl sx={{ width: "100%" }}>
                                                                            <TextField
                                                                                name="form_so_si_customer_refrence"
                                                                                value={formik.values.form_so_si_customer_refrence}
                                                                                onChange={formik.handleChange}
                                                                                disabled={true}
                                                                            />
                                                                        </FormControl>
                                                                    </Box>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Box>
                                            </>
                                        )}
                                    </TabPanel>
                                </Box>
                            </Box>
                            <Box sx={{ marginTop: "40px" }}>
                                <Stack direction="row" spacing={2} alignItems="center" justifyContent={"start"} className="form-submit-cancel-btn-wrapper">
                                    {/* <Button variant="contained" endIcon={<CheckCircleIcon />}
                   className="cm-btn-style"
                   sx={{
                     color: colorConfigs.btnColor.hoverbgWhite,
                     background: colorConfigs.btnColor.bgColorGreen,
                     "&: hover": {
                       color: colorConfigs.btnColor.bgColorGreen,
                       background: colorConfigs.btnColor.hoverbgWhite,
                     }
                   }} type="submit">{t('saveChanges')}</Button>
                 <Button variant="contained" endIcon={<CancelIcon />}
                   className="cm-btn-style"
                   sx={{
                     color: colorConfigs.btnColor.hoverbgWhite,
                     background: colorConfigs.btnColor.bgColorRed,
                     "&: hover": {
                       color: colorConfigs.btnColor.bgColorRed,
                       background: colorConfigs.btnColor.hoverbgWhite,
                     }
                   }} onClick={() => setCustomTabs(0)}>{t('discard')}</Button> */}
                                </Stack>
                            </Box>
                        </form>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default SalesOrderEdit;