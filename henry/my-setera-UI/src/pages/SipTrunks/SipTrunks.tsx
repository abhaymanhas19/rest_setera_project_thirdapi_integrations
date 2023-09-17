import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { setSipTunks } from '../../redux/features/sipTunksStateSlice';
import DataTableComponent from '../../components/layout/DataTableComponet';
import { useTranslation } from 'react-i18next';

type Props = {};

const SipTrunks = (props: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const getAllSipTrunks = useSelector((state: any) => state.sipTrunks.sipTunksState);
  const SipTunksRow = [
    {
      name: t('DirectionInOut'),
      cell: (row: any) => <Box className="cm-table-td">{row.directory_in_out}</Box>,
    },
    {
      name: t('NumbersPrefixes'),
      cell: (row: any) => <Box className="cm-table-td">{row.number_prefixes}</Box>,
    },
    {
      name: t('IPorCommonname'),
      cell: (row: any) => <Box className="cm-table-td">{row.ip_common_name}</Box>,
    },
    {
      name: t('Barring'),
      cell: (row: any) => <Box className="cm-table-td">{row.barring}</Box>,
    },
  ];
  const TempDataJSON = [{ 'name': 'name', 'before': 'Varapuhelin3', 'after': 'B 38' }, { 'name': 'barring_voice', 'before': 'DNA - P2 Barring of outgoing calls to service numbers for consulting and ordering', 'after': 'DNA...' }];
  const SipTunksData = [
    {
      id: 1,
      directory_in_out: "IN",
      number_prefixes: "+1 234 5679 102",
      ip_common_name: "123.456.7899",
      barring: "Lorem ipsum dolor sit amet, consectetur",
      data: [
        {
          order_id: "MOBILE_ORDER_20221123115205",
          author: "setera@setera.com",
          data_payload: TempDataJSON,
          product: "Mobile",
          type: "Modify",
          target: "12345678910",
          operator_status: "start",
          odoo_status: "complete",
          goodsign_status: "complete",
          mexmanager_status: "complete",
          create_date: "20 Dec, 2021",
          activation_date: "22 Dec, 2022",
          ready: "No",
        },
        {
          order_id: "MOBILE_ORDER_20221123115206",
          author: "setera@setera.com",
          data_payload: TempDataJSON,
          product: "Mobile",
          type: "Modify",
          target: "12345678910",
          operator_status: "done",
          odoo_status: "done",
          goodsign_status: "done",
          mexmanager_status: "done",
          create_date: "20 Dec, 2021",
          activation_date: "22 Dec, 2022",
          ready: "Yes",
        },
        {
          order_id: "MOBILE_ORDER_20221123115207",
          author: "setera@setera.com",
          data_payload: TempDataJSON,
          product: "Mobile",
          type: "Modify",
          target: "12345678910",
          operator_status: "started",
          odoo_status: "complete",
          goodsign_status: "complete",
          mexmanager_status: "complete",
          create_date: "20 Dec, 2021",
          activation_date: "22 Dec, 2022",
          ready: "No",
        },
      ]
    },
    {
      id: 2,
      directory_in_out: "IN",
      number_prefixes: "+1 4567 8941 123",
      ip_common_name: "345.456.7899",
      barring: "Ipsum dolor sit amet, consectetur",
    },
    {
      id: 3,
      directory_in_out: "OUT",
      number_prefixes: "+23 123 4567 890",
      ip_common_name: "678.456.7899",
      barring: "Lorem ipsum sit amet, consectetur",
    },
    {
      id: 4,
      directory_in_out: "OUT",
      number_prefixes: "+1 1234 5678 940",
      ip_common_name: "910.456.7899",
      barring: "Dolor lorem sit amet, consectetur",
    },
    {
      id: 5,
      directory_in_out: "OUT",
      number_prefixes: "+45 9876 543 210",
      ip_common_name: "123.456.7899",
      barring: "Consectetur lorem ipsum dolor sit amet",
    },

  ];

  useEffect(() => {
    if (getAllSipTrunks.length === 0) {
      dispatch(setSipTunks(SipTunksData));
    }
    // eslint-disable-next-line
  }, [getAllSipTrunks]);
  const SipTrunksComponent = () => {
    return (
      <>
        <div className='cm-sip-trunks-Data-table'>
          {getAllSipTrunks.length > 0 && (
            <DataTableComponent isWithBG={false} isRounded={true} tRow={SipTunksRow} tData={getAllSipTrunks} />
          )}
        </div>
      </>)
  }
  return (
    <div className='cm-sip-trunks-main'>
      <SipTrunksComponent />
    </div>
  );
};

export default SipTrunks;