import DashboardLayout from "@/layout/DashboardLaout";
import UserLayout from "@/layout/UserLayout/UserLayout";
import React from "react";

export default function MyConnections() {
  return (
    <UserLayout>
      <DashboardLayout>
        <div>Connections</div>
      </DashboardLayout>
    </UserLayout>
  );
}
