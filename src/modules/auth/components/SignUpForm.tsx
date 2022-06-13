import { off } from "process";
import React from "react";
import { FormattedMessage } from 'react-intl';
import { useFormik } from 'formik';

import { validateSignUp } from '../utils';
import style from './style.module.scss';
import InputValues from '../../inputComponent/InputComponent';
import { ILocationParams, ISignUpParams, IGenderParams } from "../../../models/auth";
import ButtonComponent from '../../ButtonComponent/ButtonComponent';

interface Props {
    loading: boolean,
    errorMessage: string,
    locations: Array<ILocationParams>,
    states: Array<ILocationParams>,
    onSignUp(values: ISignUpParams): void,
    onState(values: any) : any
}

const SignUpForm = (props: Props) => {
    const { loading, errorMessage, locations, onSignUp, onState, states } = props;

    const [error, setError] = React.useState('');

    
    


    const GENDERS = [
        {
            label: 'Nam',
            value: 'Nam'
        },
        {
            label: 'Nữ',
            value: 'Nữ'
        },
    ];

    const validate = validateSignUp;

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
        formik.handleSubmit();
        setError(errorMessage);
        onSignUp(formik.values);
    }
    

    const renderGender = () : any => {
        const arrGender: JSX.Element[] = [
            <option disabled selected value={''} key={''}> 
                {''}-- Select an option --{''}
            </option>,
        ];

        GENDERS.map((g: IGenderParams, index: number) => {
            arrGender.push(
                <option value={g.value} key={index}>
                    { g.label }
                </option>
            );
        });
        return arrGender;
    }

    const renderRegion = () : any => {
        const arrRegion: JSX.Element[] = [
            <option disabled selected value={''} key={''}> 
                {''}-- Select an option --{''}
            </option>,
        ];

        locations.map((location: ILocationParams, index: number) => {
            arrRegion.push(
                <option value={location.id} key={index}>
                    { location.name }
                </option>
            );
        });
        return arrRegion;
    }

    const renderState = () : any => {
        const arrState: JSX.Element[] = [
            <option disabled selected value={''} key={''}> 
                {''}-- Select an option --{''}
            </option>,
        ];

        states?.map((state: ILocationParams, index: number) => {
            arrState.push(
                <option value={state.id} key={index}>
                    { state.name }
                </option>
            );
        });
        return arrState;
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
            { error ? <div>{error}</div> : '' }

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
                {formik.errors.email ? <div className={style.error}>{formik.errors.email}</div> : null}
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
                {formik.errors.password ? <div className={style.error}>{formik.errors.password}</div> : null}
            </div>

            

            <div className="col-md-12">
                <label htmlFor="inputRepeatPassword" className="form-label">
                    <FormattedMessage id="repeatPassword" />
                </label>

                <InputValues
                    type="password"
                    className="form-control"
                    name="repeatPassword"
                    id="inputRepeatPassword"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                />
                {formik.errors.repeatPassword ? <div className={style.error}>{formik.errors.repeatPassword}</div> : null}
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
                {formik.errors.name ? <div className={style.error}>{formik.errors.name}</div> : null}
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
                {formik.errors.gender ? <div className={style.error}>{formik.errors.gender}</div> : null}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputRegion" className="form-label">
                    <FormattedMessage id="region" />
                </label>

                <select
                    disabled={states ? false : true}
                    className="form-control"
                    name="region"
                    id="inputRegion"
                    value={formik.values.region}
                    onChange={(e) => {
                        formik.handleChange(e);
                        onState(e);
                    }}
                >
                    { renderRegion() }
                </select>
                {formik.errors.region ? <div className={style.error}>{formik.errors.region}</div> : null}
            </div>

            <div className="col-md-12">
                <label htmlFor="inputState" className="form-label">
                    <FormattedMessage id="state" />
                </label>

                <select
                    className="form-control"
                    name="state"
                    id="inputState"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                >
                    { renderState() }
                </select>
                {formik.errors.state ? <div className={style.error}>{formik.errors.state}</div> : null}
            </div>

            <ButtonComponent
              className="btn btn-primary"
              type="submit"
              style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              disabled={loading}
            >
              {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
              <FormattedMessage id="register" />
            </ButtonComponent>
        </form>
    );
}

export default SignUpForm;