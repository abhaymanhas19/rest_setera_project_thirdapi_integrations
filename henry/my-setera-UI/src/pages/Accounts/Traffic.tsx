import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import DataTableComponent from '../../components/layout/DataTableComponet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTrafficCDRs, setTrafficSumDetailSubscrription, setTrafficSumService, setTrafficSumSubscription } from '../../redux/features/trafficStateSlice';
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

const TrafficPage = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { trafficSumService, trafficSumSubscription, trafficSumDetailSubscrription, trafficCDRs
    } = useSelector((state: RootState) => state.traffic);
    const [customTabValue, setCustomTabValue] = useState(0);
    const customTabHandleChange = (newValue: number) => {
        setCustomTabValue(newValue);
    }
    useEffect(() => {
        if (trafficSumService.length === 0) {
            dispatch(setTrafficSumService(SS_DataTableData));
        }
        if (trafficSumSubscription.length === 0) {
            dispatch(setTrafficSumSubscription(SSub_DataTableData))
        }
        if (trafficSumDetailSubscrription.length === 0) {
            dispatch(setTrafficSumDetailSubscrription(Details_SSub_DataTableData));
        }
        if (trafficCDRs.length === 0) {
            dispatch(setTrafficCDRs(CDRs_DataTableData));
        }
        // eslint-disable-next-line
    }, [trafficSumService, trafficSumSubscription, trafficSumDetailSubscrription, trafficCDRs]);
    const SS_DataTableRow = [
        {
            name: t('ProductType'),
            cell: (row: any) => <Box className="cm-table-td">{row.product_type}</Box>,
        },
        {
            name: t('TypeOfPayment'),
            cell: (row: any) => <Box className="cm-table-td">{row.paymnet_type}</Box>,
        },
        {
            name: t('ProductDescription'),
            cell: (row: any) => <Box className="cm-table-td">{row.product_description}</Box>,
        },
        {
            name: t('Pcs'),
            cell: (row: any) => <Box className="cm-table-td">{row.pcs}</Box>,
        },
        {
            name: t('Duration'),
            cell: (row: any) => <Box className="cm-table-td">{row.duration}</Box>,
        },
        {
            name: t('Total'),
            cell: (row: any) => <Box className="cm-table-td">{row.total}</Box>,
        },

    ];
    const SS_DataTableData = [
        {
            product_type: "Mobile Services",
            paymnet_type: "Usage Fees",
            product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            pcs: "10706",
            duration: "27045374",
            total: "0.0",
        },
        {
            product_type: "Mobile Services",
            paymnet_type: "Usage Fees",
            product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            pcs: "10706",
            duration: "27045374",
            total: "0.0",
        },
        {
            product_type: "Mobile Services",
            paymnet_type: "Usage Fees",
            product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            pcs: "10706",
            duration: "27045374",
            total: "0.0",
        },
        {
            product_type: "Mobile Services",
            paymnet_type: "Usage Fees",
            product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            pcs: "10706",
            duration: "27045374",
            total: "0.0",
        },
        {
            product_type: "Mobile Services",
            paymnet_type: "Usage Fees",
            product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
            pcs: "10706",
            duration: "27045374",
            total: "0.0",
        },
    ];
    const SSub_DataTableRow = [
        {
            name: t('ProductType'),
            cell: (row: any) => <Box className="cm-table-td">{row.product_type}</Box>,
        },
        {
            name: t('TypeOfPayment'),
            cell: (row: any) => <Box className="cm-table-td">{row.phone}</Box>,
        },
        {
            name: t('ProductDescription'),
            cell: (row: any) => <Box className="cm-table-td">{row.username}</Box>,
        },
        {
            name: t('Pcs'),
            cell: (row: any) => <Box className="cm-table-td">{row.monthly}</Box>,
        },
        {
            name: t('Duration'),
            cell: (row: any) => <Box className="cm-table-td">{row.usage}</Box>,
        },
        {
            name: t('Total'),
            cell: (row: any) => <Box className="cm-table-td">{row.total}</Box>,
        },

    ];
    const SSub_DataTableData = [
        {
            product_type: "Mobile Services",
            phone: "3584577509515",
            username: "Leinonen Henri",
            monthly: "0.0",
            usage: "27.93",
            total: "27.93",
        },
        {
            product_type: "VoIP Services",
            phone: "358201500817",
            username: "Leinonen Henri",
            monthly: "0.0",
            usage: "3.35",
            total: "3.346",
        },
        {
            product_type: "Mobile Services",
            phone: "3584577509515",
            username: "Leinonen Henri",
            monthly: "0.0",
            usage: "27.93",
            total: "27.93",
        },
        {
            product_type: "Mobile Services",
            phone: "3584577509515",
            username: "Leinonen Henri",
            monthly: "0.0",
            usage: "27.93",
            total: "27.93",
        },

    ];
    const Details_SSub_DataTableRow = [
        {
            name: t('Phone'),
            cell: (row: any) => <Box className="cm-table-td">{row.phone}</Box>,
        },
        {
            name: t('Username'),
            cell: (row: any) => <Box className="cm-table-td">{row.username}</Box>,
        },
        {
            name: t('TypeOfPayment'),
            cell: (row: any) => <Box className="cm-table-td">{row.payment_type}</Box>,
        },
        {
            name: t('Product'),
            cell: (row: any) => <Box className="cm-table-td">{row.product}</Box>,
        },
        {
            name: t('Pcs'),
            cell: (row: any) => <Box className="cm-table-td">{row.pcs}</Box>,
        },
        {
            name: t('Total'),
            cell: (row: any) => <Box className="cm-table-td">{row.total}</Box>,
        },

    ];
    const Details_SSub_DataTableData = [
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },
        {
            phone: "3584577509515",
            username: "Leinonen Henri",
            payment_type: "Monthly Fees",
            product: "Licence Bundle, Basic & Mobile & Softphone.0",
            pcs: "1",
            total: "00.00",
        },

    ];
    const CDRs_DataTableRow = [
        {
            name: t('FirstName'),
            cell: (row: any) => <Box className="cm-table-td">{row.first_name}</Box>,
        },
        {
            name: t('LastName'),
            cell: (row: any) => <Box className="cm-table-td">{row.last_name}</Box>,
        },
        {
            name: t('PrimaryNumber'),
            cell: (row: any) => <Box className="cm-table-td">{row.primary_number}</Box>,
        },
        {
            name: t('Profile'),
            cell: (row: any) => <Box className="cm-table-td">{row.profile}</Box>,
        },
        {
            name: t('Time'),
            cell: (row: any) => <Box className="cm-table-td">{row.time}</Box>,
        },
        {
            name: t('Bnum'),
            cell: (row: any) => <Box className="cm-table-td">{row.bnum}</Box>,
        },
        {
            name: t('CallType'),
            cell: (row: any) => <Box className="cm-table-td">{row.call_type}</Box>,
        },
        {
            name: t('SubType'),
            cell: (row: any) => <Box className="cm-table-td">{row.sub_type}</Box>,
        },
        {
            name: t('Duration'),
            cell: (row: any) => <Box className="cm-table-td">{row.durration}</Box>,
        },
        {
            name: t('Price'),
            cell: (row: any) => <Box className="cm-table-td">{row.price}</Box>,
        },
    ];
    const CDRs_DataTableData = [
        {
            first_name: "Harry",
            last_name: "Tim",
            primary_number: "+3321658920096",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Jeck",
            last_name: "Doe",
            primary_number: "+4568764966213",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Micheal",
            last_name: "Hom",
            primary_number: "+646546448799",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "David",
            last_name: "jerry",
            primary_number: "+8978946121564",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Anaabeel",
            last_name: "Doe",
            primary_number: "+89794121238485",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Harry",
            last_name: "Tim",
            primary_number: "+3321658920096",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Micheal",
            last_name: "Hom",
            primary_number: "+646546448799",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "David",
            last_name: "jerry",
            primary_number: "+8978946121564",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Harry",
            last_name: "Tim",
            primary_number: "+3321658920096",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Jeck",
            last_name: "Doe",
            primary_number: "+4568764966213",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Micheal",
            last_name: "Hom",
            primary_number: "+646546448799",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "David",
            last_name: "jerry",
            primary_number: "+8978946121564",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Anaabeel",
            last_name: "Doe",
            primary_number: "+89794121238485",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Harry",
            last_name: "Tim",
            primary_number: "+3321658920096",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "Micheal",
            last_name: "Hom",
            primary_number: "+646546448799",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },
        {
            first_name: "David",
            last_name: "jerry",
            primary_number: "+8978946121564",
            profile: "Lorem Ipsum",
            time: "06:56:00PM",
            bnum: "Lorem",
            call_type: "Voice",
            sub_type: "Lorem",
            durration: "5:42 Mins",
            price: "$12.55",
        },

    ];
    return (
        <div className='cm-traffic-main'>
            <div className='cm-global-tabs-wrapper'>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ paddingBottom: '15px', position: "relative" }}>
                        <Tabs value={customTabValue} aria-label="Traffic Tabs" sx={{ overflow: 'visible' }} className="cm-global-tabs-component">
                            <Stack direction="row" spacing={1} className="cm-trafics-tab-btn-wrapper cm-global-tab-btn-wrapper">
                                <Button variant="outlined" {...a11yProps(0)} onClick={() => customTabHandleChange(0)} className={customTabValue === 0 ? "tab-active cm-global-tab-btn" : "cm-global-tab-btn"}>{t('SummarybyServices')}</Button>
                                <Button variant="outlined" {...a11yProps(1)} onClick={() => customTabHandleChange(1)} className={customTabValue === 1 ? "tab-active cm-global-tab-btn" : "cm-global-tab-btn"}>{t('SummarybySubscriptions')}</Button>
                                <Button variant="outlined" {...a11yProps(2)} onClick={() => customTabHandleChange(2)} className={customTabValue === 2 ? "tab-active cm-global-tab-btn" : "cm-global-tab-btn"}>{t('DetailedSummarybySubscriptions')}</Button>
                                <Button variant="outlined" {...a11yProps(3)} onClick={() => customTabHandleChange(3)} className={customTabValue === 3 ? "tab-active cm-global-tab-btn" : "cm-global-tab-btn"}>{t('CDRs')}</Button>
                            </Stack>
                        </Tabs>
                    </Box>
                    <Box className='cm-global-tabs-content'>
                        <TabPanel value={customTabValue} index={0}>
                            {customTabValue === 0 && (
                                <Box className='cm-global-tab-inner-content'>
                                    <div className='cm-form-inner-fields'>
                                        {
                                            trafficSumService.length > 0 && (
                                                <DataTableComponent isWithBG={false} tRow={SS_DataTableRow} tData={trafficSumService} className="cm-table-strip cm-traffic-pg-summary-service-table" />
                                            )
                                        }
                                    </div>
                                </Box>
                            )}
                        </TabPanel>
                        <TabPanel value={customTabValue} index={1}>
                            {customTabValue === 1 && (
                                <Box className='cm-global-tab-inner-content'>
                                    <div className='cm-form-inner-fields'>
                                        {
                                            trafficSumSubscription.length > 0 && (
                                                <DataTableComponent isWithBG={false} tRow={SSub_DataTableRow} tData={trafficSumSubscription} className="cm-table-strip cm-summary-subscription-table" />
                                            )
                                        }
                                    </div>
                                </Box>
                            )}
                        </TabPanel>
                        <TabPanel value={customTabValue} index={2}>
                            {customTabValue === 2 && (
                                <Box className='cm-global-tab-inner-content'>
                                    <div className='cm-form-inner-fields'>
                                        {
                                            trafficSumDetailSubscrription.length > 0 && (
                                                <DataTableComponent isWithBG={false} tRow={Details_SSub_DataTableRow} tData={Details_SSub_DataTableData} className="cm-table-strip cm-traffic-pg-summary-st-4 cm-detail-summary-subscription-table" />
                                            )
                                        }
                                    </div>
                                </Box>
                            )}
                        </TabPanel>
                        <TabPanel value={customTabValue} index={3}>
                            {customTabValue === 3 && (
                                <Box className='cm-global-tab-inner-content'>
                                    <div className='cm-form-inner-fields'>
                                        {
                                            trafficCDRs.length > 0 && (
                                                <DataTableComponent isWithBG={false} tRow={CDRs_DataTableRow} tData={CDRs_DataTableData} className="cm-table-strip cm-traffic-pg-summary-cdr-tbl" />
                                            )
                                        }

                                    </div>
                                </Box>
                            )}
                        </TabPanel>
                    </Box>
                </Box>
            </div>
        </div>
    );
}

export default TrafficPage;