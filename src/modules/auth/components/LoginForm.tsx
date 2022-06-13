import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';

import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validate, validLogin } from '../utils';
import InputValues from '../../inputComponent/InputComponent';
import ButtonComponent from '../../ButtonComponent/ButtonComponent';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}



const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props; 

  // const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validateForm, setValidateForm] = React.useState<ILoginValidation>();
  const [err, setErr] = React.useState('');
  
  

  const onSubmitLogin = (e : any) => {
    e.preventDefault();
    // validateLogin(formik.values);
    setErr(errorMessage);
    formik.handleSubmit();

    onLogin(formik.values);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validate,
    onSubmit: values => {
      console.log("123")
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
      <form
        style={{ maxWidth: '560px', width: '100%' }}
        noValidate
        onSubmit={onSubmitLogin}
        className="row g-3 needs-validation"
      >
        { err && <div>{err}</div> }
      
        <div className="col-md-12">
          <label htmlFor="inputEmail" className="form-label">
            <FormattedMessage id="email" />
          </label>

          <InputValues
            type="text"
            className="form-control"
            name="email"
            id="inputEmail"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}

          
        </div>

        <div className="col-md-12">
          <label htmlFor="inputPassword" className="form-label">
            <FormattedMessage id="password" />
          </label>

          <InputValues
            type="password"
            className="form-control"
            name="password"
            id="inputPassword"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>

        <div className="col-12">
          <div className="form-check">
            <InputValues
              className="form-check-input"
              name="rememberMe"
              type="checkbox"
              id="invalidCheck"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
            <label className="form-check-label" htmlFor="invalidCheck">
              <FormattedMessage id="rememberMe" />
            </label>
          </div>
        </div>

        <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
          <div className="col-md-auto">
            <ButtonComponent
              className="btn btn-primary"
              type="submit"
              style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
              <FormattedMessage id="login" />
            </ButtonComponent>
          </div>
        </div>
      </form>
      // <form
      //   style={{ maxWidth: '560px', width: '100%' }}
      //   noValidate
      //   onSubmit={e => {
      //     e.preventDefault();
      //     onSubmitLogin();
      //   }}
      //   className="row g-3 needs-validation"
      // >
      //   {!!errorMessage && (
      //     <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
      //       {errorMessage}
      //     </div>
      //   )}

      //   <div className="col-md-12">
      //     <label htmlFor="inputEmail" className="form-label">
      //       <FormattedMessage id="email" />
      //     </label>

      //     <InputValues
      //       type="text"
      //       className="form-control"
      //       id="inputEmail"
      //       value={formValues.email}
      //       onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
      //     />

      //     {!!validate?.email && (
      //       <small className="text-danger">
      //         <FormattedMessage id={validate?.email} />
      //       </small>
      //     )}
      //   </div>

      //   <div className="col-md-12">
      //     <label htmlFor="inputPassword" className="form-label">
      //       <FormattedMessage id="password" />
      //     </label>

      //     <InputValues
      //       type="password"
      //       className="form-control"
      //       id="inputPassword"
      //       value={formValues.password}
      //       onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
      //     />

      //     {!!validate?.password && (
      //       <small className="text-danger">
      //         <FormattedMessage id={validate?.password} />
      //       </small>
      //     )}
      //   </div>

      //   <div className="col-12">
      //     <div className="form-check">
      //       <input
      //         className="form-check-input"
      //         type="checkbox"
      //         id="invalidCheck"
      //         checked={formValues.rememberMe}
      //         onChange={e => setFormValues({ ...formValues, rememberMe: e.target.checked })}
      //       />
      //       <label className="form-check-label" htmlFor="invalidCheck">
      //         <FormattedMessage id="rememberMe" />
      //       </label>
      //     </div>
      //   </div>

      //   <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
      //     <div className="col-md-auto">
      //       <button
      //         className="btn btn-primary"
      //         type="submit"
      //         style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      //         disabled={loading}
      //       >
      //         {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
      //         <FormattedMessage id="register" />
      //       </button>
      //     </div>
      //   </div>
      // </form>

      
  );
};

export default LoginForm;
