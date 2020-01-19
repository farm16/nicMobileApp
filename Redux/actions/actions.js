import ActionTypes from './ActionTypes';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from './setAuthToken';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
import { AsyncStorage } from 'react-native';

//send form
export const sendForm = data => dispatch => {
  axios
    .post(`${API_URL}/api/users/email/register`, userData)
    .then(res => history.push('/login')) //will change in future
    .catch(err => {
      //console.log(err);
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data,
      });
    });
};
//login user
export const loginEmail = response => dispatch => {
  // await AsyncStorage.setItem('jwtToken', response);
  // setAuthToken(token);
  // navigation.navigate('App');
  console.log(`from actionsJS ${JSON.stringify(response)}`);
  dispatch(setCurrentUser(response));
};

//
export const setCurrentUser = decoded => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  console.log('from logout ACTION');
  dispatch({
    type: ActionTypes.SET_CURRENT_USER,
    payload: {},
  });
  // Remove token from local storage jwtToken
  // navigation.navigate('Auth');
};
