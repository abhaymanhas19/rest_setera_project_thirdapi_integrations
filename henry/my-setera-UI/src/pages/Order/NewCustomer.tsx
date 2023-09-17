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
import colorConfigs from '../../configs/colorConfigs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TagsInput from '../../components/layout/TagsInput';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';

type Props = {};

const NewCustomer = (props: Props) => {
  const [customTags, setCustomTags] = useState([]);
  const { t } = useTranslation();
  //const navigate = useNavigate();
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
      form_order_nc_name: "",
      form_order_nc_email: "",
      form_order_nc_street: "",
      form_order_nc_pincode: "",
      form_order_nc_city: 10,
      form_order_nc_country: 10,
      form_order_nc_vat_id: "",
      form_order_nc_fascal_code: "",
      form_order_nc_language: 10,
      form_order_nc_website: "",
      form_order_nc_tags: [],
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

  const handleSelecetedTags = (items: any) => {

    if (items.length > 0) {
      //console.log(items);
      setCustomTags(items);
      // formik.setFieldValue('form_order_nc_tags',items);
    }
  }
  useEffect(() => {
    if (customTags.length > 0) {
      //console.log(customTags);
      formik.setFieldValue('form_order_nc_tags', customTags);
    }
    // eslint-disable-next-line
  }, [customTags])
  const onKeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }
  return (
    <>
      <div className='cm-single-data-conn-wrapper'>
        <div className=' cm-user-creation-form-wrap'>
          <form onSubmit={formik.handleSubmit} onKeyDown={onKeyDown}>
            <Box className='cm-form-inner-fields'>
              <Box sx={{ flexGrow: 1 }} className='form-mb-30'>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('name')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_name'
                          value={formik.values.form_order_nc_name}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('email')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_email'
                          type="email"
                          value={formik.values.form_order_nc_email}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Street')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_street'
                          value={formik.values.form_order_nc_street}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('PostalCode')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_pincode'
                          value={formik.values.form_order_nc_pincode}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box className='' sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('City')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_order_nc_city"
                          label=""
                          value={formik.values.form_order_nc_city}
                          onChange={formik.handleChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box className='' sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Country')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_order_nc_country"
                          label=""
                          value={formik.values.form_order_nc_country}
                          onChange={formik.handleChange}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('VATorBusinessID')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_vat_id'
                          value={formik.values.form_order_nc_vat_id}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('FiscalCode')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_fascal_code'
                          value={formik.values.form_order_nc_fascal_code}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Website')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_order_nc_website'
                          value={formik.values.form_order_nc_website}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box className='' sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Language')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_order_nc_language"
                          label=""
                          value={formik.values.form_order_nc_language}
                          onChange={formik.handleChange}>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Stack direction="row" spacing={3}>
                  <Box className='' sx={{ width: "100%" }}>
                    <div className='form-lable-name'>{t('Tags')}</div>
                    <TagsInput
                      selectedTags={handleSelecetedTags}
                      variant="outlined"
                      id="form_order_nc_tags"
                      name="form_order_nc_tags"
                    />
                  </Box>
                </Stack>
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
                  }} type="submit">{t('AddCustomer')}</Button>
                <Button variant="contained" endIcon={<CancelIcon />}
                  className="cm-btn-style"
                  sx={{
                    color: colorConfigs.btnColor.hoverbgWhite,
                    background: colorConfigs.btnColor.bgColorRed,
                    "&: hover": {
                      color: colorConfigs.btnColor.bgColorRed,
                      background: colorConfigs.btnColor.hoverbgWhite,
                    }
                  }}>{t('discard')}</Button>
              </Stack>
            </Box>
          </form>
        </div>
      </div>
    </>
  )
};

export default NewCustomer;