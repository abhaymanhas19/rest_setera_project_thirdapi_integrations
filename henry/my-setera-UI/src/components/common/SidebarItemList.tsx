import React, { useEffect, useState } from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import colorConfigs from "../../configs/colorConfigs";
import { RootState } from "../../redux/store";
import { RouteType } from "../../routes/config";
import { useTranslation } from 'react-i18next';
import { setAppNextRoute, setAppPrevRoute, setAppcurrentPageForm } from "../../redux/features/appStateSlice";
type Props = {
  item: RouteType,
  hideSidebar: Function,
  setParentMenu: Function,
  parentMenu: Boolean
};

const SidebarItemList = ({ item, hideSidebar, setParentMenu, parentMenu }: Props) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const { appState, appCountry, appCurrentPageForm, appNextRoute, appPrevRoute } = useSelector((state: RootState) => state.appState);
  const { t } = useTranslation();
  const [sideBarText, setSideBarText] = useState('');
  useEffect(() => {
    if (item.sidebarProps && item.path) {
      const stringSplit = appState.split('.');
      if (appState === item.state && stringSplit[0] === item.parent) {
        setParentMenu(true);
      }
      else {
        if (stringSplit[0] !== item.parent) {
          setParentMenu(false);
        }
      }
    }
    const displayText: any = item.sidebarProps?.displayText.replace(/ /g, '');
    const tempText = t(`sidebar_${displayText}`);
    setSideBarText(tempText);
    // eslint-disable-next-line
  }, [appState, item, appCountry]);
  const appNavigate = (e: any, navigate: any) => {
    e.preventDefault();
    dispatch(setAppPrevRoute(location.pathname));
    if (appCurrentPageForm === 'no') {
      navigation(navigate);
    } else {
      dispatch(setAppNextRoute(navigate));
    }
  }
  useEffect(() => {
    if (appCurrentPageForm === "process" && appNextRoute !== appPrevRoute) {
      const nextlink = appNextRoute;
      dispatch(setAppNextRoute(""));
      dispatch(setAppcurrentPageForm("no"));
      navigation(nextlink);
    }
  }, [appNextRoute, appPrevRoute, appCurrentPageForm]);
  return (
    item.sidebarProps && item.path ? (<>
      <div onClick={() => hideSidebar()}>
        <ListItemButton
          component={Link}
          onClick={(e) => appNavigate(e, item.path)}
          to={""}
          sx={{
            "&: hover": {
              backgroundColor: "transparent"
            },
            color: colorConfigs.sidebar.colorWT,
            paddingY: "12px",
            paddingX: "24px"
          }}
        >
          <ListItemIcon className={`cm-menu-ics ${item.sidebarProps.icon ? "cm-icn-y" : "cm-icn-n"}`} sx={{
            color: colorConfigs.sidebar.color
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          {sideBarText}
        </ListItemButton>
      </div></>
    ) : null
  );
};

export default SidebarItemList;