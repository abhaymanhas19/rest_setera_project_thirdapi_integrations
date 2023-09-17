import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import colorConfigs from "../../configs/colorConfigs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import DataTableComponent from "../../components/layout/DataTableComponet";
import { useTranslation } from "react-i18next";
import { setMessageState } from "../../redux/features/messagesStateSlice";
import {
  Button,
  FormControl,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {};

const MessageData = [
  {
    id: 1,
    Message: "Lorem ipsum dollor set amet",
    Reseller: "Marko Lahnala",
    Message_Text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni...",
    Action: "Edit",
  },
  {
    id: 2,
    Message: "Lorem ipsum dollor set amet",
    Reseller: "Marko Lahnala",
    Message_Text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni...",
    Action: "Edit",
  },
  {
    id: 3,
    Message: "Lorem ipsum dollor set amet",
    Reseller: "Marko Lahnala",
    Message_Text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni...",
    Action: "Edit",
  },
  {
    id: 4,
    Message: "Lorem ipsum dollor set amet",
    Reseller: "Marko Lahnala",
    Message_Text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni...",
    Action: "Edit",
  },
];

const MessageEditComponent = (props: any) => {
  const { setCustomTabs, row } = props;
  console.log("01", row);
  console.log("02", setCustomTabs);
  const { t } = useTranslation();
  const formSwalTranslation = {
    formSwalTitle: t("AreYouWanttoSave"),
    formSwalText: t("Youwontbeabletorevertthis"),
    fomrSwalCancel: t("Cancel"),
    formSwalSaved: t("YesSavedit"),
    formSwalDataSaved: t("YourDatahasbeensaved"),
    formSwalSubmited: t("Submited"),
  };
  const formik = useFormik({
    initialValues: {
      form_dc_Message: row.Message ? row.Message : "",
      form_dc_Reseller: row.Reseller ? row.Reseller : "",
      form_dc_Message_Text: row.Message_Text ? row.Message_Text : "",
    },
    onSubmit: (values) => {
      console.log(values);
      Swal.fire({
        title: formSwalTranslation.formSwalTitle,
        text: formSwalTranslation.formSwalText,
        icon: "warning",
        cancelButtonText: formSwalTranslation.fomrSwalCancel,
        showCancelButton: true,
        confirmButtonColor: "#103256",
        cancelButtonColor: "#d33",
        confirmButtonText: formSwalTranslation.formSwalSaved,
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            formSwalTranslation.formSwalSubmited,
            formSwalTranslation.formSwalDataSaved,
            "success"
          );
        }
      });
    },
  });
  return (
    <>
      <div className="cm-single-data-conn-wrapper">
        <div className="cm-data-conn-form-wrap">
          <form onSubmit={formik.handleSubmit}>
            <Box className="cm-form-inner-fields">
              <Box className="form-mb-30">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={3}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">{t("Message")}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="dc_Message"
                            variant="outlined"
                            value={formik.values.form_dc_Message}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">{t("Reseller")}</div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            variant="outlined"
                            name="form_dc_Reseller"
                            value={formik.values.form_dc_Reseller}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Box sx={{ width: "100%" }}>
                        <div className="form-lable-name">
                          {t("Message Text")}
                        </div>
                        <FormControl sx={{ width: "100%" }}>
                          <TextField
                            name="form_dc_Message_Text"
                            variant="outlined"
                            value={formik.values.form_dc_Message_Text}
                            onChange={formik.handleChange}
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: "36px" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent={"start"}
                className="form-submit-cancel-btn-wrapper"
              >
                <Button
                  variant="contained"
                  endIcon={<CheckCircleIcon />}
                  className="cm-btn-style"
                  sx={{
                    color: colorConfigs.btnColor.hoverbgWhite,
                    background: colorConfigs.btnColor.bgColorGreen,
                    "&: hover": {
                      color: colorConfigs.btnColor.bgColorGreen,
                      background: colorConfigs.btnColor.hoverbgWhite,
                    },
                  }}
                  type="submit"
                >
                  Save Changes{" "}
                </Button>
                <Button
                  variant="contained"
                  endIcon={<CancelIcon />}
                  className="cm-btn-style"
                  sx={{
                    color: colorConfigs.btnColor.hoverbgWhite,
                    background: colorConfigs.btnColor.bgColorRed,
                    "&: hover": {
                      color: colorConfigs.btnColor.bgColorRed,
                      background: colorConfigs.btnColor.hoverbgWhite,
                    },
                  }}
                  onClick={() => setCustomTabs(0)}
                >
                  Discard{" "}
                </Button>
              </Stack>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

const Messages = (props: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [customTabs, setCustomTabs] = useState(0);
  const [selectDataConnection, setSelectDataConnection] = useState({});

  useEffect(() => {
    if (Object.keys(selectDataConnection).length > 0) {
      handleTabs(1);
    }
  }, [selectDataConnection]);

  const AllMoessageUserTickets = useSelector(
    (state: RootState) => state.messageUser.messageState
  );

  const handleTabs = (val: number) => {
    setCustomTabs(val);
  };

  const updateState = (state: any) => {
    AllMoessageUserTickets({ selectedRows: state.selectedRows });
  };

  const handleDataConnDetail = (row: any) => {
    setSelectDataConnection(row);
  };
  useEffect(() => {
    if (AllMoessageUserTickets.length === 0) {
      dispatch(setMessageState(MessageData));
    }
    // eslint-disable-next-line
  }, [AllMoessageUserTickets]);

  const DataSupportRow = [
    {
      name: t("Message"),
      cell: (row: any) => (
        <Box sx={{ cursor: "pointer" }} className="cm-table-td">
          {row.Message}
        </Box>
      ),
    },
    {
      name: t("Reseller"),
      cell: (row: any) => (
        <Box className="cm-table-td">
          <Box>{row.Reseller}</Box>
        </Box>
      ),
    },
    {
      name: t("MessageText"),
      cell: (row: any) => (
        <Box className="cm-table-td">
          <Box>{row.Message_Text}</Box>
        </Box>
      ),
    },

    {
      name: t("Action"),
      cell: (row: any) => (
        <Box className="cm-table-td">
          <Box
            sx={{
              color: colorConfigs.btnColor.hoverbgWhite,
              background: colorConfigs.btnColor.bgcolorDarkBlue,
              padding: "5px 10px",
              boxShadow: "0px 1px 8px rgba(0, 0, 0, 0.15)",
              borderRadius: "6px",
              minWidth: "80px",
              textAlign: "center",
            }}
          >
            <Button
              sx={{ color: colorConfigs.btnColor.hoverbgWhite }}
              onClick={() => handleDataConnDetail(row)}
            >
              {t(`${row.Action}`)}
            </Button>
          </Box>
        </Box>
      ),
    },
  ];

  const DataMessageComponent = () => (
    <>
      <div className="cm-message-user-Data-table">
        {AllMoessageUserTickets.length > 0 && (
          <DataTableComponent
            isWithBG={true}
            isRounded={false}
            tRow={DataSupportRow}
            tData={AllMoessageUserTickets}
            onSelectedRowsChange={updateState}
            selectableRows
          />
        )}
      </div>
    </>
  );
  return (
    <div className="cm-message-user-Data-main">
      {customTabs === 0 && (
        <>
          <DataMessageComponent />
        </>
      )}
      {customTabs === 1 && (
        <>
          <MessageEditComponent
            setCustomTabs={setCustomTabs}
            row={selectDataConnection}
          />
        </>
      )}
    </div>
  );
};

export default Messages;
