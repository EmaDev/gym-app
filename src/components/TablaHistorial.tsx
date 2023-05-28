import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { EjercioUsuarioInterface, ResultadosSerieInterface } from '../interfaces/Ejercicio';
import { AiFillEye } from 'react-icons/ai';
import { getEjercioDeUnUsuarioPorDia } from '../firebase/queries';
import Swal from 'sweetalert2';

const Table = styled.table`
   width: 100%;
   padding: .3rem;
   background-color: #ffe2e7;
   margin: 1rem auto;
   border-radius: 4px;

   thead{
    background-color: pink;
    padding: .5rem;
    border-radius: 6px;
    color: #fff;
   }
   tbody{
        th{
          border-bottom: 1px solid #fff;
          padding: 0;
          input{
            width: 100%;
            padding: .5rem;
            border-style:none;
            text-align: right;
            font-weight: 600;
            background: #ffe2e7;
          } 
       }
   }
`;
interface Props {
  historico: Date;
  ejerId: string;
}
export const TablaHistorial = ({historico, ejerId}: Props) => {

  const [data, setData] = useState<EjercioUsuarioInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { ok, data } = await getEjercioDeUnUsuarioPorDia(ejerId, historico);
      setIsLoading(false);
      if (ok) {
        setData(data as EjercioUsuarioInterface);
      }
    }
    getData();
  }, [historico, ejerId]);

  const mostrarObservacionRepeticion = (serie: ResultadosSerieInterface) => {
    return Swal.fire({
      title: serie.observaciones || "No hay observaciones",
      confirmButtonText: 'Cerrar',
      confirmButtonColor: "pink",
    })
  }

  if (!data || isLoading) {
    return (
      <p style={{margin: "2rem auto", textAlign: "center"}}>Cargando...</p>
    )
  }
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th style={{ fontSize: "1.4rem" }}>Repeticion</th>
            <th>Peso</th>
            <th>RPE</th>
            <th>RIR</th>
            <th style={{ fontSize: "1rem" }}>Observacion</th>
          </tr>
        </thead>
        <tbody>
          {data.resultados.map(s => (
            <tr key={s.ordenRep}>
              <th>{s.repeticiones}</th>
              <th><input value={s.peso} disabled /></th>
              <th><input value={s.rpe} disabled /></th>
              <th><input value={s.rir} disabled /></th>
              <th>
                <AiFillEye onClick={() => {mostrarObservacionRepeticion(s)}} />
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
      <label style={{ fontWeight: "600", display: "flex", margin: "1rem" }}>Observaciones</label>
      <textarea disabled style={{ width: "95%", margin: "auto 1rem", minHeight: "100px" }} value={data.observaciones}/>
    </>
  )
}