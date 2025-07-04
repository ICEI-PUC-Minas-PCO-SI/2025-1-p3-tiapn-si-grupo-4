import Header from "~/components/header";
import SidePannel from "~/components/SidePannel";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Route as r } from "../../types/app/+types/root";
import HistoricPage from "~/components/HistoricPage";
import GroupsPage from "~/components/GroupsPage";
import { isAuthenticated } from "~/services/auth";

export const Pannels = {
  CREATE: 'create',
  ROUTINES: 'routines',
  HISTORIC: 'historic',
  GROUPS: 'groups',
  USER: 'user'
} as const;

export function meta({ }: r.MetaArgs) {
  return [
    { title: "ROUTIX" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated().then((response)=>{
      console.log(activePannel);
      navigate(`/${activePannel}`);

    }).catch((ew)=>{
      navigate("/login");
    });
  }, [activePannel,navigate]);

  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div className='flex flex-row h-[calc(100vh-4rem)]'>
        <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
        <main className='flex-1 bg-[#F5F5F5]'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
