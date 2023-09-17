import React, { useState, useEffect } from 'react';
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
import { setorderSaleState } from '../../../redux/features/orderSaleStateSlice';
import DataTableComponent from '../../../components/layout/DataTableComponet';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AxiosMain from '../../../components/layout/AxiosMain';
import { RootState } from '../../../redux/store';
import PaginationTableData from '../../../components/layout/PaginationTableData';

type Props = {};
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
const CustomSaleOrderTabsComponent = (props: any) => {
  const { setCustomTabs } = props;
  const [customTabValue, setCustomTabValue] = useState(0);
  const { t } = useTranslation();
  const SingleSaleOrderTableRow = [
    {
      name: t('Product'),
      cell: (row: any) => row.product_name,
    },
    {
      name: t('ProductFamily'),
      cell: (row: any) => row.product_family,
    },
    {
      name: t('Description'),
      cell: (row: any) => row.product_desc
    },
    {
      name: t('OrderedQty'),
      cell: (row: any) => row.order_qty
    },
    // {
    //   name: t('AnalyticTags'),
    //   cell: (row: any) => row.analytic_tags
    // },
    {
      name: t('UnitPrice'),
      cell: (row: any) => row.unit_price
    },
    // {
    //   name: t('Taxes'),
    //   cell: (row: any) => row.taxes
    // },
    // {
    //   name: `${t('Discount')} (%)`,
    //   cell: (row: any) => row.discount
    // },
    // {
    //   name: t('PriceBundleDetails'),
    //   cell: (row: any) => row.price_bundle_deatils
    // },
    {
      name: t('Subtotal'),
      cell: (row: any) => row.subtotal
    },
  ];
  const SingleSaleOrderTableData = [
    {
      product_name: "Product Name Here",
      product_family: "Lorem Ipsum",
      product_desc: "Sed ut perspiciatis unde omnis iste natus quasi architecto beatae vitae dicta sunt explicabo..",
      order_qty: 2,
      analytic_tags: "Mobile",
      route: "Route Name Here",
      unit_price: "$123.33",
      taxes: "$10.00",
      discount: "10%",
      subtotal: "$120.99",
      price_bundle_deatils: "$123.99 + $10"
    },
  ];
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
      name: "Test Name",
      form_so_invoice_address: 10,
      form_so_delivery_address: 10,
      form_so_customer_end_user: 10,
      form_so_validity: 10,
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
  return (
    <>
      <div className='cm-global-tabs-wrapper cm-sale-order-wrapper'>
        <Box sx={{ my: "10px" }}>
          <Button variant="contained"
            className="cm-btn-style"
            sx={{
              color: colorConfigs.btnColor.hoverbgWhite,
              background: colorConfigs.btnColor.bgColorGreen,
              "&: hover": {
                color: colorConfigs.btnColor.bgColorGreen,
                background: colorConfigs.btnColor.hoverbgWhite,
              }
            }} onClick={() => setCustomTabs(0)}><ArrowBackIcon /></Button>
        </Box>
        <div className='cm-user-form-wrap'>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ width: "100%" }} className="cm-form-before-tabs">
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
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_invoice_address"
                            label=""
                            value={formik.values.form_so_invoice_address}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
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
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_delivery_address"
                            label=""
                            value={formik.values.form_so_delivery_address}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
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
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_customer_end_user"
                            value={formik.values.form_so_customer_end_user}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('ConfirmationDate')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="form_so_validity"
                            value={formik.values.form_so_validity}
                            onChange={formik.handleChange}
                            disabled={true}
                          />
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_validity"
                            value={formik.values.form_so_validity}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
                        </FormControl>
                      </Box>
                    </Grid>
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
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_payment_term"
                            value={formik.values.form_so_payment_term}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
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
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_contact_duration"
                            value={formik.values.form_so_contact_duration}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
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
                          {/* <Select
                            className='form-select-pad'
                            name="form_so_delivery_address_2"
                            value={formik.values.form_so_delivery_address_2}
                            onChange={formik.handleChange}
                            readOnly>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select> */}
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box>
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
                                    <Box className='order-sale-table-data'>
                                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                        <Box className='order-sl-th' sx={{ width: "80%" }}>Lorem Ipsum:</Box>
                                        <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
                                      </Stack>
                                    </Box>
                                    <Box className='order-sale-table-data tfoot'>
                                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                        <Box className='order-sl-th' sx={{ width: "80%" }}>{t('SubtotalProductFamilies')}:</Box>
                                        <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
                                      </Stack>
                                    </Box>
                                  </Box>
                                </Box>
                              </Grid>
                              <Grid item lg={4} md={6} sm={6} xs={12}>
                                <Box sx={{ marginTop: '15px' }}>
                                  <Box className='cm-order-sale-total-tbl'>
                                    <Box className='order-sale-table-data'>
                                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                        <Box className='order-sl-th' sx={{ width: "80%" }}>{t('UntaxedAmount')}:</Box>
                                        <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
                                      </Stack>
                                    </Box>
                                    <Box className='order-sale-table-data'>
                                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                        <Box className='order-sl-th' sx={{ width: "80%" }}>{t('Taxes')}:</Box>
                                        <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
                                      </Stack>
                                    </Box>
                                    <Box className='order-sale-table-data tfoot'>
                                      <Stack direction="row" spacing={2} alignItems="center" justifyContent={"between"}>
                                        <Box className='order-sl-th' sx={{ width: "80%" }}>{t('Total')}:</Box>
                                        <Box className='order-sl-td' sx={{ width: "20%" }}>$0.00</Box>
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
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_oi_shipping_policy"
                                      label=""
                                      value={formik.values.form_so_oi_shipping_policy}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                              <Box className='form-mb-30'>
                                <Box sx={{ width: "100%" }}>
                                  <div className='form-lable-name'>{t('ExpectedDate')}</div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_oi_expected_date"
                                      value={formik.values.form_so_oi_expected_date}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                              <Box className='form-mb-30'>
                                <Box sx={{ width: "100%" }}>
                                  <div className='form-lable-name'>{t('CommitmentDate')}</div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_oi_commitment_date"
                                      value={formik.values.form_so_oi_commitment_date}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                              <Box className='form-mb-30'>
                                <Box sx={{ width: "100%" }}>
                                  <div className='form-lable-name'>{t('EffectiveDate')}</div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_oi_effective_date"
                                      value={formik.values.form_so_oi_effective_date}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
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
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_si_sale_person"
                                      label=""
                                      value={formik.values.form_so_si_sale_person}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                              <Box className='form-mb-30'>
                                <Box sx={{ width: "100%" }}>
                                  <div className='form-lable-name'>{t('SellerCompany')}</div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_si_seller_company"
                                      label=""
                                      value={formik.values.form_so_si_seller_company}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </Box>
                              <Box className='form-mb-30'>
                                <Box sx={{ width: "100%" }}>
                                  <div className='form-lable-name'>{t('CustomerReference')}</div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Select
                                      className='form-select-pad'
                                      name="form_so_si_customer_refrence"
                                      label=""
                                      value={formik.values.form_so_si_customer_refrence}
                                      onChange={formik.handleChange}
                                      readOnly>
                                      <MenuItem value={10}>Ten</MenuItem>
                                      <MenuItem value={20}>Twenty</MenuItem>
                                      <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
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
        </div>
      </div>
    </>
  )
}
const SalesOrderList = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  //const dispatch = useDispatch();
  //const checkUser = useSelector((state: RootState) => state.authState.authState);
  //const [saleOrderData, setSaleOrderData] = useState<any>([]);
  //const getAllOrderSale = useSelector((state: any) => state.orderSale.orderSaleState);
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${checkUser.access}`,
  //   },
  // }
  // const getDummySaleOrder = () => {
  //   AxiosMain.get("/accounting/sales-order/", config).then((res) => {

  //     if (res.status === 200) {

  //       let output = [res.data.dummy_data];
  //       console.log("res", res.data.dummy_data.currency_id);
  //       setSaleOrderData(output);
  //     }
  //   }).catch((e) => {
  //     console.log("While getting Sale Order Data");
  //   })
  // }
  // Settings Order Sale Data
  // useEffect(() => {
  //   if (saleOrderData.length === 0) {
  //     getDummySaleOrder();
  //   }
  //   // eslint-disable-next-line
  // }, []);


  const OrderRow = [
    {
      name: t('SalesOrderID'),
      cell: (row: any) => <Box sx={{ cursor: "pointer" }} className="cm-table-td" onClick={() => navigate(`/accounting/sales-order/edit/${row.id}`)}>{row.id}</Box>,

    },
    {
      name: t('ContractDuration'),
      cell: (row: any) => row.original_contract_duration,
    },
    {
      name: t('OrderLinesCount'),
      cell: (row: any) => row.order_line.length
    },
    {
      name: t('OrderDate'),
      cell: (row: any) => row.create_date
    },
    {
      name: t('Total'),
      cell: (row: any) => `${row.currency_id[1]}-${row.amount_total}`
    },
  ];

  const OrderData = [
    {
      order_id: "SO847396",
      contract_duration: "22 Nov, 2022",
      order_line_count: 20,
      order_date: "22 Nov, 2022",
      total: "1000$"
    },
    {
      order_id: "SO847396",
      contract_duration: "22 Nov, 2022",
      order_line_count: 20,
      order_date: "22 Nov, 2022",
      total: "600$"
    },
    {
      order_id: "SO847396",
      contract_duration: "22 Nov, 2022",
      order_line_count: 20,
      order_date: "22 Nov, 2022",
      total: "60$"
    },
    {
      order_id: "SO847396",
      contract_duration: "22 Nov, 2022",
      order_line_count: 20,
      order_date: "22 Nov, 2022",
      total: "200$"
    },
    {
      order_id: "SO847396",
      contract_duration: "22 Nov, 2022",
      order_line_count: 20,
      order_date: "22 Nov, 2022",
      total: "120$"
    },
    {
      order_id: "SO847396",
      contract_duration: "22 Nov, 2022",
      order_line_count: 20,
      order_date: "22 Nov, 2022",
      total: "100$"
    },

  ];

  return (
    <div className='cm-sale-order-main ' style={{
      marginTop: "20px",
      marginBottom: "20px"
    }}>
      <div className='cm-mobile-user-Data-table'>
        {/* {saleOrderData.length > 0 && (
          <DataTableComponent isRounded={false} isWithBG={false} tRow={OrderRow} tData={saleOrderData} />
        )} */}

        <PaginationTableData
          apiLink="/accounting/sales-order/"
          tRow={OrderRow}
          searchfield={false}
          btnComponent={{
            isBtnShow: false,
          }}
        />
      </div>
    </div>
  );
};

export default SalesOrderList;