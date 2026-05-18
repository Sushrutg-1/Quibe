import DashboardLayout from "@/layout/DashboardLaout";
import UserLayout from "@/layout/UserLayout/UserLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../config/redux/action/authAction";

export default function Discover() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("rendering 1");
    dispatch(getAllUsers());
    console.log("rendering 2");
  }, []);

  return (
    <UserLayout>
      <DashboardLayout>
        <div>discover</div>
        <div>{authState.message}</div>
      </DashboardLayout>
    </UserLayout>
  );
}
