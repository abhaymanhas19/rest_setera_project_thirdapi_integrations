import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import colorConfigs from '../../configs/colorConfigs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSupportState } from '../../redux/features/supportStateSlice';
import DataTableComponent from '../../components/layout/DataTableComponet';
import { useTranslation } from 'react-i18next';

type Props = {};

const Support = (props: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const AllSupportTickets = useSelector((state: RootState) => state.support.supportState);
  useEffect(() => {
    if (AllSupportTickets.length === 0) {
      dispatch(setSupportState(SupportData));
    }
    // eslint-disable-next-line
  }, [AllSupportTickets]);
  const DataSupportRow = [
    {
      name: t('TicketID'),
      cell: (row: any) => <Box sx={{ cursor: "pointer" }} className="cm-table-td">{row.track_id}</Box>,

    },
    {
      name: t('Subject&Description'),
      cell: (row: any) => <Box className="cm-table-td cm-table-bigrow">
        <Box>{row.title}</Box>
        <Box>{row.subject_description}</Box>
      </Box>,
    },
    {
      name: t('AgentInfo'),
      cell: (row: any) => <Box className="cm-table-td">{row.agent_info}</Box>,
    },
    {
      name: t('CreatedOn'),
      cell: (row: any) => <Box className="cm-table-td">{row.created_on}</Box>,
    },
    {
      name: t('Status'),
      cell: (row: any) => <Box className="cm-table-td">
        {(() => {
          switch (row.status) {
            case 'open':
              return <Box sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorLightBlue,
                padding: "5px 10px",
                boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "6px"
              }}>{t('Open')}</Box>
            case 'close':
              return <Box sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorLightRed,
                boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "6px",
                padding: "5px 10px"
              }}>{t('Close')}</Box>
            case 'waiting':
              return <Box sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgcolorLightYellow,
                boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
                borderRadius: "6px",
                padding: "5px 10px"
              }}>{t('WaitingonCustomer')}</Box>
            default:
              return null
          }
        })()}
      </Box>,
    },
  ];
  const SupportData = [
    {
      id: 1,
      track_id: "#23451",
      title: "Lorem ipsum dollor set amet",
      subject_description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      agent_info: "John Doe",
      created_on: "22 Dec 2022",
      status: "open"
    },
    {
      id: 2,
      track_id: "#23452",
      title: "Lorem ipsum dollor set amet",
      subject_description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      agent_info: "John Doe",
      created_on: "22 Dec 2022",
      status: "waiting"
    },
    {
      id: 3,
      track_id: "#23452",
      title: "Lorem ipsum dollor set amet",
      subject_description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      agent_info: "John Doe",
      created_on: "22 Dec 2022",
      status: "close"
    },
    {
      id: 4,
      track_id: "#23452",
      title: "Lorem ipsum dollor set amet",
      subject_description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      agent_info: "John Doe",
      created_on: "22 Dec 2022",
      status: "waiting"
    },
  ];
  return (
    <div className='cm-support-main'>
      <div className='cm-support-Data-table'>

        {
          AllSupportTickets.length > 0 && (
            <DataTableComponent isWithBG={true} isRounded={false} tRow={DataSupportRow} tData={AllSupportTickets} />
          )
        }
      </div>
    </div>
  );
};

export default Support;