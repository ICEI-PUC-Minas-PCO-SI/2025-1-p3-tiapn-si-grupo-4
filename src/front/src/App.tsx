import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './components/header'
import SidePannel from './components/SidePannel'
import { useState } from 'react';
import CreatePage from './pages/CreatePage';
import RoutinesPage from './pages/RoutinesPage';
import HistoricPage from './pages/HistoricPage';
import GroupsPage from './pages/GroupsPage';
import LoginPage from './pages/Login/LoginPage';
import SignUp from './pages/SignupPage';

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
        
        <Header />
        <div className='flex flex-row h-[calc(100vh-4rem)]'>
          <BrowserRouter basename='/app' >
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
          <BrowserRouter basename="/signup">
            <Route path="/" element={<SignUp />}/>
          </BrowserRouter>
          <BrowserRouter basename='/login'>
            <Routes>
              <Route path="/" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </>
  )
}