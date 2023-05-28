import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { IoMdCloseCircle } from "react-icons/io";
import "animate.css";
import { getEjerciosDeUnUsuario } from '../firebase/queries';
import { EjercioUsuarioInterface } from '../interfaces/Ejercicio';
import { formatDate } from '../helpers';

const Modal = styled.div`
   position: absolute;
   top: 0; right:0; left: 0; bottom:0;
   margin: auto;
   width: 100%;
   height: 100vh;
   background: rgba(0,0,0,0.6);
   display:flex;
   justify-content:center;
`;
const Contenido = styled.div`
  background: #fff;
  margin:auto;
  width: 300px;
  height: 400px;
  max-height: 450px;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.7);
  border-radius: 6px;
  text-align: center;
  overflow: auto;
  position:relative;
  animation: bounceInUp;
  animation-duration: .8s;

  h3{
    margin: 1rem auto;
  }
`;

const Item = styled.button`
  width:100%;
  border-style:none;
  border-top: 1px solid #e1e1e1;
  border-bottom: 1px solid #e1e1e1;
  margin: 0;
  padding: 1rem;
`;

interface Props {
    activo: boolean;
    ejerId:string;
    uid:string;
    ocultar: () => void;
    seleccionarHistorico: (data:Date) => void;
}
export const ModalOpcionesDias = ({ activo, uid, ejerId, ocultar, seleccionarHistorico }: Props) => {
    const [historial, setHistorial] = useState<EjercioUsuarioInterface[]>([]);

    useEffect(() => {
        const getData = async () => {
            const {data} = await getEjerciosDeUnUsuario(uid, ejerId);
            setHistorial(data);
        }
        if (activo) {
            getData();
        }
    }, [activo, ejerId]);

    const seleccionarResultadoSegunFecha = (data: EjercioUsuarioInterface) => {
        seleccionarHistorico(data.fecha);
    }

    if (!activo) {
        return <></>
    }
    return (
        <Modal>
            <Contenido>
                <h3 >Historial</h3>
                <IoMdCloseCircle onClick={ocultar}
                    style={{ position: "absolute", right: "1rem", top: "1rem" }} size={"2.5rem"} />
                {historial.map(ejer => (
                    <Item key={ejer.id} onClick={() => seleccionarResultadoSegunFecha(ejer)}>{formatDate(ejer.fecha)}</Item>
                ))}
            </Contenido>
        </Modal>
    )
}
