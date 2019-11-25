import ActionTypes from './ActionTypes';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import setAuthToken from './setAuthToken';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
import { AsyncStorage } from 'react-native';

//send form
export const sendForm = (data) => (dispatch) => {
  axios
    .post(`${API_URL}/api/users/email/register`, userData)
    .then((res) => history.push('/login')) //will change in future
    .catch((err) => {
      //console.log(err);
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};
//login user
export const loginEmail = (response) => (dispatch) => {
  // await AsyncStorage.setItem('jwtToken', response);
  // setAuthToken(token);
  // navigation.navigate('App');
  console.log(`from actionsJS ${JSON.stringify(response)}`);
  dispatch(setCurrentUser(response));
};

//
export const setCurrentUser = (decoded) => {
  return {
    type: ActionTypes.SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  console.log('from out');
  dispatch({
    type: ActionTypes.SET_CURRENT_USER,
    payload: {}
  });
  // Remove token from local storage jwtToken
  // navigation.navigate('Auth');
};

/*  axios
    .post(`${API_URL}/api/users/email/login`, userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const {token} = res.data;
      // localStorage.setItem("jwtToken", token);
      _storeData = async () => {
        try {
          await AsyncStorage.setItem("jwtToken", token);
        } catch (error) {
          console.log(error);
        }
      };
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      navigation.navigate("App");

      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      console.log(err.response.data);
      // history.push("/login");
      dispatch({
        type: ActionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
*/
// export const registerGoogle = (response, history) => dispatch => {
//   //console.log(response);
//   const userData = {
//     accessToken: response.accessToken,
//     name: response.profileObj.name,
//     email: response.profileObj.email,
//     imageUrl: response.profileObj.imageUrl,
//     userID: response.profileObj.googleId,
//   };
//   //console.log(userData);
//   axios
//     .post(`${API_URL}/api/users/auth/google`, userData)
//     .then(res => {
//       // Save to localStorage
//       // Set token to localStorage
//       //console.log(res.data);
//       const { token } = res.data;
//       localStorage.setItem('jwtToken', token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//       // history.push("/dashboard");
//     })
//     .catch(err => {
//       //console.log(err);
//     }); //will change in future
// };
// // Set logged in user
