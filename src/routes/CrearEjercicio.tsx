import { useParams } from 'react-router-dom';
import { NuevoEjercicio } from '../components/NuevoEjercicio';

export const CrearEjercicio = () => {

  const {idEjer} = useParams();

  return (
    <NuevoEjercicio ejerId={idEjer || ""} edita={(idEjer && idEjer != "0") ? true : false}/>
  )
}
