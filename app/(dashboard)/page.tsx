"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { Dashboard } from "@/components/SettingsDashboard";
import { DashboardMain } from "@/components/MainDashboard";
import { useEffect, useState } from "react";
import { getData, setUpUser } from "@/appwrite/user";

export default function Home() {
  const {user, isLoaded}  = useUser();
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    if(!isLoaded) return;
    if(!user) return;
    setUpUser(user.id);
    let data = getData(user.id);
    setUserdata(data);
    console.log(data)
  },[user])
  return (
    <DashboardMain/>
  );
}
