import { useState } from 'react';
import { styled } from 'styled-components';
import { BotonActivable, Button, DivOpcionIncrementable, DivSerie, Input, Label, Select } from './ejercicio.component';
import { DiaSemanaInterface, DiaSemanalType, SEMANA_INICIAL } from '../interfaces/Semana';
import { InputIncrementador } from './InputIncrementador';
import { TI_INICIAL } from '../interfaces/TecnicaIntensidad';
import { useForm } from '../hooks/useForm';
import { SerieInterface } from '../interfaces/Serie';
import { EjercicioInterface } from '../interfaces/Ejercicio';
import { crearNuevoEjercicio } from '../firebase/queries';
import Swal from 'sweetalert2';
import { buscarUsuarioEnStorage } from '../helpers';

const Modal = styled.div`
  margin: 0;
  width:100%;
`;
export const NuevoEjercicio = () => {
    const [diasSemanaActivos, setDiasSemanaActivos] = useState<DiaSemanaInterface[]>(SEMANA_INICIAL);
    const { form, onChangeFormNumber, onChangeValue } = useForm({ nombre: "", descripcion: "", rpe: "", rir: "", series: 1 });
    const [seriesState, setSeriesState] = useState<SerieInterface[]>([{ orden: 0, repeticiones: 1, tecnica: "NINGUNA" }]);

    const cambiarValorNumericoInput = (nombre: string, sumar: boolean) => {
        onChangeFormNumber(sumar, nombre);
    }
    const seleccionarDia = (dia: DiaSemanalType) => {
        const diasFiltrados: DiaSemanaInterface[] = diasSemanaActivos.map(d => (d.nombre != dia) ?
            d : { ...d, activo: !d.activo }
        )
        setDiasSemanaActivos(diasFiltrados);
    }


    const editarSerie = ({target}: any, serieId:number) => {
        const series = [...seriesState];
        if(series[serieId]){
            if(target.name == "reps"){
                series[serieId] = {
                    ...series[serieId],
                    repeticiones: target.value
                }
            }else if(target.name == "tecnica"){
                series[serieId] = {
                    ...series[serieId],
                    tecnica: target.value
                }
            }
        }else{
            series.push({
                orden: serieId,
                repeticiones: (target.name == "reps") ? target.value : 1,
                tecnica: (target.name == "tecnica") ? target.value : "NINGUNA",
            })
        }

        setSeriesState(series);
    }

    const validarFormulario = () => {
        guadarEjercicio();
    }

    const guadarEjercicio = async() => {
        const {usuario} = buscarUsuarioEnStorage();
        const ejercicio: EjercicioInterface = {
            nombre: form.nombre,
            dias: diasSemanaActivos,
            creadoPor: usuario.uid,
            descripcion: form.descripcion,
            publico: true,
            cantidadSeries: form.series,
            series: seriesState.slice(0, form.series)
        }
        const {ok, msg} = await crearNuevoEjercicio(ejercicio);
        if(ok){
            return Swal.fire({
                icon: ok ? "success" : "error",
                title: msg
            })
        }
    }

    return (
        <Modal>
            <h3>Nuevo ejercicio</h3>
            <Input>
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={(e) => onChangeValue(e)}/>
            </Input>
            <Input>
                <label>Descripcion (opcional)</label>
                <input name="descripcion" value={form.descripcion} onChange={(e) => onChangeValue(e)}/>
            </Input>
            <Label>Dias de actividad</Label>
            <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%" }}>
                {diasSemanaActivos.map((dia, i) => (
                    <BotonActivable activo={dia.activo} key={dia.nombre} onClick={() => seleccionarDia(dia.nombre)}>{dia.nombre}</BotonActivable>
                ))}
            </div>
            {/* 
            <DivOpcionIncrementable>
                <p>RPE (opcional)</p>
                <InputIncrementador value={form.rpe} nombre='rpe' cambiarValor={cambiarValorNumericoInput} />
            </DivOpcionIncrementable>
            <DivOpcionIncrementable>
                <p>RIR (opcional)</p>
                <InputIncrementador value={form.rir} nombre='rir' cambiarValor={cambiarValorNumericoInput} />
            </DivOpcionIncrementable>
            */}
            <DivOpcionIncrementable>
                <p>Cantidad de series</p>
                <InputIncrementador value={form.series} nombre='series' cambiarValor={cambiarValorNumericoInput} />
            </DivOpcionIncrementable>
            {
                Array.from({ length: parseInt(form.series) }, (_, index) => 0 + index).map((s, i) => (
                    <DivSerie key={s}>
                        <form onChange={(e) => editarSerie(e, s)}>
                            <Label style={{ textAlign: "center" }}>Serie {i + 1}</Label>
                            <DivOpcionIncrementable>
                                <p>Repeticiones</p>
                                <input name='reps'/>
                            </DivOpcionIncrementable>
                            <DivOpcionIncrementable>
                                <p>Tecnica intensidad</p>
                                <Select name="tecnica">
                                    {TI_INICIAL.map(tec => (
                                        <option key={tec.nombre} value={tec.nombre}>{tec.nombre}</option>
                                    ))}
                                </Select>
                            </DivOpcionIncrementable>
                        </form>
                    </DivSerie>
                ))
            }
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button>Cancelar</Button>
                <Button activo onClick={validarFormulario}>Guardar</Button>
            </div>
            
        </Modal>
    )
}
