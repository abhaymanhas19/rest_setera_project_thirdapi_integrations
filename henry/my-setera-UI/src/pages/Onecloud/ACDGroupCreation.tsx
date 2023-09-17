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
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';


type Props = {};

const ACDGroupCreation = (props: Props) => {
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
      form_acd_gp_number: "",
      form_acd_gp_name: "",
      form_acd_gp_aci_agent_member: "",
      form_acd_gp_is_number_outgoing: "yes",
      form_acd_gp_member_ring_same_time: 10,
      form_acd_gp_call_long_for_member_move_next_member: 10,
      form_acd_gp_longest_waiting_no_logged_in: 10,
      form_acd_gp_call_receive_which_device: 10,
      form_acd_gp_number_see_as_caller: 10,
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
      <div className='cm-acd-group-creation-wrapper'>
        <div className='cm-acd-group-creation-form-wrap'>
          <form onSubmit={formik.handleSubmit}>
            <Box className='cm-form-inner-fields'>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('Number')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          name='form_acd_gp_number'
                          variant="outlined"
                          type="number"
                          value={formik.values.form_acd_gp_number}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('name')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_acd_gp_name'
                          value={formik.values.form_acd_gp_name}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Box sx={{ width: "100%" }}>
                      <div className='form-lable-name'>{t('AdditionalCallInformationAgentMember')}</div>
                      <FormControl sx={{ width: "100%" }}>
                        <TextField
                          variant="outlined"
                          name='form_acd_gp_aci_agent_member'
                          value={formik.values.form_acd_gp_aci_agent_member}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ margin: "24px 0 24px" }}>
                <div className='form-lable-name'>{t('Canthisnumberbeusedforoutgoingcalls')}</div>
              </Box>
              <Box className='form-mb-30'>
                <FormControl sx={{ width: "100%" }}>
                  <RadioGroup
                    row
                    aria-labelledby="form_acd_gp_is_number_outgoing"
                    name="form_acd_gp_is_number_outgoing"
                  >
                    <Grid container spacing={2}>
                      <Grid item sm={2} xs={4}>
                        <FormControlLabel value="yes" control={<Radio checked={formik.values.form_acd_gp_is_number_outgoing === 'yes'} onChange={formik.handleChange} />} label={t('Yes')} />
                      </Grid>
                      <Grid item sm={2} xs={4}>
                        <FormControlLabel value="no" control={<Radio checked={formik.values.form_acd_gp_is_number_outgoing === 'no'} onChange={formik.handleChange} />} label={t('No')} />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box className=''>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Box className='' sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('Howmanymembersshouldberingingatthesametime')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            className='form-select-pad'
                            name="form_acd_gp_member_ring_same_time"
                            label=""
                            value={formik.values.form_acd_gp_member_ring_same_time}
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
                        <div className='form-lable-name'>{t('Howlongcallshouldringforamemberbeforeitmovesontothenextmember')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            className='form-select-pad'
                            name="form_acd_gp_call_long_for_member_move_next_member"
                            label=""
                            value={formik.values.form_acd_gp_call_long_for_member_move_next_member}
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
                        <div className='form-lable-name'>{t('Whichdevicescanmemberusetoreceivecalls')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            className='form-select-pad'
                            name="form_acd_gp_call_receive_which_device"
                            label=""
                            value={formik.values.form_acd_gp_call_receive_which_device}
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
                        <div className='form-lable-name'>{t('Overflowwhenlongestwaitingtimeexceedsorifnomembersareloggedin')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            className='form-select-pad'
                            name="form_acd_gp_longest_waiting_no_logged_in"
                            label=""
                            value={formik.values.form_acd_gp_longest_waiting_no_logged_in}
                            onChange={formik.handleChange}
                          >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box className='' sx={{ width: "100%" }}>
                        <div className='form-lable-name'>{t('Whatnumbermembersshouldseeascallerwhentheyreceiveacall')}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <Select
                            className='form-select-pad'
                            name="form_acd_gp_number_see_as_caller"
                            label=""
                            value={formik.values.form_acd_gp_number_see_as_caller}
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

export default ACDGroupCreation;