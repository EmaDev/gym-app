import { useState, useEffect } from "react";
import { SideBar } from "../components/SideBar";
import { EjercicioInterface } from "../interfaces/Ejercicio";
import { styled } from "styled-components";
import { getTodosLosEjerciciosDeUnUsuario } from "../firebase/queries";
import Swal from "sweetalert2";
import { DiaSemanaInterface } from "../interfaces/Semana";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
   margin: 1rem auto;
   padding: .7rem;
   border-radius: 8px;
   border: 1px solid #e1e1e1;
   box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
   display: grid;
   grid-template-columns: 60% 40%;
   div{
    display:flex;
    justify-content:end;
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
const TuRutina = () => {

  const [ejerciosCreados, setEjerciciosCreados] = useState<EjercicioInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { ok, data } = await getTodosLosEjerciciosDeUnUsuario();
      setEjerciciosCreados(data);
      if (!ok) {
        return Swal.fire({
          icon: "error",
          title: "No se pudo obtener la informacion"
        })
      }
    }
    getData();
  }, []);

  const mostrarDiasActivo = (dias: DiaSemanaInterface[]) => {
    return(
      <p style={{margin: "0 1rem", display: "flex", fontSize: "1.3rem"}}>
        {dias.map(d => (
          <span key={d.nombre} style={{margin: "0 2px", fontWeight: "700", color: (d.activo ? "pink" : "#e1e1e1") }}>{d.nombre[0]}</span>
        ))}
      </p>
    )
  }
  return (
    <div>
      <SideBar />
      <h2 style={{ textAlign: "center", margin: "2rem auto" }}>Tus ejercicios creados</h2>
      {ejerciosCreados.map(ejer => (
        <Card key={ejer.id} onClick={() => navigate(`/crear-ejercicio/${ejer.id}`)}>
          <Nombre>{ejer.nombre}</Nombre>
          <div>
            {mostrarDiasActivo(ejer.dias)}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default TuRutina;