import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import userImg from "../assets/user.png";
import { getListaDeUsuarios } from '../firebase/queries';
import { Usuario } from '../interfaces/Usuario';
import { guardarUsuarioEnStorage } from '../helpers';

const Contenedor = styled.section`
   display:flex;
   flex-direction: column;
   justify-content:center;
   align-items:center;
   margin:auto;
   h2{
    margin: 2rem;
    paddin-top: 5rem;
   }
`;
const UsuarioItem = styled.div`
  align-items:center;
  margin: 1rem 0;
  img{
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: pink;
  }
  p{
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    text-align:center;
  }
`

interface Props {
  setUsuario: (u: Usuario) => void;
}

export const SeleccionUsuario = ({setUsuario}: Props) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const getData = async () => {
      const { ok, data } = await getListaDeUsuarios();
      if (ok) {
        setUsuarios(data);
      }
    }
    getData();
  }, []);

  const handleSeleccionarUsuario = (u:Usuario) => {
    setUsuario(u);
    guardarUsuarioEnStorage(u)
  }
  return (
    <Contenedor>
      <h2>Seleccionar usuario</h2>

      {usuarios.map(u => (
        <UsuarioItem key={u.uid} onClick={() => handleSeleccionarUsuario(u)}>
          <img src={u.img != "" ? u.img : userImg} />
          <p>{u.nombre}</p>
        </UsuarioItem>
      ))}
    </Contenedor>
  )
}
