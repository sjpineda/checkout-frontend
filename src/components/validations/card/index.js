import * as Yup from 'yup';

const InitialeState = {
    "firstName": "", "lastName": "", "cardNumber": "", "expirationDate": "", "cardCode": "",
};
const ValidateCardSchema = Yup.object().shape({
    cardNumber: Yup
        .string()
        .matches(/^[0-9]/, "Numeric digit only").min(16, 'Min allowed limit 16').max(16, 'Max allowed limit 16')
        .required("This field is required"), expirationDate: Yup
        .string()
        .matches(/^[0-9]/, "Numeric digit only").min(4, 'Min allowed limit 4 ').max(4, 'Max allowed limit 4')
        .required("This field is required"), cardCode: Yup
        .string()
        .matches(/^[0-9]/, "Numeric digit only").min(3, 'Min allowed limit 3').max(4, 'Max allowed limit 3')
        .required("This field is required"), firstName: Yup
        .string()
        .required("This field is required"), lastName: Yup
        .string()
        .required("This field is required")
})

export {
    ValidateCardSchema, InitialeState
}