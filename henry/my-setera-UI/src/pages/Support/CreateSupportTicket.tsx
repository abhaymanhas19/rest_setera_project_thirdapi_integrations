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
import { useNavigate } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
type Props = {};

const CreateSupportTicket = (props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      form_cs_phone: "",
      form_cs_subject: "",
      form_cs_type: 10,
      form_cs_product: 10
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
        <div className='cm-data-conn-form-wrap'>
          <form onSubmit={formik.handleSubmit}>
            <Box className='cm-form-inner-fields'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('YourPhoneNumber')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          name='form_cs_phone'
                          variant="outlined"
                          value={formik.values.form_cs_phone}
                          onChange={formik.handleChange}
                          type="number"
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Subject')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_cs_subject'
                          value={formik.values.form_cs_subject}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box className='' sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Type')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_cs_type"
                          label=""
                          value={formik.values.form_cs_type}
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
                      <div className='form-lable-name'>{t('Product')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <Select
                          className='form-select-pad'
                          name="form_cs_product"
                          label=""
                          value={formik.values.form_cs_product}
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
                  }} onClick={() => navigate('/support/all-tickets')}>{t('discard')}</Button>
              </Stack>
            </Box>
          </form>
        </div>
      </div>
    </>
  )
};

export default CreateSupportTicket;