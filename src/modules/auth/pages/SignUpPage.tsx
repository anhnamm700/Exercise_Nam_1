import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from 'redux';
import { replace } from 'connected-react-router';

import style from './style.module.scss';
import { AppState } from "../../../redux/reducer";
import logo from '../../../logo-420-x-108.png';
import ImageComponent from "../../ImageComponent/ImageComponent";
import SignUpForm from "../components/SignUpForm";
import { fetchThunk } from "../../common/redux/thunk";
import { API_PATHS } from "../../../configs/api";
import { RESPONSE_STATUS_EXISTED, RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { ISignUpParams } from "../../../models/auth";
import { ROUTES } from "../../../configs/routes";

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [location, setLoaction] = React.useState([]);
    const [id, setId] = React.useState('');
    const [state, setState] = React.useState([]);

    const getLocation = React.useCallback(async() => {
        setLoading(true);

        const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));

        setLoading(false);

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setLoaction(json.data);
            return;
        }
    }, []);

    React.useEffect(() => {
        getLocation();
    }, [getLocation]);

    const onSignUp = React.useCallback(async(values: ISignUpParams) => {
        setErrorMessage('');
        setLoading(true);

        const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

        setLoading(false);

        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            console.log(json.data);
            alert("Đăng kí thành công");
            dispatch(replace(ROUTES.login));

            return;
        } else if (json?.code === RESPONSE_STATUS_EXISTED) {
            alert("Email đã tồn tại");

            return;
        }

    }, [dispatch]);

    const handleState = (e: any) => {
        setId(e.target.value);
    }

    const getState = React.useCallback(async() => {
        if (id) {
            const json = await dispatch(fetchThunk(`${API_PATHS.getStateByLocation}${id}`, 'get'));

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                setState(json.data);
                return;
            }
        }
    }, [id]);

    React.useEffect(() => {
        getState();
    }, [id]);

    return (
        <div className={style.signUpPage}>
            <ImageComponent
                src={logo}
                alt=""
                className="image"
            />

            <SignUpForm
                loading={loading}
                errorMessage={errorMessage}
                locations={location}
                onSignUp={onSignUp}
                onState={handleState}
                states={state}
            />
        </div>
    );
}

export default SignUpPage;