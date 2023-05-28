import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { SideBar } from './components/SideBar';
import App from './App';
import ErrorPage from './routes/ErrorPage';
import TuRutina from './routes/TuRutina';
import { CrearEjercicio } from './routes/CrearEjercicio';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "tu-rutina",
    element: <TuRutina/>,
  },
  {
    path: "crear-ejercicio",
    element: <CrearEjercicio/>,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <SideBar/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
