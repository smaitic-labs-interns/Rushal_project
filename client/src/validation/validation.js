import * as yup from 'yup';



 export const loginValidationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

 export const registerValidationSchema = yup.object({
  firstName: yup
      .string('Enter your First Name')
      .required('Your First Name is required'),
  lastName: yup
      .string('Enter your Last Name')
      .required('Last Name is required'),
  email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'), 
  password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
 confirmPassword: yup
      .string('Confirm your password')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  contact: yup
      .string('Enter your contact')
      .required('Contact is required')
    });

 export const shipmentValidationSchema = yup.object({
    country: yup
    .string('Enter your Country Name')
    .required('Your Country Name is required'),

    name: yup
    .string('Enter your Location Name')
    .required('Your Location is required'),

    city: yup
    .string('Enter your City name')
    .required('Your City name is required'),

    charge: yup
    .number('Payment Charge')
    .required('Charge must be included'),

    shipmentstatus: yup
    .string('shipment status')
    .required('shipment status is required'),

    payment: yup
    .string('Enter your payment type')
    .required('Payment type must be valid'),

    status: yup
    .string('payment status')
    .required('payment status is required'), 
 });   