import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';
import ErrorPage from './routes/ErrorPage';
import TuRutina from './routes/TuRutina';
import { CrearEjercicio } from './routes/CrearEjercicio';

const router = createHashRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tu-rutina",
    element: <TuRutina/>,
  },
  {
    path: "/crear-ejercicio/:idEjer",
    element: <CrearEjercicio/>,
  },
  {
    path: "/cambiar-usuario",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
