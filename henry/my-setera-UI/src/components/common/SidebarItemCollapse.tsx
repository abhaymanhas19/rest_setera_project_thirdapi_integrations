import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
import { RouteType } from "../../routes/config";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SidebarItemList from "./SidebarItemList";
import { useTranslation } from 'react-i18next';


type Props = {
  item: RouteType;
  hideSidebar: Function;
};

const SidebarItemCollapse = ({ item, hideSidebar }: Props) => {
  const [open, setOpen] = useState(false);
  const [parentMenu, setParentMenu] = useState(false);
  const { t } = useTranslation();
  const [sideBarText, setSideBarText] = useState('');
  const { appState, appCountry } = useSelector((state: RootState) => state.appState);

  useEffect(() => {
    if (appState.includes(item.state)) {
      setOpen(true);
    }
    const displayText: any = item.sidebarProps?.displayText.replace(/ /g, '');
    const tempText = t(`sidebar_${displayText}`);
    setSideBarText(tempText);
    // eslint-disable-next-line
  }, [appState, item, appCountry]);
  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          className={parentMenu ? "active-page" : "no-active"}
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: "transparent"
            },
            paddingY: "30px",
            paddingX: "24px"
          }}
        >

          <ListItemIcon className={`cm-menu-ics ${item.sidebarProps.icon ? "cm-icn-y" : "cm-icn-n"}`} sx={{
            color: colorConfigs.sidebar.color
          }}>
            {item.sidebarProps.icon && item.sidebarProps.icon}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={sideBarText}
          />
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List className={open ? "sub-pages" : "sub-pages-2"}>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} hideSidebar={hideSidebar} />
                ) : route.isThisShow === undefined && (
                  <SidebarItemList item={route} key={index} hideSidebar={hideSidebar} setParentMenu={setParentMenu} parentMenu={parentMenu} />
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;