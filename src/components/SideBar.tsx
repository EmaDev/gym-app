import { useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import 'animate.css';
import { CgMenu } from 'react-icons/cg';
import userImg from "../assets/user.png";
import { buscarUsuarioEnStorage } from '../helpers';
import { Usuario } from '../interfaces/Usuario';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

const Seccion = styled.section`
   .ocultar{
    left: -240px;
   }
   .ocultarBg{
    display:none;
    transition: .2s ease all;
   }
`;
const Background = styled.div`
   position: absolute;
   width:100%;
   min-height: 100vh;
   top: 0;
   left: 0;
   background: rgba(0,0,0,0.4);
   overflow: hidden;
`;
const Nav = styled.ul`
  position:fixed;
  left:0;
  top:0;
  width: 230px;
  height: 100vh;
  background: pink;
  z-index: 999;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.3);
  transition: .6s ease all;
  padding-top: 5rem;
`;
const DivFlex = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    img{
        width: 50px;
        heigth: 50px;
        border-radius: 50%;
       }
`;
const Li = styled.li`
  padding: 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.3);
  a, p{
    color: #fff;
    font-weight: 700;
    margin:0;
  }
`;
export const SideBar = () => {

    const [usuarioActivo, setUsuarioActivo] = useState<Usuario>({} as Usuario);
    useEffect( () => {
        const {ok, usuario} = buscarUsuarioEnStorage();
        if(ok){
            setUsuarioActivo(usuario);
        }
    },[location.href]);
    const navRef: any = useRef(null);
    const bgRef: any = useRef(null);

    const ocultarMostarNav = () => {
        if (navRef.current.classList.contains("ocultar")) {
            navRef.current.classList.remove('ocultar');
            bgRef.current.classList.remove('ocultarBg');
        } else {
            navRef.current.classList.add('ocultar');
            bgRef.current.classList.add('ocultarBg');
        }
    }

    const navegarACambiarUsuario = () => {
        localStorage.removeItem('usuario-activo');
        location.reload();
    }

    const mostrarDatosUsuario = () => {
        return Swal.fire({
            title: usuarioActivo.nombre,
            imageUrl: usuarioActivo.img || userImg,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
    }
    return (
        <Seccion >
            <Background ref={bgRef} onClick={ocultarMostarNav} className='ocultarBg' />
            <Nav ref={navRef} className='ocultar'>
                <Li>
                    <NavLink to={`/`}>Inicio</NavLink>
                </Li>
                <Li>
                    <NavLink to={`/configuracion`}>Configuracion</NavLink>
                </Li>
                <Li>
                    <NavLink to={`/crear-ejercicio/0`}>Crear ejercicio</NavLink>
                </Li>
                <Li>
                    <p onClick={navegarACambiarUsuario}>Cambiar de usuario</p>
                </Li>
            </Nav>
            <DivFlex>
                <CgMenu size={"2.8rem"} onClick={ocultarMostarNav} />
                <img src={ usuarioActivo.img || userImg} onClick={mostrarDatosUsuario}/>
            </DivFlex>
        </Seccion>
    )
}
