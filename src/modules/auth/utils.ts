import { ILoginParams, ILoginValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

export const validate = (values : ILoginValidation) => {
  const errors : ILoginValidation = {
    email: '',
    password: ''
  };

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'minPasswordInvalid';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

// const validateEmail = (email: string) => {
//   if (!email) {
//     return 'emailRequire';
//   }

//   if (!validEmailRegex.test(email)) {
//     return 'emailInvalid';
//   }

//   return '';
// };

// const validatePassword = (password: string) => {
//   if (!password) {
//     return 'passwordRequire';
//   }

//   if (password.length < 4) {
//     return 'minPasswordInvalid';
//   }

//   return '';
// };

// export const validateLogin = (values: ILoginParams): ILoginValidation => {
//   return {
//     email: validateEmail(values.email),
//     password: validatePassword(values.password),
//   };
// };

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};
