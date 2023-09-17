import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import colorConfigs from '../../configs/colorConfigs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setTasks } from '../../redux/features/tasksStateSlice';
import DataTableComponent from '../../components/layout/DataTableComponet';
import { useTranslation } from 'react-i18next';
import AxiosMain from '../../components/layout/AxiosMain';
import Swal from 'sweetalert2';

type Props = {};

const TasksPage = (props: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const checkUser = useSelector((state: RootState) => state.authState.authState);
  const AllTask = useSelector((state: RootState) => state.task.tasksState);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${checkUser.access}`,
    },
  }
  const formSwalTranslation = {
    formSwalTitle: t("AreYouWanttoSave"),
    formSwalText: t("Youwontbeabletorevertthis"),
    fomrSwalCancel: t("Cancel"),
    formSwalSaved: t("YesSavedit"),
    formSwalDataSaved: t("YourDatahasbeensaved"),
    formSwalSubmited: t("Submited"),
    form_Delete: t('Delete'),
    formSwalWentWrong: t("SomethingWentWrong"),
    formDataEmpty: t("EmptyData")
  };
  const getTaskList = () => {
    AxiosMain("/tasks/tasks/", config).then((res: any) => {
      if (res.status === 200) {
        if (res.data.results.length > 0) {
          dispatch(setTasks(res.data.results));
        }
        else {
          Swal.fire({
            title: formSwalTranslation.formDataEmpty,
            icon: "error"
          })
        }
      }
    }).catch((e) => {
      Swal.fire({
        title: formSwalTranslation.formSwalWentWrong,
        icon: "error"
      })
    })
  }
  useEffect(() => {
    if (AllTask.length === 0) {
      getTaskList();
    } 
    // eslint-disable-next-line
  }, [AllTask]);
  const SingleTasksRow = [
    {
      name: t('OrderID'),
      cell: (row: any) => <Box className="cm-table-td cm-table-ord-wd">{row.order_id}</Box>,
    },
    {
      name: t('Author'),
      cell: (row: any) => <Box className="cm-table-td">{row.author_id}</Box>,
    },
    {
      name: t('DataPayload'),
      cell: (row: any) => <Box className="cm-table-td">{JSON.stringify(row.payload)}</Box>,
    },
    {
      name: t('Product'),
      cell: (row: any) => <Box className="cm-table-td">{row.order_product}</Box>,
    },
    {
      name: t('Type'),
      cell: (row: any) => <Box className="cm-table-td">{row.order_type}</Box>,
    },
    {
      name: t('Target'),
      cell: (row: any) => <Box className="cm-table-td">{row.order_target}</Box>,
    },
    {
      name: t('OperatorStatus'),
      cell: (row: any) => <Box className="cm-table-td" data-id={row.operator_status}>
        {(() => {
          switch (row.operator_provisioning_status) {
            case 1:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorLightBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorLightBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Started')}</Button>
            case 0:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorGreen,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorGreen,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Start')}</Button>
            case 3:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorGreen,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorGreen,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('MarkDone')}</Button>
            case 2:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorRed,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorRed,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }} startIcon={<CheckCircleIcon />}>{t('Failed')}</Button>
            default:
              return null
          }
        })()}
      </Box>,
    },
    {
      name: t('Odoostatus'),
      cell: (row: any) => <Box className="cm-table-td">
        {(() => {
          switch (row.odoo_provisioning_status) {
            case 1:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorLightBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorLightBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Started')}</Button>
            case 0:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorGreen,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorGreen,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Start')}</Button>
            case 3:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgcolorDarkBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgcolorDarkBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }} startIcon={<CheckCircleIcon />}>{t('Done')}</Button>
            case 2:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorRed,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorRed,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Failed')}</Button>
            default:
              return null
          }
        })()}
      </Box>,
    },
    {
      name: t('GoodsignStatus'),
      cell: (row: any) => <Box className="cm-table-td">
        {(() => {
          switch (row.goodsign_provisioning_status) {
            case 1:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorLightBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorLightBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Started')}</Button>
            case 0:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorGreen,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorGreen,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Start')}</Button>
            case 3:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgcolorDarkBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgcolorDarkBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }} startIcon={<CheckCircleIcon />}>{t('Done')}</Button>
            case 2:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorRed,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorRed,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Failed')}</Button>
            default:
              return null
          }
        })()}
      </Box>,
    },
    {
      name: t('MexmanagerStatus'),
      cell: (row: any) => <Box className="cm-table-td">
        {(() => {
          switch (row.mexmanager_provisioning_status) {
            case 1:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorLightBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorLightBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Started')}</Button>
            case 0:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorGreen,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorGreen,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Start')}</Button>
            case 3:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgcolorDarkBlue,
                "&: hover": {
                  color: colorConfigs.btnColor.bgcolorDarkBlue,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }} startIcon={<CheckCircleIcon />}>{t('Done')}</Button>
            case 2:
              return <Button sx={{
                color: colorConfigs.btnColor.hoverbgWhite,
                background: colorConfigs.btnColor.bgColorRed,
                "&: hover": {
                  color: colorConfigs.btnColor.bgColorRed,
                  background: colorConfigs.btnColor.hoverbgWhite,
                }
              }}>{t('Failed')}</Button>
            default:
              return null
          }
        })()}
      </Box>,
    },
    {
      name: t('CreatedDate'),
      cell: (row: any) => {
        const datedata: Date = new Date(row.created);
        return (<Box className="cm-table-td">{datedata.toDateString()}</Box>)
      }
    },
    // {
    //   name: t('ActivationDate'),
    //   cell: (row: any) => <Box className="cm-table-td">{row.activation_date}</Box>,
    // },
    {
      name: t('Ready'),
      cell: (row: any) => <Box className="cm-table-td">{row.completed ? "Complete" : "Not done"}</Box>,
    },
  ];
  return (
    <div className='cm-task-page-main'>
      <div className='cm-tasks-Data-table'>
        {
          AllTask.length > 0 && (
            <DataTableComponent isRounded={true} isWithBG={false} tRow={SingleTasksRow} tData={AllTask} />
          )
        }
      </div>
    </div>
  );
};

export default TasksPage;