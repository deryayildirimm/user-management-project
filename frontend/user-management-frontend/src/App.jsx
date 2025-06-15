import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';


function App() {
  

  return (
    <>
      <Navbar/>
      <main className="main-content">
      <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Kullanıcı Yönetim Sistemi</p>
      </footer>
    </>
  
  )
}

export default App;
