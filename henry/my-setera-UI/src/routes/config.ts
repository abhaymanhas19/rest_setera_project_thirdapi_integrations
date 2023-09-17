import { ReactNode } from "react";

export type RouteType = {
  element: ReactNode,
  state: string,
  index?: boolean,
  path?: string,
  child?: RouteType[],
  isChild?:boolean,
  isShownChild?: boolean,
  parent?:string,
  customtitle?: string,
  isThisShow?: boolean,
  sidebarProps?: {
    displayText: string,
    icon?: ReactNode;
  };
};