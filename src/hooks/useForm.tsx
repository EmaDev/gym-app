import { useState } from 'react';

export const useForm = (initialState: any) => {

    const [form, setForm] = useState(initialState);

    const onChangeFormNumber = (sumar: boolean, nombre: string) => {
        let value = parseInt(form[nombre]);
        if(Number.isNaN(value)){
            value = 0;
        }
        if (sumar) {
            value += 1;
        } else if(value > 0) {
            value -= 1;
        }
        setForm({
            ...form,
            [nombre]: value
        })
    }

    const onChangeValue = ({ target }: any) => {
        setForm({
            ...form,
            [target.name]: target.value
        })
    }

    const llenarForm = (nuevoForm:any) => {
        setForm({
            ...nuevoForm
        })
    }
    return { form, onChangeValue, onChangeFormNumber, llenarForm }
}
