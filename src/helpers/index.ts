import { Usuario } from "../interfaces/Usuario";

export const formatDate = (date: Date, soloDia = false): string => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    if(soloDia){
        return dayOfWeek;
    }
    return `${dayOfWeek} ${day} de ${month}`;
}


export const buscarUsuarioEnStorage = () => {
    const usuario = localStorage.getItem("usuario-activo");
    
    return {
        ok: usuario ? true : false,
        usuario: usuario ? JSON.parse(usuario) : null
    }
}

export const guardarUsuarioEnStorage = (usuario: Usuario) => {
    localStorage.setItem("usuario-activo", JSON.stringify(usuario));
}