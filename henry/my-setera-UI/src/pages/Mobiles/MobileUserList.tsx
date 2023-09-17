import React from "react";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationTableData from "../../components/layout/PaginationTableData";
import { Button } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";

type Props = {};

const MobileUserList = (props: Props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const DataSupportRow = [
    {
      name: t("UserName"),
      cell: (row: any) => (
        <Box sx={{ cursor: "pointer" }} className="cm-table-td" onClick={() => navigate(`/mobiles/mobile-user-list/edit/${row.id}`)}>
          <Box>{row.name}</Box>
        </Box>
      ),
    },
    {
      name: t("MobileProduct"),
      cell: (row: any) => (
        <Box className="cm-table-td">{row.mobile_product ? row.mobile_product?.name : "No Prooduct"}</Box>
      ),
    },
    {
      name: t("Number"),
      cell: (row: any) => <Box className="cm-table-td">{row.number}</Box>,
    },
    {
      name: t("SimCard"),
      cell: (row: any) => <Box className="cm-table-td">{row.sim?.id ? row.sim?.icc : "No Sim"}</Box>,
    },
    {
      name: t("Carrier"),
      cell: (row: any) => <Box className="cm-table-td">{row.carrier?.id ? row.carrier?.name : "No carrier"}</Box>,
    },
    {
      name: t("Status"),
      cell: (row: any) => <Box className="cm-table-td">{row.active ? "Active" : "Deactive"}</Box>,
    },
    {
      name: t("ProvNotification"),
      cell: (row: any) => (
        <Box className="cm-table-td">
          <Button
            sx={{
              cursor: "pointer",
              color: colorConfigs.btnStyle.color,
              background: colorConfigs.btnColor.bgColorGreen,
              "&: hover": {
                color: colorConfigs.btnColor.colorGreen,
                background: colorConfigs.btnColor.hoverbgWhite,
              },
            }}
            onClick={() => navigate(`/mobiles/mobile-prov-notifications/subscription/${row.id}`)}>
            View
          </Button>
        </Box >
      ),
    },
    // {
    //   name: t("sidebar_Mobilecertificate"),
    //   cell: (row: any) => (
    //     <Box className="cm-table-td">
    //       {(() => {
    //         switch (row.mobile_certificate) {
    //           case "Add":
    //             return (
    //               <Box
    //                 sx={{
    //                   color: colorConfigs.btnColor.hoverbgWhite,
    //                   background: colorConfigs.btnColor.bgColorGreen,
    //                   padding: "5px 10px",
    //                   boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
    //                   borderRadius: "6px",
    //                   minWidth: "80px",
    //                   textAlign: "center",
    //                 }}
    //               >
    //                 {t(`${row.mobile_certificate}`)}
    //               </Box>
    //             );
    //           case "Remove":
    //             return (
    //               <Box
    //                 sx={{
    //                   color: colorConfigs.btnColor.hoverbgWhite,
    //                   background: colorConfigs.btnColor.bgColorRed,
    //                   boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
    //                   borderRadius: "6px",
    //                   padding: "5px 10px",
    //                   minWidth: "80px",
    //                   textAlign: "center",
    //                 }}
    //               >
    //                 {t(`${row.mobile_certificate}`)}
    //               </Box>
    //             );
    //           case 'waiting':
    //             return <Box sx={{
    //               color: colorConfigs.btnColor.hoverbgWhite,
    //               background: colorConfigs.btnColor.bgcolorLightYellow,
    //               boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
    //               borderRadius: "6px",
    //               padding: "5px 10px"
    //             }}>{t('WaitingonCustomer')}</Box>
    //           default:
    //             return null;
    //         }
    //       })()}
    //     </Box>
    //   ),
    // },
    // {
    //   name: t("ProvNotification"),
    //   cell: (row: any) => (
    //     <Box className="cm-table-td">
    //       <Button
    //         onClick={() =>
    //           navigate("/notifications", { state: NotificationData })
    //         }
    //       >
    //         {t(`${row.prov_notification}`)}
    //       </Button>
    //     </Box>
    //   ),
    // },
  ];
  return (
    <div className="cm-mobile-user-Data-main">
      <div className="cm-mobile-user-Data-table">
        <PaginationTableData
          apiLink="/mobile/subscription/"
          tRow={DataSupportRow}
          searchfield={true}
          btnComponent={{
            isBtnShow: true,
            btnLink: `${location.pathname}/add`,
            btnLable: t("AddNewMobile")
          }}
        />
      </div>
    </div>
  );

};

export default MobileUserList;