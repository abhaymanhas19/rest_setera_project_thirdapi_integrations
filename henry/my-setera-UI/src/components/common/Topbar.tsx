import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Autocomplete,
  TextField,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
//import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/store";
import ReactFlagsSelect from "react-flags-select";
import React, { useEffect, useRef, useState, useMemo } from "react";

import { useTranslation } from "react-i18next";
import AxiosMain from "../../components/layout/AxiosMain";
import Swal from "sweetalert2";
import { resetOrderSale } from "../../redux/features/orderSaleStateSlice";
import { resetUserState } from "../../redux/features/usersStateSlice";
import { resetTrafficState } from "../../redux/features/trafficStateSlice";
import { resetTaskState } from "../../redux/features/tasksStateSlice";
import { resetSupportState } from "../../redux/features/supportStateSlice";
import { resetSubsriptionState } from "../../redux/features/subscriptionStateSlice";
import { resetSipTrucksState } from "../../redux/features/sipTunksStateSlice";
import { removeorganizationState, setorganizationState } from "../../redux/features/organizationStateSlice";
import { resetMobileUserState } from "../../redux/features/mobileUserStateSlice";
import { removeMessageState } from "../../redux/features/messagesStateSlice";
import { resetLicenceState } from "../../redux/features/licenceStateSlice";
import { resetDataConnectionState } from "../../redux/features/dataConnectionStateSlice";
import { removeAuthState, setUserInfo, setUserState } from "../../redux/features/authStateSlice";
import { resetAppState, setAppCountry, setAppOrg } from "../../redux/features/appStateSlice";
import { json } from "stream/consumers";
import OrganisationDropDown from "../layout/OrganisationDropDown";

