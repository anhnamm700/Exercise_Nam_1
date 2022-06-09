import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import logo from '../../../logo-420-x-108.png';
import { ILoginParams } from '../../../models/auth';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { Action } from 'redux';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { setUserInfo } from '../redux/authReducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from '../../../utils/constants';
import { ROUTES } from '../../../configs/routes';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';
import style from './style.module.scss';
import ImageComponent from '../../ImageComponent/ImageComponent';
import { FormattedMessage } from 'react-intl';

const LoginPage = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = Cookies.get(ACCESS_TOKEN_KEY);

  const onLogin = React.useCallback(
    
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        localStorage.setItem('user', JSON.stringify({ ACCESS_TOKEN_KEY, ...values }));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  if (auth) {
    dispatch(replace(ROUTES.home));
  }
  

  return (
    <div
      className={`container ${style.loginPage}`}
    > 
      <ImageComponent
        src={logo}
        alt=""
        className="image"
      />

      <LoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
      
      <a href="/sign-up">
        <FormattedMessage id="register"/>
      </a>
    </div>
  );
};

export default LoginPage;
