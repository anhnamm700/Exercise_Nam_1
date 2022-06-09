import { off } from "process";
import React from "react";
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';

import { validate, validLogin } from '../utils';
import style from './style.module.scss';
import InputValues from '../../inputComponent/InputComponent';
import { ILocationParams, ISignUpParams } from "../../../models/auth";

interface Props {
    loading: boolean,
    errorMessage: string,
    locations: Array<ILocationParams>,
    onSignUp(values: ISignUpParams): void
}

const SignUpForm = (props: Props) => {
    const { loading, errorMessage, locations, onSignUp } = props;

    const [validateInput, setValidateInput] = React.useState<ISignUpParams>({ 
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: ''
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            repeatPassword: '',
            name: '',
            gender: '',
            region: '',
            state: ''
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

    const onSubmit = () => {

    }

    const renderGender = () : any => {

    }

    const renderRegion = () : any => {

    }

    const renderState = () : any => {

    }

    return (
        <form
            autoComplete="off"
            className={style.signUpForm}
            noValidate
            onSubmit={e => {
                e.preventDefault();
                onSubmit();
            }}
        >
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

            

            <div className="col-md-12">
                <label htmlFor="inputRepeatPassword" className="form-label">
                    <FormattedMessage id="email" />
                </label>

                <InputValues
                    type="password"
                    className="form-control"
                    name="repeatPassword"
                    id="inputRepeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                />
                {formik.errors.repeatPassword ? <div>{formik.errors.repeatPassword}</div> : null}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputName" className="form-label">
                    <FormattedMessage id="name" />
                </label>

                <InputValues
                    type="text"
                    className="form-control"
                    name="name"
                    id="inputName"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                {formik.errors.name ? <div>{formik.errors.name}</div> : null}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputGender" className="form-label">
                    <FormattedMessage id="gender" />
                </label>

                <select
                    className="form-control"
                    name="gender"
                    id="inputGender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                >
                    { renderGender() }
                </select>
                {formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
            </div>
        </form>
    );
}

export default SignUpForm;