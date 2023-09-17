import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Stack from '@mui/material/Stack';
import colorConfigs from '../../../configs/colorConfigs';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import DataTableComponent from '../../../components/layout/DataTableComponet';
import { setSingleSubscriptionState, setSubscriptionState } from '../../../redux/features/subscriptionStateSlice';
import { useTranslation } from 'react-i18next';
import { TextField, useForkRef } from '@mui/material';
import { useFormik } from 'formik';
import PaginationTableData from '../../../components/layout/PaginationTableData';
import reportWebVitals from '../../../reportWebVitals';
import { useParams } from 'react-router-dom';
import AxiosMain from '../../../components/layout/AxiosMain';
import { RootState } from '../../../redux/store';
import LoaderScreen from '../../../components/layout/LoaderScreen';
import { setAppNextRoute, setAppcurrentPageForm } from '../../../redux/features/appStateSlice';
import Swal from 'sweetalert2';

type Props = {};

const SubscriptionEdit = (props: any) => {
  const param = useParams();
  const { id } = param;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [subscritionData, setSubscritionData] = useState<any>({});
  const isCurrenFormEidt = useSelector((state: RootState) => state.appState.appCurrentPageForm);
  const isNextRoute = useSelector((state: RootState) => state.appState.appNextRoute);
  const isPervRoute = useSelector((state: RootState) => state.appState.appPrevRoute);
  const [subscriptionLineProduct, setSubscriptionLineProduct] = useState([]);
  const [subscriptionProductTotal, setSubscriptionProductTotal] = useState(0);
  const checkUser = useSelector((state: RootState) => state.authState.authState);
  const AllSingleSubscription = useSelector((state: any) => state.subscription.singlesubscriptionState);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${checkUser.access}`,
    },
  }
  const subscriptionEditForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      customer_inovoice: "",
      customer_enduser: "Puzzel Oy",
      delivery_address: "Puzzel Oy",
      pricelist: "Colt porting price, International Oy (EUR)",
      reference: "SUBFI0011",
      source_document: "Puzzel Oy",
      start_date: "01 June, 2018",
      subscription_template: "Monthly",
      aggregate_invoice_group: "Monthly",
      sale_person: "Marko Lahnala",
      sale_team: "Communications",
      company: "Setera Communications Oy",
      date_next_inovoice: "01 Jan, 2023",
      to_renew: false,
      conntract_period: "36"
    },
    onSubmit: (values) => {
      console.log("Values", values);
    }
  })
  const getSingleSubscription = (id: any) => {
    AxiosMain.get(`/accounting/subscription/${id}`, config).then((res) => {
      if (res.status === 200) {
        setSubscritionData(res.data[0]);
      }
    }).catch((e) => {
      console.log("error", e);
      setIsLoading(false);
    })
  }
  const formSwalTranslation = {
    formSwalTitle: t('AreYouWanttoSave'),
    formSwalText: t('Youwontbeabletorevertthis'),
    fomrSwalCancel: t('Cancel'),
    formSwalSaved: t('YesSavedit'),
    formSwalDataSaved: t('YourDatahasbeensaved'),
    formSwalSubmited: t('Submited'),
    formdontSaveChanges: t('Areyousureyoudontwanttosavethechanges?')
  }
  const subscriptionPage = () => {
    dispatch(setAppNextRoute("/accounting/subscription"));
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
        // navigate("/accounting/subscription");
      }
    })
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
    }).then((result: any) => {
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
  useEffect(() => {
    console.log(id);
    if (id !== '' && Object.keys(subscritionData).length === 0) {
      getSingleSubscription(id);
    }
    if (Object.keys(subscritionData).length > 0) {
      console.log("Data ", subscritionData);
      const {
        partner_id,
        partner_end_customer_id,
        partner_shipping_id,
        pricelist_id, code,
        origin,
        date_start,
        template_id,
        aggregate_invoice_group_id,
        user_id,
        team_id,
        company_id,
        recurring_next_date,
        original_contract_duration,
        to_renew,
        subLines,
        recurring_total
      } = subscritionData;
      if (partner_id.length > 0) {
        subscriptionEditForm.setFieldValue("customer_inovoice", partner_id[1]);
      }
      if (partner_end_customer_id.length > 0) {
        subscriptionEditForm.setFieldValue("customer_enduser", partner_end_customer_id[1]);
      }
      if (partner_shipping_id.length > 0) {
        subscriptionEditForm.setFieldValue("delivery_address", partner_shipping_id[1]);
      }
      if (pricelist_id.length > 0) {
        subscriptionEditForm.setFieldValue("pricelist", pricelist_id[1]);
      }
      if (code !== '') {
        subscriptionEditForm.setFieldValue("reference", code);
      }
      if (origin !== '' && origin !== false) {
        subscriptionEditForm.setFieldValue("source_document", origin);
      }
      if (date_start !== '') {
        subscriptionEditForm.setFieldValue("start_date", date_start);
      }
      if (template_id.length > 0) {
        subscriptionEditForm.setFieldValue("subscription_template", template_id[1]);
      }
      if (aggregate_invoice_group_id.length > 0) {
        subscriptionEditForm.setFieldValue("aggregate_invoice_group", aggregate_invoice_group_id[1]);
      }
      if (user_id.length > 0) {
        subscriptionEditForm.setFieldValue("sale_person", user_id[1]);
      }
      if (company_id.length > 0) {
        subscriptionEditForm.setFieldValue("sale_team", company_id[1]);
      }
      if (team_id.length > 0) {
        subscriptionEditForm.setFieldValue("company", team_id[1]);
      }
      if (recurring_next_date !== '' && recurring_next_date !== false) {
        subscriptionEditForm.setFieldValue("date_next_inovoice", recurring_next_date);
      }
      if (original_contract_duration !== '' && original_contract_duration !== false) {
        subscriptionEditForm.setFieldValue("conntract_period", original_contract_duration);
      }
      subscriptionEditForm.setFieldValue("to_renew", to_renew);
      if (subLines.length > 0) {
        setSubscriptionLineProduct(subLines);
      }
      setSubscriptionProductTotal(recurring_total);
      setIsLoading(false);
    }
  }, [id, subscritionData]);
  const SubscriptionRow = [
    {
      name: t('Product'),
      cell: (row: any) => row.product_id[1]
    },
    {
      name: t('Description'),
      cell: (row: any) => row.name
    },
    {
      name: t('Quantity'),
      cell: (row: any) => row.quantity
    },
    {
      name: t('UnitPrice'),
      cell: (row: any) => row.price_unit
    },
    {
      name: t('Subtotal'),
      cell: (row: any) => row.price_subtotal
    }
  ];

  return (
    <>
      {isLoading ? <LoaderScreen /> : (
        <>
          <Box sx={{ marginBottom: "20px" }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent={"start"}>
              <Button variant="contained" startIcon={<ArrowBackIosIcon />}
                className="cm-btn-style"
                sx={{
                  color: colorConfigs.btnColor.hoverbgWhite,
                  background: colorConfigs.btnColor.bgColorRed,
                  "&: hover": {
                    color: colorConfigs.btnColor.bgColorRed,
                    background: colorConfigs.btnColor.hoverbgWhite,
                  }
                }} onClick={() => subscriptionPage()}>{t('Back')}</Button>
            </Stack>
          </Box>
          <div className='cm-subcription-col-box' style={{ display: 'none' }}>
            <div className='cm-user-form-wrap'>
              <form onSubmit={subscriptionEditForm.handleSubmit}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('CustomerInvoicingAddress')} sddas</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="customer_inovoice"
                            value={subscriptionEditForm.values.customer_inovoice}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('CustomerEndUser')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="customer_enduser"
                            value={subscriptionEditForm.values.customer_enduser}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('DeliveryAddress')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="delivery_address"
                            value={subscriptionEditForm.values.delivery_address}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('Pricelist')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="pricelist"
                            value={subscriptionEditForm.values.pricelist}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('Reference')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="reference"
                            value={subscriptionEditForm.values.reference}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('SourceDocument')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="source_document"
                            value={subscriptionEditForm.values.source_document}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('StartDate')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="start_date"
                            value={subscriptionEditForm.values.start_date}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('SubscriptionTemplate')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="subscription_template"
                            value={subscriptionEditForm.values.subscription_template}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('AggregateInvoiceGroup')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="aggregate_invoice_group"
                            value={subscriptionEditForm.values.aggregate_invoice_group}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('SalesPerson')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="sale_person"
                            value={subscriptionEditForm.values.sale_person}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('SalesTeam')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="sale_team"
                            value={subscriptionEditForm.values.sale_team}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('Company')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="company"
                            value={subscriptionEditForm.values.company}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('DateofNextInvoice')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="date_next_inovoice"
                            value={subscriptionEditForm.values.date_next_inovoice}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('ContractPeriodMonths')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="conntract_period"
                            value={subscriptionEditForm.values.conntract_period}
                            onChange={subscriptionEditForm.handleChange}
                            disabled={true}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'></div>
                        <FormControl sx={{ width: "100%" }}>
                          <FormControlLabel
                            className="form-checkbox-text"
                            control={
                              <Checkbox
                                name="to_renew"
                                checked={subscriptionEditForm.values.to_renew}
                                onChange={subscriptionEditForm.handleChange}
                              />
                            }
                            label={t("Torenew")}
                          />
                        </FormControl>
                      </Box>
                    </Grid>

                  </Grid>
                </Box>
              </form>
            </div>
          </div>
          <div className='cm-subscription-detaile-wrapper'>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={12} xs={12}>
                  <Box className='cm-subcription-col-box'>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('CustomerInvoicingAddress')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.customer_inovoice}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('CustomerEndUser')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.customer_enduser}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('DeliveryAddress')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.delivery_address}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('Pricelist')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.pricelist}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('Reference')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.reference}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('SourceDocument')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.source_document}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('StartDate')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.start_date}</Box>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <Box className='cm-subcription-col-box'>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('SubscriptionTemplate')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.subscription_template}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('AggregateInvoiceGroup')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.aggregate_invoice_group}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('SalesPerson')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.sale_person}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('SalesTeam')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.sale_team}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('Company')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.company}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('DateofNextInvoice')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.date_next_inovoice}</Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('Torenew')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">
                        <FormControl sx={{ width: "100%" }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="to_renew"
                                checked={subscriptionEditForm.values.to_renew}
                                onChange={subscriptionEditForm.handleChange}
                              />}
                            label="" />
                        </FormControl>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={3} className="col-box-inner-row">
                      <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('ContractPeriodMonths')}</Box>
                      <Box sx={{ width: "50%" }} className="cm-col-box-td">{subscriptionEditForm.values.conntract_period}</Box>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ width: "100%" }} className="subs-line-title">{t('SubscriptionLines')}</Box>
            <Box sx={{ width: "100%" }} className="sub-line-wrapper">
              <Box className='cm-single-sub-line-Data-table'>
                {AllSingleSubscription.length > 0 && (
                  <DataTableComponent isWithBG={false} tRow={SubscriptionRow} tData={subscriptionLineProduct} />
                )}
              </Box>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent={"end"} className="sub-table-price">
                <Box sx={{ marginTop: '15px' }}>
                  <Box className='cm-order-sale-total-tbl' sx={{ borderTop: 'none' }}>
                    <Box className='order-sale-table-data tfoot'>
                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                        <Box className='order-sl-th'>{t('RecurringPrice')}:</Box>
                        <Box className='order-sl-td'>{subscriptionProductTotal}</Box>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              </Stack>
              <Box sx={{ marginTop: '30px' }} className="order-sale-term-txt">
                {t('RelatedtrafficreportsinvoicesendwithseparatemessagetoVidarThorsen')}
              </Box>
            </Box>
          </div>
        </>
      )}
    </>
  )
}

export default SubscriptionEdit;