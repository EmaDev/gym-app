import {useContext, useState, useEffect} from 'react';
import { styled } from 'styled-components';
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { EjercicioInterface} from '../interfaces/Ejercicio';
import { EjercicioContext } from '../context/EjercicioActivoContext';
import { getEjercioDeHoy } from '../firebase/queries';

const Card = styled.div`
   margin: 1rem auto;
   padding: .7rem;
   border-radius: 8px;
   border: 1px solid #e1e1e1;
   box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
   display: grid;
   grid-template-columns: 70% 30%;
   div{
    display:flex;
    align-items:center;
    span{
        margin: 0 1rem;
    }
   }
`;

const Nombre = styled.p`
   font-weight: 700;
   margin: 1rem;
`
interface Props {
    data: EjercicioInterface;
}

export const EjercicioItem = ({ data}: Props) => {
    const {seleccionarEjercicio} = useContext(EjercicioContext);
    const [ejerComplatado, setEjerCompletado] = useState<boolean>(false);

    useEffect( () => {
        const getData = async() => {
            const resp = await getEjercioDeHoy(data.id || "");
            if(resp.ok){
                setEjerCompletado(true);
            }
        }
        getData()
    },[])

    return (
        <Card onClick={() => seleccionarEjercicio(data, ejerComplatado)}>
            <Nombre>{data.nombre}</Nombre>
            <div>
                <span>{data.cantidadSeries} reps</span>
                {ejerComplatado ?
                    <BsCheckCircleFill color={"pink"}/>
                    :
                    <BsCircle color={"pink"}/>
                }
            </div>
        </Card>
    )
}
