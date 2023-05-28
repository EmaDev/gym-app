import {useState, useEffect} from "react";
import { Home } from './components/Home';
import { buscarUsuarioEnStorage } from "./helpers";
import { SeleccionUsuario } from "./routes/SeleccionUsuario";
import { Usuario } from "./interfaces/Usuario";

function App() {
  const [usuario, setUsuario] = useState<Usuario>();

  useEffect( () => {
    const {ok, usuario} = buscarUsuarioEnStorage();
    if(ok){
      setUsuario(usuario);
    }
  },[]);

  if(!usuario){
    return (<SeleccionUsuario setUsuario={setUsuario}/>)
  }
  return (
      <Home />
  )
}

export default App
