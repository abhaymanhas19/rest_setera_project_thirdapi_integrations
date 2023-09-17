import React from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
type Props = {};

const UserCreation = (props: Props) => {
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
      form_uc_first_name: "",
      form_uc_last_name: "",
      form_uc_username: "",
      form_uc_email: "",
      form_uc_language: 10,
      form_uc_timezone: 10,
      form_uc_primary_number: "",
      form_uc_secondary_number: "",
      form_uc_product_package: 10,
      form_uc_is_admin: false,
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
  return (
    <>
      <div className='cm-single-data-conn-wrapper'>
        <div className=' cm-user-creation-form-wrap'>
          <form onSubmit={formik.handleSubmit}>
            <Box className='cm-form-inner-fields'>
              <Box sx={{ flexGrow: 1 }} className='form-mb-30'>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('FirstName')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          name='form_uc_first_name'
                          variant="outlined"
                          value={formik.values.form_uc_first_name}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('LastName')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_uc_last_name'
                          value={formik.values.form_uc_last_name}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Username')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_uc_username'
                          value={formik.values.form_uc_username}
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
                          name='form_uc_email'
                          type="email"
                          value={formik.values.form_uc_email}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Language')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_uc_language"
                          label=""
                          value={formik.values.form_uc_language}
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
                      <div className='form-lable-name'>{t('Timezone')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_uc_timezone"
                          label=""
                          value={formik.values.form_uc_timezone}
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
                      <div className='form-lable-name'>{t('PrimaryNumber')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_uc_primary_number'
                          type="number"
                          value={formik.values.form_uc_primary_number}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('SecondaryNumber')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_uc_secondary_number'
                          type="number"
                          value={formik.values.form_uc_secondary_number}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box className='' sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Product package')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_uc_product_package"
                          label=""
                          value={formik.values.form_uc_product_package}
                          onChange={formik.handleChange}
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
              <Box className=''>
                <Stack direction="row" spacing={3}>
                  <Box sx={{ width: "100%" }}>
                    <FormControl sx={{ width: "100%" }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="form_uc_is_admin"
                            checked={formik.values.form_uc_is_admin}
                            onChange={formik.handleChange} />}
                        label={t('Admin')} />
                    </FormControl>
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

export default UserCreation;