const Topbar = (props: any) => {
  const { drawerWidth, handleDrawerToggle } = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [countrySelected, setCountrySelected] = useState("GB");
  const countries = ["GB", "ES", "IT", "FI"];
  const countriesLable = Object({
    GB: { primary: "English" },
    ES: { primary: "España" },
    IT: { primary: "Italia" },
    FI: { primary: "Suomi" },
  });
  const [sideBarText, setSideBarText] = useState("");
  const [userName, setUserName] = useState("");
  const { appState } = useSelector((state: RootState) => state.appState);
  const appTitle = useSelector((state: RootState) => state.appState.appTitle);
  const userDetails = useSelector((state: RootState) => state.authState.userState);
  // const [isadminShowOrg, setIsAdminShowOrg] = useState(false);
  // const menurganization = useSelector((state: RootState) => state.organisation.organizationState);
  // const [isAllOrg, setAllOrg] = useState(false);
  // const [organizationPage, setOrganizationPage] = useState(1);
  // const [lastAutocompleteVal, setLastAutoCompleteVal] = useState("");
  // const [searchOrg, setSearchOrg] = useState("");
  // const allState = useSelector((state: RootState) => state);
  // console.log(allState);
  const appCountry = useSelector(
    (state: RootState) => state.appState.appCountry
  );
  const checkUser = useSelector(
    (state: RootState) => state.authState.authState
  );
  const orgnisationData = useSelector((state: RootState) => state.appState.appOrg);
  const [anchorElProfile, setAnchorElProfile] =
    React.useState<null | HTMLElement>(null);
  //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openProfile = Boolean(anchorElProfile);
  //const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const handleClickProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorElProfile(null);
  };

  const userLogout = () => {
    const formSwalLogout = {
      formSwalText: t('yousurewanttologout'),
      fomrSwalCancel: t('Cancel'),
      formSwalSaved: t('logout'),
      formSwalDataSaved: t('YourDatahasbeensaved'),
      formSwalSubmited: t('Submited')
    }
    Swal.fire({
      text: formSwalLogout.formSwalText,
      icon: 'warning',
      cancelButtonText: formSwalLogout.fomrSwalCancel,
      showCancelButton: true,
      confirmButtonColor: '#103256',
      cancelButtonColor: '#d33',
      confirmButtonText: formSwalLogout.formSwalSaved,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetAppState());
        dispatch(resetDataConnectionState());
        dispatch(resetLicenceState());
        dispatch(removeMessageState());
        dispatch(resetMobileUserState());
        dispatch(removeorganizationState());
        dispatch(resetSipTrucksState());
        dispatch(resetSubsriptionState());
        dispatch(resetSupportState());
        dispatch(resetTaskState());
        dispatch(resetTrafficState());
        dispatch(resetUserState());
        dispatch(resetOrderSale());
        dispatch(removeAuthState());
        localStorage.clear();
        navigate("/");
      }
    })

  };
  useEffect(() => {
    const newCode: any = appCountry;
    if (appCountry !== countrySelected) {
      setCountrySelected(newCode);
    }
    i18n.changeLanguage(newCode.toLocaleLowerCase());
    //console.log(newCode.toLocaleLowerCase());
    // eslint-disable-next-line
  }, [appCountry]);


  useEffect(() => {
    let displayText;
    if (appTitle === "Home") {
      displayText = appTitle;
    } else {
      displayText = appTitle.replace(/ /g, "");
    }
    const tempText = t(`sidebar_${displayText}`);
    setSideBarText(tempText);
    // eslint-disable-next-line
  }, [appState, appCountry, sideBarText]);
  // const getUniqueArray = (arr: any, index: any) => {

  //   const unique = arr
  //     .map((e: any) => e[index])

  //     // store the keys of the unique objects
  //     .map((e: any, i: any, final: any) => final.indexOf(e) === i && i)

  //     // eliminate the dead keys & store unique objects
  //     .filter((e: any) => arr[e]).map((e: any) => arr[e]);

  //   return unique;
  // }

  // const getOrganisatioin = async (page: number) => {
  //   let formSwalTranslation = {
  //     formSwalTitle: t("SomethingWentWrong"),
  //     formSwalText: t("CheckYourLoginsDetailsInternet"),
  //     formSwalErrorText: t("Unabletogetorganization")
  //   };
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": `Bearer ${checkUser.access}`,
  //     },
  //   }
  //   AxiosMain.get(`/organization/organization/?ordering=name&page=${page}`, config).then((val) => {
  //     //console.log("All organisation Data ", val.data.results);
  //     if (val.data.results.length > 0) {
  //       if (page === 1) {
  //         const orgData = val.data.results;
  //         const sortingOrganization = [...orgData].sort((a: any, b: any) =>
  //           a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
  //         );
  //         //console.log("sortingOrganization", sortingOrganization);
  //         dispatch(setorganizationState(sortingOrganization));
  //       } else {
  //         const orgData = [...val.data.results, ...menurganization];
  //         const sortingArray = getUniqueArray(orgData, "id");
  //         const sortingOrganization = [...sortingArray].sort((a: any, b: any) =>
  //           a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
  //         );
  //         if (val.data.results.length === 10) {
  //           setOrganizationPage(page);
  //         }
  //         if (menurganization.length !== val.data.count) {
  //           dispatch(setorganizationState(sortingOrganization));
  //         }
  //       }
  //       if (menurganization.length === val.data.count) {
  //         setAllOrg(true);
  //       }
  //     }
  //   }).catch((e) => {
  //     Swal.fire({
  //       title: formSwalTranslation.formSwalTitle,
  //       text: formSwalTranslation.formSwalErrorText,
  //       icon: 'warning',
  //     })
  //   });
  // }
  // useEffect(() => {
  //   if (Object.keys(checkUser).length > 0) {
  //     if (menurganization.length === 0 && Object.keys(checkUser).length > 0) {
  //       getOrganisatioin(organizationPage);
  //     }
  //     if (checkUser.user.user_type === 'CustomerAdmin') {
  //       if (menurganization.length > 0 && Object.keys(orgnisationData).length === 0) {
  //         setOrganisation(menurganization[0]);
  //       }
  //     } else {
  //       if (menurganization.length > 0 && Object.keys(orgnisationData).length > 0) {
  //         setIsAdminShowOrg(true);
  //       }
  //       else if (menurganization.length > 0 && Object.keys(orgnisationData).length === 0) {
  //         setOrganisation(menurganization[0]);
  //       }
  //       //setIsAdminShowOrg(true);
  //     }
  //   }
  //   // eslint-disable-next-line
  // }, [menurganization, orgnisationData])
  const getUserData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${checkUser.access}`,
      },
    }
    AxiosMain.get(`/users/${checkUser.user.user_id}/`, config).then((res) => {
      console.log("Response ", res);
      if (res.status === 200) {
        dispatch(setUserState(res.data));
      }
    }).catch((e) => {
      console.log("Error While getting User Detils ", e.response);
    })
  }
  useEffect(() => {
    if (Object.keys(userDetails).length === 0 && Object.keys(checkUser).length > 0) {
      getUserData();
    }
    if (Object.keys(userDetails).length > 0) {
      setUserName(userDetails.first_name?.slice(0, 2));
    }
    // eslint-disable-next-line
  }, [userDetails, checkUser]);
  // const setOrganisation = (value: any) => {
  //   if (value !== null) {
  //     dispatch(setAppOrg(value));
  //   } else {
  //     dispatch(setAppOrg(""));
  //   }
  // }
  // const loadMoreOrganizations = () => {
  //   if (!isAllOrg) {
  //     const nextPage = organizationPage + 1;
  //     getOrganisatioin(nextPage);
  //   } 
  // }
  // const organizationHandleScroll = (event: any) => {
  //   const listboxNode = event.currentTarget;

  //   const position = listboxNode.scrollTop + listboxNode.clientHeight;
  //   //console.log("position", position, listboxNode.scrollHeight - position <= 1);
  //   // if (listboxNode.scrollHeight - position <= 1) {
  //   //   loadMoreOrganizations();
  //   // }
  // };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        boxShadow: "unset",
        backgroundColor: colorConfigs.sidebar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar className="cm-topbar-wrap">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ fontWeight: "600" }}>{appTitle ? sideBarText : appState ? sideBarText : "No"} </Box>
          </Box>

          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={4}
            >
              <OrganisationDropDown />
              {/* {
                isadminShowOrg ? (
                  <Autocomplete
                    className="cm-org-list-name"
                    id="organisation-select-demo"
                    noOptionsText={<Button sx={{ m: '16px', width: 'calc(100% - 32px)', display: "block" }} variant="outlined" size="small" onClick={() => console.log("Hello Search ORG")}>search</Button>}
                    value={Object.keys(orgnisationData).length > 0 ? orgnisationData : menurganization[0]}
                    onChange={(event, newValue) => { setOrganisation(newValue) }}
                    onClose={() => {
                      setLastAutoCompleteVal("");
                    }}
                    sx={{ width: 300 }}
                    options={menurganization}
                    autoHighlight
                    isOptionEqualToValue={(option: any, value: any) => {
                      return option.id === value.id;
                    }}
                    //freeSolo
                    getOptionLabel={(option: any) => option.name}
                    renderOption={(props, option: any) => {
                      setTimeout(() => {
                        const optionEl = document.querySelector(
                          `[data-name="${lastAutocompleteVal}"]`
                        );
                        optionEl?.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                      const nameMatch = menurganization[menurganization.length - 1].name;

                      if (nameMatch === option.name && menurganization.length >= 10) {
                        return (
                          <React.Fragment key={`${option.name}`} >
                          <Box data-name={option.name} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                              <span className="cm-org-list-name">{option.name}</span>
                          </Box>
                          <Button sx={{ m: '16px', width: 'calc(100% - 32px)', display: "block" }} variant="outlined" size="small" onClick={() => {
                            loadMoreOrganizations();
                            if (menurganization.length >= 20) {
                              setLastAutoCompleteVal(menurganization[menurganization.length - 10].name);
                            }
                          }}>Load More</Button>
                          </React.Fragment>
                        )
                      }
                      return (<Box data-name={option.name} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} >
                        <span className="cm-org-list-name">{option.name}</span>
                      </Box>);
                    }}
                    renderInput={(params) => {
                      return ((
                        <TextField
                          className="cm-org-list-name"
                          {...params}
                          label={t("Organisation")}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                          }}
                        />
                      ))
                    }}
                    ListboxProps={{
                      onScroll: organizationHandleScroll
                    }}
                  />
                )
                  : (
                    <Box>{orgnisationData?.name}</Box>
                  )
              } */}
              <Box
                sx={{
                  display: { xs: "flex", sm: "flex" },
                  margin: { xs: "0 10px !important" },
                }}
              >
                <ReactFlagsSelect
                  className="cm-logged-in-fleg-select"
                  selected={countrySelected}
                  showSelectedLabel={false}
                  countries={countries}
                  customLabels={countriesLable}
                  onSelect={(code) => dispatch(setAppCountry(code))}
                />
                {/* <img src={assets.images.usaFlaf} width={24} height={18} /> */}
              </Box>

              {/* <Tooltip title="open Notification">
                <Box
                  onClick={() => navigate("/notifications")}
                  sx={{ margin: { xs: "0 10px !important" } }}
                >
                  <NotificationsNoneIcon />
                </Box>
              </Tooltip> */}

              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleClickProfile}
                  aria-controls={openProfile ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openProfile ? "true" : undefined}
                  sx={{ p: 0, margin: { xs: "0 10px !important" } }}
                >
                  <Avatar sx={{ bgcolor: "#103256" }}>{userName.length > 0 ? userName : ""}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElProfile}
                id="account-menu"
                open={openProfile}
                onClose={handleCloseProfile}
                onClick={handleCloseProfile}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar /> {t("Profile")}
                </MenuItem>
                <MenuItem onClick={() => userLogout()}>
                  <Logout />
                  {t("logout")}
                </MenuItem>
              </Menu>
            </Stack>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
