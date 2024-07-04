import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MiniDrawer from "../../components/drawer";

const LayoutCompnent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);
  return <MiniDrawer pages={<Outlet />} />;
};

export default LayoutCompnent;
