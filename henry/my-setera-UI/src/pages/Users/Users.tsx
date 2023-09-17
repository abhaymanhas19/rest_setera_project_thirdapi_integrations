import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import * as Yup from 'yup';
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import colorConfigs from "../../configs/colorConfigs";
import { useFormik } from "formik";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from "react-redux";
import { setUsersState } from "../../redux/features/usersStateSlice";
import DataTableComponent from "../../components/layout/DataTableComponet";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import AxiosMain from "../../components/layout/AxiosMain";
import AddUser from "./AddUser";
import LoaderScreen from "../../components/layout/LoaderScreen";

type Props = {};

const CustomTabsComponent = (props: any) => {
  const { row, setCustomTabs } = props;
  const { t } = useTranslation();
  //const dispatch = useDispatch();
  const [dropDownRole, setDropDownRole] = useState([]);
  const checkUser = useSelector((state: RootState) => state.authState.authState);
  //const OrgnisationData = useSelector((state: RootState) => state.appState.appOrg);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${checkUser.access}`,
    },
  }
  const getDropDownData = async ({ url, saveData, config }: any) => {
    AxiosMain.get(url, config).then((res) => {
      if (res.status === 200 && res.data.count > 0) {
        saveData(res.data.results);
      }
    }).catch((e) => {
      console.log("Something went wrong while fetching data");
    })
  }
  useEffect(() => {
    if (dropDownRole.length === 0) {
      getDropDownData({ url: "/add-role/", saveData: setDropDownRole, config });
    }
    // eslint-disable-next-line
  }, []);
  const formSwalTranslation = {
    formSwalTitle: t("AreYouWanttoSave"),
    formSwalText: t("Youwontbeabletorevertthis"),
    fomrSwalCancel: t("Cancel"),
    formSwalSaved: t("YesSavedit"),
    formSwalDataSaved: t("YourDatahasbeensaved"),
    formSwalSubmited: t("Submited"),
    formSwalWrong: t("SomethingWentWrong"),
    form_Delete: t('Delete'),
    formSwalWentWrong: t("SomethingWentWrong"),
    formSwalSureDele: t('Areyousureyouwanttodelete'),
  };
  const AddUserSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    first_name: Yup.string().required('Required'),
    role: Yup.string().required('Required')
  });
  useEffect(() => {
    if (Object.keys(row).length > 0) {
      const { first_name, email, role } = row;
      if (first_name !== '') {
        formik.setFieldValue("first_name", first_name)
      }
      if (email !== '') {
        formik.setFieldValue("email", email);
      }
      if (role !== '') {
        formik.setFieldValue("role", role.id);
      }
    }
    // eslint-disable-next-line
  }, [row])
  const formik = useFormik({
    initialValues: {
      first_name: "",
      email: "",
      role: "",
    },
    validationSchema: AddUserSchema,
    onSubmit: (values) => {
      console.log(values);
      AxiosMain.patch(`/add-user/${row.id}/`, values, config).then((res) => {
        console.log("User Updated ", res);
        if (res.status === 200) {
          Swal.fire({
            title: formSwalTranslation.formSwalSubmited,
            text: formSwalTranslation.formSwalDataSaved,
            icon: "success"
          });
          formik.resetForm();
          setCustomTabs(0);
        }
      }).catch((e) => {
        const { response } = e;
        console.log("response ", response);
        if (response.status === 500) {
          Swal.fire({
            title: "Error",
            text: formSwalTranslation.formSwalWrong,
            icon: "error"
          });
        }
        else if (response.status === 400) {
          const { email } = response.data;
          if (email.length > 0) {
            Swal.fire({
              title: "Error",
              text: email[0],
              icon: "error"
            });
          }
        }
      })
    },
  });
  const deleteUser = (row: any) => {
    if (Object.keys(checkUser).length > 0 && Object.keys(row).length > 0) {
      if (checkUser.user.user_id === row.id) {
        Swal.fire({
          title: "Warning",
          text: "Unable to delet Current User!",
          icon: "warning"
        });
      } else {
        Swal.fire({
          text: `${formSwalTranslation.formSwalSureDele} ${row.name} ${t('user?')}`,
          icon: 'warning',
          cancelButtonText: formSwalTranslation.fomrSwalCancel,
          showCancelButton: true,
          confirmButtonColor: '#103256',
          cancelButtonColor: '#d33',
          confirmButtonText: formSwalTranslation.form_Delete,
        }).then((result: any) => {
          if (result.isConfirmed) {
            AxiosMain.delete(`/add-user/${row.id}/`, config).then((res) => {
              console.log("User Delete Response ", res);
              if (res.status === 204 && res.data === '') {
                setCustomTabs(0);
                Swal.fire({ title: formSwalTranslation.form_Delete, icon: "success" });
              }
            }).catch((e) => {
              Swal.fire({
                title: formSwalTranslation.formSwalWentWrong,
                icon: "error"
              });
            })
          }
        })
      }
    } else {
      Swal.fire({
        title: formSwalTranslation.formSwalWentWrong,
        icon: "error"
      });
    }

  }
  return (
    <>
      <div className="cm-user-tabs-wrapper  cm-global-tabs-wrapper">
        <div className="cm-user-name-wrap">
          <Stack direction="row" spacing={2} alignItems="center">
            <div className="fw-600">{t("EditUser")}</div>
          </Stack>
        </div>
        <div className="cm-user-form-wrap">

          <Box sx={{ width: "100%" }}>
            <Box className="cm-global-tabs-content">
              <form onSubmit={formik.handleSubmit}>
                <Box className="cm-global-tab-inner-content">
                  <Grid container spacing={5}>
                    <Grid item md={12} sm={12} xs={12}>
                      <Box className="cm-form-inner-fields">
                        <Box className="form-mb-30">
                          <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={3}>
                              <Grid item md={6} sm={6} xs={12}>
                                <Box sx={{ width: "100%" }}>
                                  <div className="form-lable-name">
                                    {t("FirstName")}
                                  </div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <TextField
                                      id="first_name"
                                      name="first_name"
                                      variant="outlined"
                                      value={formik.values.first_name}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </FormControl>
                                  {formik.errors.first_name && formik.touched.first_name && <p className="cm-form-error">{formik.errors.first_name}</p>}
                                </Box>
                              </Grid>
                              <Grid item md={6} sm={6} xs={12}>
                                <Box sx={{ width: "100%" }}>
                                  <div className="form-lable-name">
                                    {t("email")}
                                  </div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <TextField
                                      id="email"
                                      name="email"
                                      variant="outlined"
                                      value={formik.values.email}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                    />
                                  </FormControl>
                                  {formik.errors.email && formik.touched.email && <p className="cm-form-error">{formik.errors.email}</p>}
                                </Box>
                              </Grid>
                              <Grid item md={6} sm={6} xs={12}>
                                <Box sx={{ width: "100%" }}>
                                  <div className="form-lable-name">
                                    {t("Role")}
                                  </div>
                                  <FormControl sx={{ width: "100%" }}>
                                    <Select
                                      className="form-select-pad"
                                      id="role"
                                      name="role"
                                      label=""
                                      value={
                                        formik.values.role
                                      }
                                      onChange={formik.handleChange}
                                    >
                                      <MenuItem value="">Choose Option</MenuItem>
                                      {dropDownRole.length > 0 && (
                                        dropDownRole.map((val: any) => (
                                          <MenuItem key={`user-carrier-data--${val.id}`} value={val.id}>{val.name}</MenuItem>
                                        ))
                                      )}
                                    </Select>
                                  </FormControl>
                                  {formik.errors.role && formik.touched.role && <p className="cm-form-error">{formik.errors.role}</p>}
                                </Box>
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                {/* Button save changes and Discard */}
                <Box sx={{ marginTop: "40px" }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent={"space-between"}
                    className="form-submit-cancel-btn-wrapper"
                  >
                    <Box>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        justifyContent={"start"}
                        className="form-submit-cancel-btn-wrapper"
                      >
                        <Button
                      type="submit"
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
                    >
                      {t("saveChanges")}
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
                      {t("discard")}
                    </Button>
                      </Stack>
                    </Box>
                    <Button
                      variant="contained"
                      endIcon={<CancelIcon />}
                      className="cm-btn-style justify-self-end"
                      sx={{
                        color: colorConfigs.btnColor.hoverbgWhite,
                        background: colorConfigs.btnColor.bgColorRed,
                        "&: hover": {
                          color: colorConfigs.btnColor.bgColorRed,
                          background: colorConfigs.btnColor.hoverbgWhite,
                        },
                      }}
                      onClick={() => deleteUser(row)}
                    >
                      {t("Delete")}
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};
const Users = (props: Props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [customTabs, setCustomTabs] = useState(0);
  const [selectUser, setSelectUser] = useState({});
  const [userRole, setUserRole] = useState([]);
  const [openUserRoleModal, setOpenUserRoleModal] = useState(false);
  const handleUserRoleOpen = () => setOpenUserRoleModal(true);
  const handleUserRoleClose = () => setOpenUserRoleModal(false);
  const checkUser = useSelector((state: RootState) => state.authState.authState);
  const getAllUsers = useSelector((state: any) => state.usersState.userState);
  const organization = useSelector((state: RootState) => state.appState.appOrg);
  const { t } = useTranslation();
  const formSwalTranslation = {
    formSwalTitle: t("SomethingWentWrong"),
    formSwalSucccesTitle: t("Checkyouremail"),
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${checkUser.access}`,
    },
  }
  //get User By API
  const getUserData = async () => {

    AxiosMain.get("/users/", config).then((res) => {
      if (res.status === 200 && res.data.count > 0) {
        const UserResata =  res.data.results.filter((val:any)=> val.role !== null);
        dispatch(setUsersState(UserResata));
      } else {
        dispatch(setUsersState([]));
      }
      setIsLoading(false);

    }).catch((e) => {
      //axiosMainErrors(e.response, e.response.data);
      setIsLoading(false);
      console.log("While geting Error", e);
      if (e?.message === 'Organization Not Found!') {
        Swal.fire({
          title: e.message,
          icon: 'warning',
        })
      } else {
        Swal.fire({
          title: formSwalTranslation.formSwalTitle,
          icon: 'warning',
        })
      }

    })
  }

  // Settings User Data
  // useEffect(() => {
  //   if (isLoading) {
  //     getUserData();
  //   }
  //   // eslint-disable-next-line
  // }, []);
  //Fetcg user When Organisation Change
  useEffect(() => {
    // if (Object.keys(organization).length > 0 && getAllUsers.length === 0) {
    //   setIsLoading(true);
    //   getUserData();
    // }
    setIsLoading(true);
    getUserData();
    // eslint-disable-next-line
  }, [organization]);

  const handleTabs = (val: number) => {
    setCustomTabs(val);
  };
  const handleUserDetail = (row: any) => {
    AxiosMain.get(`/users/${row.id}/`, config).then((res) => {
      setSelectUser(res.data);
    }).catch((e) => {
      setSelectUser({});
      console.log("error", e);
      Swal.fire({
        title: formSwalTranslation.formSwalTitle,
        icon: 'warning',
      })
    })
  };
  useEffect(() => {
    if (Object.keys(selectUser).length > 0) {
      handleTabs(1);
    }
  }, [selectUser]);
  useEffect(() => {
    if (customTabs === 0) {
      setSelectUser({});
      getUserData();
    }
    // eslint-disable-next-line
  }, [customTabs]);
  const UserRow = [
    {
      name: t("name"),
      cell: (row: any) => (
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => handleUserDetail(row)}
          className="cm-table-td"
        >
          {row.first_name}
        </Box>
      ),
    },
    {
      name: t("email"),
      cell: (row: any) => <Box className="cm-table-td">{row.email}</Box>,
    },
    {
      name: t("Role"),
      // selector: (row:any) => row.role,
      cell: (row: any) => (
        <>
          <Button variant="text" className="cm-data-table-btn cm-table-td" onClick={handleUserRoleOpen}>
            {row.role?.name} <KeyboardArrowDownIcon />
          </Button>
        </>
      ),
    },
  ];
  const getUserRole = () => {
    AxiosMain.get("/add-role/", config).then((res) => {
      if (res.status === 200 && res.data.count > 0) {
        setUserRole(res.data.results);
      }
    }).catch((e) => {
      console.log("Error ", e);
    })
  }
  useEffect(() => {
    if (userRole.length === 0) {
      getUserRole();
    }
    // eslint-disable-next-line
  }, []);
  const userModalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const UserDataTaleComponent = () => (
    <>
      {
        isLoading ? (
          <LoaderScreen />
        ) : (
          <>
              <Modal
        open={openUserRoleModal}
        onClose={handleUserRoleClose}
        aria-labelledby="Modal-User-Role"
        aria-describedby="Modal-User-Role"
      >
        <Box sx={userModalstyle}>
          <h2>Update Role</h2>
          <form>
            <FormControl sx={{ width: "100%" }}>
              <Select
                className="form-select-pad"
                id="form_mobile_product"
                name="form_mobile_product"
                label=""
                value="one">
                <MenuItem value="">Choose Option</MenuItem>
                {userRole.length > 0 && (
                  userRole.map((val: any) => (
                    <MenuItem value={val.id} key={`user-role-${val.id}`}>{val.name}</MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </form>
        </Box>
      </Modal>
      <div className="text-right">
                {/* <Button
          variant="contained"
          endIcon={<AddIcon />}
          className="cm-btn-style"
          onClick={() => setCustomTabs(2)}
          sx={{
            color: colorConfigs.btnStyle.color,
            background: colorConfigs.btnColor.bgColorGreen,
            "&: hover": {
              color: colorConfigs.btnColor.colorGreen,
              background: colorConfigs.btnColor.hoverbgWhite,
            },
          }}
        >
          {t("AddUser")}
        </Button> */}
      </div>
              <div className="cm-userData-table">
                <DataTableComponent
            isWithBG={false}
            tRow={UserRow}
            tData={getAllUsers}
            isRounded={true}

                />
      </div>
            </>
      )
    }
      
    </>
  );

  return (
    <div className="cm-user-main">
      {customTabs === 0 && <UserDataTaleComponent />}
      {customTabs === 1 && (
        <CustomTabsComponent setCustomTabs={setCustomTabs} row={selectUser} />
      )}
      {/* {customTabs === 2 && (
        <AddUser setCustomTabs={setCustomTabs} />
      )} */}
    </div>
  );
};

export default Users;
