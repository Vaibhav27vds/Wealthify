import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { Dashboard } from "@/components/dashboardOne";
import { DashboardMain } from "@/components/dashboardMain";

export default function Home() {
  return (
    <DashboardMain />
  );
}
