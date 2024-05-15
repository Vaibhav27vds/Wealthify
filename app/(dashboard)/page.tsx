import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton} from "@clerk/nextjs";
import { Dashboard } from "@/components/SettingsDashboard";
import { DashboardMain } from "@/components/MainDashboard";


export default function Home() {
  return (
    <DashboardMain/>
  );
}
