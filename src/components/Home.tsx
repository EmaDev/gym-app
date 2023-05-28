import { useEffect, useState } from 'react';
import { BsArrowRight } from "react-icons/bs";
import styled from "styled-components";
import { EjercicioItem } from './EjercicioItem';
import { EjercicioContextProvider } from '../context/EjercicioActivoContext';
import { ModalEjercicio } from './ModalEjercicio';
import { getEjerciciosPorUsuario } from '../firebase/queries';
import { EjercicioInterface } from '../interfaces/Ejercicio';
import Swal from 'sweetalert2';
import { buscarUsuarioEnStorage, formatDate } from '../helpers';
import { Usuario } from '../interfaces/Usuario';

const DivFlex = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:1rem 0;
`;
const Header = styled.header`
   img{
    width: 50px;
    heigth: 50px;
    border-radius: 50%;
   }
   h2{
    font-size: 2.8rem;
    margin: 1rem;
    text-align:left;
   }
   p{
    text-align:left;
    margin: -1rem 1rem 2rem 1rem;
    font-size: 1.4rem;
   }
`;

const Titulo = styled.h2`
   font-size: 1.6rem;
   margin:0 1rem;
`;

export const Home = () => {

    const [ejercicios, setEjercicios] = useState<EjercicioInterface[]>([]);
    const [usuarioActivo, setUsuarioActivo] = useState<Usuario>({} as Usuario);

    useEffect( () => {
        const {ok, usuario} = buscarUsuarioEnStorage();
        if(ok){
            setUsuarioActivo(usuario);
        }
    },[]);
    useEffect(() => {
        const getData = async () => {
            const { ok, data } = await getEjerciciosPorUsuario(new Date().getDay());
            if (!ok) return Swal.fire({
                icon: "error",
                title: "Ocurrio un error al buscar los ejercicios"
            });
            setEjercicios(data);
        }
        getData();
    },[])

    return (
        <>
            <Header>
                <h2>Hola {usuarioActivo.nombre}</h2>
                <p>{`${usuarioActivo.genero == "FEMENINO" ? "Lista" : "Listo"} para el ${formatDate(new Date(), true)}?`}</p>
            </Header>
            <DivFlex style={{borderBottom: "3px solid pink"}}>
                <Titulo>Tu entrenamiento</Titulo>
                <a href='/tu-rutina'><BsArrowRight size={"2.2rem"} color={"black"} style={{ margin: "0 1rem" }}/></a>
            </DivFlex>
            <EjercicioContextProvider>
                <ModalEjercicio />
                {
                    ejercicios.map(ejer => (
                        <EjercicioItem key={ejer.id} data={ejer}/>
                    ))
                }
            </EjercicioContextProvider>
        </>
    )
}
