import { Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { app } from "./config";
import { EjercicioInterface, EjercioUsuarioInterface } from "../interfaces/Ejercicio";
import { Usuario } from "../interfaces/Usuario";
import { buscarUsuarioEnStorage } from "../helpers";
const db = getFirestore(app);

interface Response {
    ok: boolean;
    msg: string;
}

export const getListaDeUsuarios = async () => {
    try {
        const q = query(collection(db, "usuarios"));
        const querySnapshot = await getDocs(q);
        const usuarios: Usuario[] = [];
        querySnapshot.forEach(doc => {
            usuarios.push({
                uid: doc.id,
                img: doc.data().img,
                nombre: doc.data().nombre,
                genero: doc.data().genero
            })
        });
        return {
            ok: true,
            data: usuarios
        }
    } catch (error) {
        return {
            ok: false,
            data: []
        }
    }
}
export const crearNuevoEjercicio = async (data: EjercicioInterface) => {
    try {
        await addDoc(collection(db, "ejercicios"), data);
        return <Response>{
            ok: true,
            msg: "Creado correctamente"
        }
    } catch (e: any) {
        return <Response>{
            ok: false,
            msg: e.message
        }
    }
}
export const getTodosLosEjerciciosDeUnUsuario = async () => {
    try {
        const { usuario } = buscarUsuarioEnStorage();
        const q = query(collection(db, "ejercicios"), where("creadoPor", "==", usuario.uid));
        const querySnapshot = await getDocs(q);
        const listaEjercios: EjercicioInterface[] = [];
        querySnapshot.forEach((doc) => {
            const ejer = doc.data() as EjercicioInterface;
            listaEjercios.push({
                ...ejer,
                id: doc.id
            })
        });
        return {
            ok: true,
            data: listaEjercios
        }
    } catch (error) {
        return {
            ok: false,
            data: []
        }
    }
}

export const getEjercicoPorId = async (ejerId: string) => {
    try {
        const docRef = doc(db, "ejercicios", ejerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return {
                ok: true,
                data: docSnap.data() as EjercicioInterface
            }
        }
        return {
            ok: false,
            data: null
        }
    } catch (error) {
        return {
            ok: false,
            data: null
        }
    }
}
export const getEjerciciosPorUsuario = async (dia: number) => {
    try {
        const { usuario } = buscarUsuarioEnStorage();
        const q = query(collection(db, "ejercicios"), where("creadoPor", "==", usuario.uid));
        const querySnapshot = await getDocs(q);
        const ejerciosDelDia: EjercicioInterface[] = [];
        querySnapshot.forEach((doc) => {
            const ejer: EjercicioInterface = doc.data() as EjercicioInterface;
            /*if (ejer.dias.find(d => d.codigo == dia && d.activo == true)) {
                ejerciosDelDia.push({
                    ...ejer,
                    id: doc.id
                });
            }*/
            ejer.dias.forEach(d => {
                if (d.codigo == dia && d.activo) {
                    ejerciosDelDia.push({
                        ...ejer,
                        id: doc.id
                    });
                }
            })
        });
        return {
            ok: true,
            data: ejerciosDelDia
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            data: []
        }
    }
}

export const guardarEjercicioDeUsuario = async (data: EjercioUsuarioInterface) => {
    try {
        await addDoc(collection(db, "ejercicio_usuario"), {
            ...data
        });
        return {
            ok: true,
            msg: "Guardado correctamente"
        }
    } catch (e: any) {
        return {
            ok: false,
            msg: e.message
        }
    }
}

export const editarEjercicioDeUsuario = async (data: EjercicioInterface, ejerId: string) => {
    try {
        const docRef = doc(db, "ejercicios", ejerId);

        await updateDoc(docRef, {
            ...data
        });
        return {
            ok: true,
            msg: "Editado correctamente"
        }
    } catch (e: any) {
        return {
            ok: false,
            msg: e.message
        }
    }
}
export const getEjerciosDeUnUsuario = async (ejercioId: string) => {
    try {
        const { usuario } = buscarUsuarioEnStorage();
        const q = query(collection(db, "ejercicio_usuario"),
            where("uid", "==", usuario.uid),
            where("ejercioId", "==", ejercioId));
        const querySnapshot = await getDocs(q);
        const ejers: EjercioUsuarioInterface[] = [];
        querySnapshot.forEach((doc) => {
            ejers.push({
                ejercioId,
                uid: usuario.uid,
                id: doc.id,
                dia: doc.data().dia,
                fecha: doc.data().fecha.toDate(),
                resultados: doc.data().resultados,
                observaciones: doc.data().observaciones
            })
        });

        return {
            ok: true,
            data: ejers
        }
    } catch (e: any) {
        return {
            ok: false,
            data: []
        }
    }
}

export const getEjercioDeUnUsuarioPorDia = async (ejercioId: string, dia: Date) => {
    try {
        const { usuario } = buscarUsuarioEnStorage();
        let fecha = new Date();
        let mayorQue = false;
        if (dia.getDate() == fecha.getDate() && dia.getMonth() == fecha.getMonth()) {
            fecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
            mayorQue = true;
        } else {
            fecha = dia;
        }
        const q = query(collection(db, "ejercicio_usuario"),
            where("uid", "==", usuario.uid),
            where("ejercioId", "==", ejercioId),
            where("fecha", mayorQue ? ">=" : "==", fecha));

        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
            return {
                ok: true,
                data: querySnapshot.docs[0].data()
            }
        }
        return {
            ok: false,
            msg: "No se encontro ejercio para hoy",
            data: null
        }
    } catch (e: any) {
        return {
            ok: false,
            msg: e.message,
            data: null
        }
    }
}

export const getEjercioDeHoy = async (ejercioId: string) => {
    try {
        const { usuario } = buscarUsuarioEnStorage();
        const momento = new Date();
        const q = query(collection(db, "ejercicio_usuario"),
            where("uid", "==", usuario.uid),
            where("ejercioId", "==", ejercioId),
            where("fecha", ">=", Timestamp.fromDate(new Date(momento.getFullYear(), momento.getMonth(), momento.getDate()))));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length > 0) {
            return {
                ok: true,
                data: querySnapshot.docs[0].data()
            }
        }
        return {
            ok: false,
            msg: "No se encontro ejercio para hoy",
            data: null
        }
    } catch (e: any) {
        return {
            ok: true,
            msg: e.message,
            data: null
        }
    }
}