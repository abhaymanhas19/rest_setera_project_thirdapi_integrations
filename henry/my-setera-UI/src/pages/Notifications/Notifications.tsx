import React, { useState, useEffect, useTransition } from "react";
import Box from "@mui/material/Box";
import PaginationTableData from "../../components/layout/PaginationTableData";
import { useTranslation } from "react-i18next";
import colorConfigs from "../../configs/colorConfigs";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Root } from "react-dom/client";
import { RootState } from "../../redux/store";
const SingleNotification = (props: any) => {
  const { data, onClose } = props;
  return (
    <Box className="cm-single-notification-main">
      <Button variant="contained"
        className="cm-btn-style"
        sx={{
          color: colorConfigs.btnColor.hoverbgWhite,
          background: colorConfigs.btnColor.bgColorRed,
          "&: hover": {
            color: colorConfigs.btnColor.bgColorRed,
            background: colorConfigs.btnColor.hoverbgWhite,
          }
        }} onClick={onClose}><ArrowBackIcon /></Button>
      <Box className="cm-single-notify-title">{data.name}</Box>
      <Box className="cm-notify-content">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </Box>
  );
};
const Notifications = (props: any) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [subscriptionId, setSubscriptionId] = useState("");
  const [customTabs, setCustomTabs] = useState(0);
  const [selectNotification, setselectNotification] = useState({});
  const handleTabs = (val: number) => {
    setCustomTabs(val);
  };
  const handleUserDetail = (row: any) => {
    setselectNotification(row);
  };
  useEffect(() => {
    if (Object.keys(selectNotification).length > 0) {
      handleTabs(1);
    } else {
      handleTabs(0);
    }
  }, [selectNotification]);

  const NotificationData = [
    {
      name: "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
      data: [
        {
          "ifx.mvno:sendSOReqAck": {
            "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "ifx.mvno:orderId":
              "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
            "ifx.mvno:status": "I_RECEIVED",
          },
        },
        {
          "ifx.mvno:sendSOReqAck": {
            "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "ifx.mvno:orderId":
              "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
            "ifx.mvno:status": "I_RECEIVED",
          },
        },
        {
          "ifx.mvno:sendSOReqAck": {
            "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "ifx.mvno:orderId":
              "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
            "ifx.mvno:status": "I_RECEIVED",
          },
        },
      ],
    },
    {
      name: "SETERA_ADDCERT_ORDER_ID_003584577130691_20221130024839",
      data: [
        {
          "ifx.mvno:sendSOReqAck": {
            "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "ifx.mvno:orderId":
              "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
            "ifx.mvno:status": "I_RECEIVED",
          },
        },
        {
          "ifx.mvno:sendSOReqAck": {
            "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "ifx.mvno:orderId":
              "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
            "ifx.mvno:status": "I_RECEIVED",
          },
        },
        {
          "ifx.mvno:sendSOReqAck": {
            "@xmlns:ifx.mvno": "COM_SOM_ServiceOrderRequest_MVNO",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "ifx.mvno:orderId":
              "SETERA_CREATE_ORDER_ID_003584577130691_20221130005742",
            "ifx.mvno:status": "I_RECEIVED",
          },
        },
      ],
    },
  ];
  useEffect(() => {
    console.log(id);
    if (id !== undefined && id !== '') {
      setSubscriptionId(id);
    }
    console.log("this is subscription id ", id);
  }, [id])
  const DataSupportRow = [
    {
      name: t('ProvNotifivations'),
      cell: (row: any) => (
        <Box
          sx={{ cursor: "pointer" }} className="cm-table-td" onClick={() => handleUserDetail(row)}>
          <Box>{row.order_id}</Box>
        </Box>
      ),
    }
  ];
  const onCloseTab = () => {
    setselectNotification({});
  }
  return (
    <Box className="cm-notification-main">

      {customTabs === 0 && (
        <div className="cm-mobile-user-Data-main">
          <div className="cm-mobile-user-Data-table">
            {id !== '' && id !== undefined ? (
              <PaginationTableData
                dependOn="apiParamValue"
                apiParamName="subscription__id"
                apiParamValue={id}
                apiLink="/dna/prov-notification/"
                tRow={DataSupportRow}
                searchfield={true}
                btnComponent={{
                  isBtnShow: false,
                }}
              />) : (
              <PaginationTableData
                apiLink="/dna/prov-notification/"
                tRow={DataSupportRow}
                searchfield={true}
                btnComponent={{
                  isBtnShow: false,
                }}
              />)}

          </div>
        </div>
      )}
      {customTabs === 1 && <SingleNotification onClose={onCloseTab} data={selectNotification} />}
    </Box>
  );
};

export default Notifications;
