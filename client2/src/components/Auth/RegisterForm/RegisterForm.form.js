import * as Yup from "yup";

export function initialValues(){
    return {
        email:"",
        password:"",
    };
}

export function validationSchem(){
    return Yup.object({
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    });
}