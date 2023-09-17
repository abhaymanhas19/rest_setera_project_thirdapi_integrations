import { Drawer, List, Stack, Toolbar } from "@mui/material";
import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { removeAuthState } from "../../redux/features/authStateSlice";
import { resetOrderSale } from "../../redux/features/orderSaleStateSlice";
import { resetUserState } from "../../redux/features/usersStateSlice";
import { resetTrafficState } from "../../redux/features/trafficStateSlice";
import { resetTaskState } from "../../redux/features/tasksStateSlice";
import { resetSupportState } from "../../redux/features/supportStateSlice";
import { resetSubsriptionState } from "../../redux/features/subscriptionStateSlice";
import { resetSipTrucksState } from "../../redux/features/sipTunksStateSlice";
import { removeorganizationState } from "../../redux/features/organizationStateSlice";
import { resetMobileUserState } from "../../redux/features/mobileUserStateSlice";
import { removeMessageState } from "../../redux/features/messagesStateSlice";
import { resetLicenceState } from "../../redux/features/licenceStateSlice";
import { resetDataConnectionState } from "../../redux/features/dataConnectionStateSlice";
import { resetAppState } from "../../redux/features/appStateSlice";
import { useTranslation } from 'react-i18next';
import Swal from "sweetalert2";

const Sidebar = (props: any) => {

  const { container, mobileOpen, handleDrawerToggle, drawerWidth } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = () => {
    handleDrawerToggle();
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
  }
  return (
    <>
      {mobileOpen ? <CancelIcon className="cm-mobile-close" onClick={handleDrawerToggle} /> : ""}
      <Drawer
        className="cm-mobile-sidebar-menu"
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color,
          },
        }}
      >
        <List disablePadding className="cm-left-sidebar">
          <Toolbar sx={{ marginBottom: "20px" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center"
            >
              <img src={assets.images.logo} width={170} height={55} alt="Setera Clould Communication" />
            </Stack>
          </Toolbar>
          {appRoutes.map((route, index) => (
            route.sidebarProps ? (
              route.child ? (
                route.isShownChild ? (
                  <SidebarItemCollapse item={route} key={index} hideSidebar={handleDrawerToggle} />
                ) : (
                  <SidebarItem item={route} key={index} hideSidebar={handleDrawerToggle} />
                )
              ) : (
                <SidebarItem item={route} key={index} hideSidebar={handleDrawerToggle} />
              )
            ) : null
          ))}
          <Button startIcon={<LogoutIcon className="cm-menu-ics" />} className="cm-sidebar-logout-btn" onClick={() => userLogout()} sx={{
            "&: hover": {
              backgroundColor: "transparent"
            },
            color: colorConfigs.sidebar.colorWT,
            paddingY: "30px",
            paddingX: "24px"
          }}>
            {t('logout')}
          </Button>
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        className="cm-left-scrollbar"
        sx={{
          display: { xs: 'none', md: 'block' },
          flexShrink: 0,
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "0px",
            backgroundColor: colorConfigs.sidebar.bg,
            color: colorConfigs.sidebar.color,
          }
        }}
      >
        <List disablePadding className="cm-left-sidebar">
          <Toolbar sx={{ marginBottom: "20px" }}>
            <Stack
              sx={{ width: "100%" }}
              direction="row"
              justifyContent="center"
            >
              <img src={assets.images.logo} width={170} height={55} alt="Setera Clould Communication" />
            </Stack>
          </Toolbar>
          {appRoutes.map((route, index) => (
            route.sidebarProps ? (
              route.child ? (
                route.isShownChild ? (
                  <SidebarItemCollapse item={route} key={index} hideSidebar={handleDrawerToggle} />
                ) : (
                  <SidebarItem item={route} key={index} hideSidebar={handleDrawerToggle} />
                )
              ) : (
                <SidebarItem item={route} key={index} hideSidebar={handleDrawerToggle} />
              )
            ) : null
          ))}
          <Button startIcon={<LogoutIcon className="cm-menu-ics" />} className="cm-sidebar-logout-btn" onClick={() => userLogout()} sx={{
            "&: hover": {
              backgroundColor: "transparent"
            },
            color: colorConfigs.sidebar.colorWT,
            paddingY: "30px",
            paddingX: "24px"
          }}>
            {t('logout')}
          </Button>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;