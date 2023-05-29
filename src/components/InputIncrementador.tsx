import styled from "styled-components";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";

const Contenedor = styled.div`
  padding: .2rem;
  background: #edb4be;
  display: inline-block;
  border-radius: 4px;
  box-shadow: 2px 2px 2px #e1e1e1;
  border: 1px solid #e1e1e1;
  div{
    display:flex;
    align-items: center;
    justify-content:center;
    gap: .5rem;
  }
`;
const Boton = styled.button`
   font-size: 1.8rem;
   padding: .2rem 1rem; 
   background: pink;
   border-style:none;
   border-radius: 4px;
   display:flex;
   align-items:center;
   color: #fff;
`;
const Input = styled.input`
   padding: .5rem;
   font-size: 1.4rem;
   max-width: 40px; 
   border-style:none;
   border-radius: 4px;
   text-align:center;
`;
interface Props {
    nombre: string;
    value: number;
    cambiarValor: (nombre: string, sumar: boolean) => void;
}
export const InputIncrementador = ({ value, nombre, cambiarValor}: Props) => {
    return (
        <Contenedor>
            <div>
                <Boton onClick={() => cambiarValor(nombre, false)}><HiMinusSm /></Boton>
                <Input value={value} />
                <Boton onClick={() => cambiarValor(nombre, true)}><HiPlusSm /></Boton>
            </div>
        </Contenedor>
    )
}
