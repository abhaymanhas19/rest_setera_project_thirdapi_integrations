import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import DataTableComponent from '../../components/layout/DataTableComponet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setlicenceState, setonClouldlicenceState } from '../../redux/features/licenceStateSlice';
import { useTranslation } from 'react-i18next';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const LicencePage = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [customTabValue, setCustomTabValue] = useState(0);
    const AllLicence = useSelector((state: RootState) => state.licence.licenceState);
    const AllOnclouldLicence = useSelector((state: RootState) => state.licence.onclouldLicenceProduct);

    useEffect(() => {
        if (AllLicence.length === 0) {
            dispatch(setlicenceState(UserDataDT))
        }
        if (AllOnclouldLicence.length === 0) {
            dispatch(setonClouldlicenceState(OC_Lic_DataTableData));
        }
        // eslint-disable-next-line
    }, [AllLicence, AllOnclouldLicence]);
    const customTabHandleChange = (newValue: number) => {
        setCustomTabValue(newValue);
    }
    const UserDataRow = [
        {
            name: t('FullUsername'),
            cell: (row: any) => <Box className="cm-table-td">{row.full_username}</Box>,
        },
        {
            name: t('name'),
            cell: (row: any) => <Box className="cm-table-td">{row.name}</Box>,
        },
        {
            name: t('PrimaryNumber'),
            cell: (row: any) => <Box className="cm-table-td">{row.primary_number}</Box>,
        },
        {
            name: t('ActiveLicenses'),
            cell: (row: any) => <Box className="cm-table-td">{row.active_licenses}</Box>,
        },
        {
            name: t('State'),
            cell: (row: any) => <Box className="cm-table-td">{row.state}</Box>,
        },
    ];
    const UserDataDT = [
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Christian Bartone",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Cappa Michele",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Ceneda Loredana",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Palmisano llaria",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Christian Bartone",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Cappa Michele",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Christian Bartone",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Cappa Michele",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Ceneda Loredana",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Palmisano llaria",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Christian Bartone",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
        {
            full_username: "omicron.user.1@omicronconsulting.it",
            name: "Cappa Michele",
            primary_number: "+3321658920096",
            active_licenses: "License Bundle, Basic & Mobile & Softp...",
            state: "Linked",
        },
    ];
    const OC_Lic_DataTableRow = [
        {
            name: t('Product'),
            cell: (row: any) => <Box className="cm-table-td">{row.product}</Box>,
        },
        {
            name: t('UserLicenseType'),
            cell: (row: any) => <Box className="cm-table-td">{row.user_lic_type}</Box>,
        },
        {
            name: t('Available'),
            cell: (row: any) => <Box className="cm-table-td">{row.available}</Box>,
        },
        {
            name: t('InUse'),
            cell: (row: any) => <Box className="cm-table-td">{row.in_use}</Box>,
        },
        {
            name: t('Quota'),
            cell: (row: any) => <Box className="cm-table-td">{row.quota}</Box>,
        },
    ];
    const OC_Lic_DataTableData = [
        {
            product: "Licence ACD Attendant User",
            user_lic_type: "Basic License",
            available: "2",
            in_use: "0",
            quota: "2",
        },
        {
            product: "Licence Bundle, Basic & Mobile",
            user_lic_type: "Basic License",
            available: "3",
            in_use: "23",
            quota: "1",
        },
        {
            product: "Licence Bundle, Basic & Mobile & Softphone",
            user_lic_type: "Basic License",
            available: "1",
            in_use: "12",
            quota: "23",
        },
        {
            product: "Licence Bundle, Basic & Softphone",
            user_lic_type: "Basic License",
            available: "0",
            in_use: "0",
            quota: "25",
        },
    ];
    return (
        <div className='cm-user-tabs-wrapper'>
            <Box className='cm-subscription-detaile-wrapper' sx={{ marginBottom: "40px" }}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <Box className='cm-subcription-col-box'>
                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('Partner')}</Box>
                                <Box sx={{ width: "50%" }} className="cm-col-box-td text-blue">Omicron Consulting Srl</Box>
                            </Stack>
                            <Stack direction="row" spacing={3} className="col-box-inner-row">
                                <Box sx={{ width: "50%" }} className="cm-col-box-th">{t('Domain')}</Box>
                                <Box sx={{ width: "50%" }} className="cm-col-box-td">omicronconsulting.it</Box>
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box className='cm-global-tabs-wrapper'>
                <Box sx={{ paddingBottom: '15px', position: "relative" }}>
                    <Tabs value={customTabValue} aria-label="Custom-User-Tabs" sx={{ overflow: 'visible' }} className="cm-global-tabs-component">
                        <Stack direction="row" spacing={1} className="cm-global-tab-btn-wrapper">
                            <Button variant="outlined" {...a11yProps(0)} onClick={() => customTabHandleChange(0)} className={customTabValue === 0 ? "tab-active cm-global-tab-btn" : "cm-global-tab-btn"}>{t('sidebar_Users')}</Button>
                            <Button variant="outlined" {...a11yProps(1)} onClick={() => customTabHandleChange(1)} className={customTabValue === 1 ? "tab-active cm-global-tab-btn" : "cm-global-tab-btn"}>{t('OneCloudLicenseProducts')}</Button>
                        </Stack>
                    </Tabs>
                </Box>
                <Box className='cm-global-tabs-content'>
                    <TabPanel value={customTabValue} index={0}>
                        {customTabValue === 0 && (
                            <Box className='cm-global-tab-inner-content'>
                                <div className='cm-form-inner-fields cm-pagination-lic-user'>
                                    {
                                        AllLicence.length > 0 && (
                                            <DataTableComponent isWithBG={false} tRow={UserDataRow} tData={UserDataDT} className="cm-table-strip cm-licence-user-table" />
                                        )
                                    }
                                </div>
                            </Box>
                        )}
                    </TabPanel>
                    <TabPanel value={customTabValue} index={1}>
                        {customTabValue === 1 && (
                            <Box className='cm-global-tab-inner-content'>
                                <div className='cm-form-inner-fields cm-pagination-lic-user'>
                                    {
                                        AllOnclouldLicence.length > 0 && (
                                            <DataTableComponent isWithBG={false} tRow={OC_Lic_DataTableRow} tData={OC_Lic_DataTableData} className="cm-table-strip cm-licence-onclould-table" />
                                        )
                                    }
                                </div>
                            </Box>
                        )}
                    </TabPanel>
                </Box>
            </Box>
        </div>
    )
}

export default LicencePage;