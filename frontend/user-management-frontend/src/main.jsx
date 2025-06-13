import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import PrivateRoute from './components/PrivateRoute';
import SecretPage from './pages/SecretPage.jsx'; // sadece login olanlara özel

const router = createBrowserRouter([
{
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
   {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/secret',
    element: (
      <PrivateRoute>
        <SecretPage />
      </PrivateRoute>
    ),
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
