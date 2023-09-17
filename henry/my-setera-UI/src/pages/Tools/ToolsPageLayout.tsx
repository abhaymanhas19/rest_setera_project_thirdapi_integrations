import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const ToolsPageLayout = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default ToolsPageLayout;
