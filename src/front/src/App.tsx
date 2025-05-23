import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/header'
import SidePannel from './components/SidePannel'
import MainPage from './pages/MainPage'
import { useState } from 'react';
import CreatePage from './pages/CreatePage';
import RoutinesPage from './pages/RoutinesPage';
import HistoricPage from './pages/HistoricPage';
import GroupsPage from './pages/GroupsPage';

export const Pannels = {
  CREATE: '',
  ROUTINES: 'routines',
  HISTORIC: 'historic',
  GROUPS: 'groups',
} as const;

export function App() {

  const [activePannel, setActivePannel] = useState(Pannels.CREATE as string);


  return (
    <>
      <div className='h-screen overflow-hidden'>
        {/* header */}
        <Header />
        {/* side pannel */}
        <div className='flex flex-row h-[calc(100vh-4rem)]'>
          {/* main content */}
          <BrowserRouter basename='/' >
            <SidePannel activePannel={activePannel} setActivePannel={setActivePannel} />
            <main className='flex-1 bg-[#F5F5F5] '>
              <Routes  >
                <Route path="/" index element={<CreatePage />} />
                <Route path="/routines" element={<RoutinesPage text="routines" />} />
                <Route path="/historic" element={<HistoricPage />} />
                <Route path="/groups" element={<GroupsPage />} />
              </Routes>
            </main>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}


