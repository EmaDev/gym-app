import { useContext, useEffect, useState } from 'react';
import { ResultadosSerieInterface } from '../interfaces/Ejercicio';
import { styled } from 'styled-components';
import { EjercicioContext } from '../context/EjercicioActivoContext';
import { buscarUsuarioEnStorage, formatDate } from '../helpers';
import { BsPlusCircleFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import "animate.css";
import Swal from 'sweetalert2';
import { guardarEjercicioDeUsuario } from '../firebase/queries';
import { ModalOpcionesDias } from './ModalOpcionesDias';
import { TablaHistorial } from './TablaHistorial';
import { TIType, TI_INICIAL } from '../interfaces/TecnicaIntensidad';

const Contenedor = styled.div`
   width: 100%;
   height: 100%;
   margin:auto;
   background: rgba(0,0,0,0.7);
   position:fixed;
   top:0;
   left:0;
   display: flex;
   align-items:center;
   justify-content:center;
`;
const Modal = styled.section`
   padding: 3rem 1rem;
   background-color: #fff;
   display: flex;
   flex-direction:column;
   margin: 1rem;
   border-radius: 5px;
   min-height: 80vh;

   animation: bounceInUp;
   animation-duration: .8s;

`;
const Titulo = styled.h3`
   font-size: 2.4rem;
   font-weight: 700;
   margin-bottom: 0;
`;

const DescripcionSerie = styled.p`
   margin: 1rem;
   padding: 1rem;
   border-top: 1px solid rgba(0,0,0,0.4);
   border-bottom: 1px solid rgba(0,0,0,0.4);
   font-size: 1.6rem;
   font-weight: 600;
   span{
    font-weight: 700;
   }
`;

const Table = styled.table`
   max-width: 100%;
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
          } 
          p{
            display:flex;
            align-items:center;
            justify-content:center;
            margin:0;
          }
       }
   }
`;

const Button = styled.button<any>`
   width: 50%;
   display: block;
   margin:.3rem;
   padding: 1rem 2rem;
   border-radius: 6px;
   border-style:none;
   background: ${({ activo }) => activo ? "pink" : "grey"};
   color: #fff;
   font-weight: 600;
   box-shadow: 1px 2px 4px rgba(0,0,0,0.3);
`;
const calcularColorTII = (tii: TIType): string => {
    switch (tii) {
        case "AMRAP": return "red"
        case "CLUSTERS": return "blue"
        case "DROP SET": return "green"
        case "MYO SET": return "yellow"
        case "RAMP TO MAX": return "orange"
        case "REST PAUSE": return "brown"
        case "SUPERSERIE": return "purple"
        default: return ""
    }
}
const TII = styled.div<any>`
  margin-left: .5rem;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ tii }) => calcularColorTII(tii)};
`;

interface Input {
    onChange: (e: any) => void;
    name: string;
    orden: number;
}
const Input = styled.input<Input>``

interface Props {
}
export const ModalEjercicio = ({ }: Props) => {

    const { modalVisible, ejercicio, completado, cerrarModal, setCompletado } = useContext(EjercicioContext);
    const [repeticionesResultados, setRepeticionesResultados] = useState<ResultadosSerieInterface[]>([]);
    const [observacion, setObservacion] = useState<string>("");
    const [mostrarHistorial, setMostrarHistorial] = useState<boolean>(false);
    const [historicoSeleccionado, setHistoricoSeleccionado] = useState<Date>(new Date());

    useEffect(() => {
        if (!ejercicio.series) {
            setRepeticionesResultados([]);
        } else {
            const series: ResultadosSerieInterface[] = [];
            ejercicio.series.forEach(s => {
                series.push({
                    ordenRep: s.orden,
                    peso: 0,
                    rir: 0,
                    rpe: 0,
                    repeticiones: s.repeticiones
                })
            });
            setRepeticionesResultados(series);
        }
    }, [ejercicio]);


    const rendirizarPlanEjercicio = () => {
        let desc = ejercicio.cantidadSeries + " series: ";
        ejercicio.series.forEach(serie => {
            desc += serie.repeticiones + ", ";
        });
        return desc;
    }

    const onChangeRepetecion = (orden: number, { target }: any) => {
        const repsResultados = [...repeticionesResultados];
        repsResultados[orden] = {
            ...repsResultados[orden],
            [target.name]: target.value
        }
        setRepeticionesResultados(repsResultados);
    }

    const agregarObservacionRepeticion = (orden: number) => {
        Swal.fire({
            title: 'Agregar observacion',
            input: 'textarea',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: "Cancelar",
            confirmButtonColor: "pink",
            showLoaderOnConfirm: true,
            preConfirm: (text) => {
                onChangeRepetecion(orden, { target: { name: "observaciones", value: text } })
                return true;
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `Observacion agregada`,
                })
            }
        })
    }

    const mostrarObservacionRepeticion = (orden: number) => {
        Swal.fire({
            title: repeticionesResultados[orden].observaciones,
            showDenyButton: true,
            confirmButtonText: 'Cerrar',
            denyButtonText: `Eliminar`,
            confirmButtonColor: "pink",
        }).then((result) => {
            if (result.isDenied) {
                onChangeRepetecion(orden, { target: { name: "observaciones", value: "" } })
            }
        })
    }

    const guardarEjercicio = async () => {
        const { usuario } = buscarUsuarioEnStorage();
        const { ok, msg } = await guardarEjercicioDeUsuario({
            uid: usuario.uid,
            fecha: new Date(),
            dia: new Date().getDate(),
            ejercioId: ejercicio.id || "",
            resultados: repeticionesResultados,
            observaciones: observacion
        });
        if (ok) {
            return Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: msg,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            return Swal.fire({
                icon: "error",
                title: "msg"
            })
        }
    }

    const seleccionarHistorico = (data: Date) => {
        setHistoricoSeleccionado(data);
        setMostrarHistorial(false);
        setCompletado(true);
    }

    const cerrarHistorial = () => {
        setCompletado(false);
        setHistoricoSeleccionado(new Date())
    }

    const handleCerrarModal = () => {
        cerrarHistorial();
        cerrarModal();
    }
    const mostrarCodigosColorTII = () => {
        let html = "";
        TI_INICIAL.forEach((tii, i) => {
            if (i > 0) {
                html += `<p style="color: ${tii.color}; font-size: 1.8rem; font-weight: 700;">${tii.nombre}</p>`;
            }
        })
        return Swal.fire({
            title: "Codigos color TII",
            html
        })
    }
    if (!modalVisible) {
        return <></>
    }
    return (
        <Contenedor>
            <Modal>
                <div>
                    <Titulo>{ejercicio.nombre}</Titulo>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: "600" }}>{formatDate(historicoSeleccionado)}
                            <IoIosArrowDown onClick={() => setMostrarHistorial(true)} style={{ fontSize: "2rem" }} />
                        </span>
                        {completado && <button onClick={cerrarHistorial}>Cerrar histrial</button>}
                    </div>

                    <DescripcionSerie>
                        {rendirizarPlanEjercicio()}
                    </DescripcionSerie>
                    {!completado ?
                        <>
                            <p onClick={mostrarCodigosColorTII} style={{ margin: ".5rem", fontSize: "1.2rem", fontWeight: "600", textDecoration: "underline", color: "pink" }}>Ver colores TII</p>
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
                                    {ejercicio.series.map(s => (
                                        <tr key={s.orden}>
                                            <th><p>{s.repeticiones}{s.tecnica != "NINGUNA" && <TII tii={s.tecnica} />}</p></th>
                                            <th><input name='peso' onChange={(e) => onChangeRepetecion(s.orden, e)} /></th>
                                            <th><input name='rpe' onChange={(e) => onChangeRepetecion(s.orden, e)} /></th>
                                            <th><input name='rir' onChange={(e) => onChangeRepetecion(s.orden, e)} /></th>
                                            <th>{
                                                (repeticionesResultados[s.orden] && repeticionesResultados[s.orden].observaciones && repeticionesResultados[s.orden].observaciones != "")
                                                    ?
                                                    <AiFillEye onClick={() => mostrarObservacionRepeticion(s.orden)} />
                                                    :
                                                    <BsPlusCircleFill onClick={() => agregarObservacionRepeticion(s.orden)} />
                                            }</th>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <label style={{ fontWeight: "600", display: "flex", margin: "1rem" }}>Observaciones</label>
                            <textarea style={{ width: "95%", margin: "auto 1rem", minHeight: "100px" }} value={observacion} onChange={({ target }) => setObservacion(target.value)} />
                        </>
                        :
                        <TablaHistorial historico={historicoSeleccionado} ejerId={ejercicio.id || ""} />
                    }
                    <br /><br />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Button onClick={handleCerrarModal} activo={false}>Cerrar</Button>
                        {!completado ?
                            <Button activo={true} onClick={guardarEjercicio}>Guardar</Button>
                            :
                            <Button activo={true} onClick={cerrarHistorial}>Modificar</Button>
                        }
                    </div>
                </div>
            </Modal>
            <ModalOpcionesDias
                activo={mostrarHistorial}
                ejerId={ejercicio.id || ""}
                ocultar={() => setMostrarHistorial(false)}
                seleccionarHistorico={seleccionarHistorico}
            />
        </Contenedor>
    )
}
