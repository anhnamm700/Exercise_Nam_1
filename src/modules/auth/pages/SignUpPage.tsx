import React from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from 'redux';

import style from './style.module.scss';
import { AppState } from "../../../redux/reducer";
import logo from '../../../logo-420-x-108.png';
import ImageComponent from "../../ImageComponent/ImageComponent";
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [location, setLoaction] = React.useState([]);

    const onSignUp = () => {
        
    }

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
            />
        </div>
    );
}

export default SignUpPage;