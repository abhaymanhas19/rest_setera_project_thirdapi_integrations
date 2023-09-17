import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const MobilePageLayout = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MobilePageLayout;
