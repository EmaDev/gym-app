import {createContext, useState} from 'react';
import { EjercicioInterface } from '../interfaces/Ejercicio';

interface EjercicioContextProps {
    modalVisible:boolean;
    ejercicio:EjercicioInterface;
    completado: boolean;
    cerrarModal: () => void;
    abrirModal: () => void;
    setCompletado: (valor:boolean) => void;
    seleccionarEjercicio: (ejer:EjercicioInterface, completado:boolean) => void;
}
export const EjercicioContext = createContext({} as EjercicioContextProps); 

export const EjercicioContextProvider = ({children}:any) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [ejercicio, setEjercicio] = useState<EjercicioInterface>({} as EjercicioInterface);
    const [completado, setCompletado] = useState<boolean>(false);
 
    const cerrarModal = () => {
        setModalVisible(false);
    }
    const abrirModal = () => {
        setModalVisible(true);
    }
    const seleccionarEjercicio = (ejer:EjercicioInterface, completado:boolean) => {
        setEjercicio(ejer);
        setCompletado(completado);
        abrirModal();
    }
    return (
    <EjercicioContext.Provider value={{
        modalVisible,
        ejercicio,
        completado,
        abrirModal,
        cerrarModal,
        setCompletado,
        seleccionarEjercicio
    }}>
        {children}
    </EjercicioContext.Provider>
  )
}
