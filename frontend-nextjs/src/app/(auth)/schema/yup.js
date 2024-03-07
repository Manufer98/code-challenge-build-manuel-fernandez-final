import * as yup from 'yup';




export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  password: yup
    .string()
    .required("Required"),
  
});

export const addContactSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  name: yup.string().required("Required"),
  title: yup.string().required("Required"),
  profilePic: yup.string().required("Required"),
  address: yup.string().required("Required"),
  phone: yup.string().required("Required"),
    
  
});