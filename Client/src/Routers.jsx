
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App';
import Navbar from './Report_repair/Navbar';
import Index from './Report_repair/Index';
import Profile from './Report_repair/Profile';
import Technician from './Report_repair/Technician';
import Computer from './Report_repair/Computer';
import TicketNumber from './Report_repair/TicketNumber';
import Createticket from './Report_repair/Createticket';
import Menu_st from './Settings/Menu_st';

export default function Routers() {


    return (
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/index" element={<Index />} />
            <Route path="/Technician" element={<Technician/>} />
            <Route path="/Technician/:id" element={<TicketNumber />} />
            <Route path="/computer" element={<Computer/>} />
            <Route path="/createticket" element={<Createticket/>} />
            <Route path="/settings" element={ <Menu_st/>} />

          </Routes>
        </BrowserRouter>
      );

} 


