import React from 'react';
import { connect } from 'react-redux';
import { loginEmail, registerGoogle } from '../Redux/actions/actions';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  ImageBackground,
  AsyncStorage,
  Text,
  View,
  Linking,
  Platform,
  TouchableOpacity
} from 'react-native';
import SafariView from 'react-native-safari-view';

import config from '../config';
console.log('api link => ' + config.API_URL);

// this.openURL('http://192.168.1.2:3001/api/nicapp/auth/google');

class Login extends React.Component {
  componentDidMount() {
    // Add event listener to handle OAuthLogin:// URLs
    if (this.props.auth.isAuthenticated)
      Linking.removeEventListener('url', this.handleOpenURL);

    Linking.addEventListener('url', this.handleOpenURL);
    // Launched from an external URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }
  componentWillUnmount() {
    // Remove event listener
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  setUser = (data) => this.props.loginEmail(data);
  handleOpenURL = async ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    const data = JSON.parse(decodeURI(user_string));
    // this.props.loginEmail(this.props.navigation, data)
    const userToken = await AsyncStorage.getItem('jwtToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    this.setUser(data);
    await AsyncStorage.setItem('jwtToken', JSON.stringify(data));

    //this.props.navigation.navigate('App');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // console.log("from login" + user)
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  loginWithGoogle = () => {
    this.openURL('https://c-fajardo.com/api/nicapp/auth/google');
  };

  openURL = (url) => {
    // Open URL in a browser - Use SafariView on iOS
    if (Platform.OS === 'ios') {
      SafariView.show({
        url: url,
        fromBottom: true
      });
    }
    // Or Linking.openURL on Android
    else {
      Linking.openURL(url);
    }
  };
  render() {
    // const { user } = this.props.auth;
    console.log('props' + this.props);

    // this.props.auth.isAuthenticated ? this.props.navigation.navigate('Home') : this.props.navigation.navigate('Auth')
    return (
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={styles.backgroundImage}
      >
        <View style={styles.containerDiv}>
          <View style={styles.titleDiv}>
            <Text style={styles.titleText}>NORTH</Text>
            <Text style={styles.titleText}>CENTRAL</Text>
            <Text style={styles.titleText}>CONSULTING</Text>
          </View>
          <TouchableOpacity
            style={styles.btnGmail}
            onPress={this.loginWithGoogle}
            // onPress={() => this.props.loginEmail(this.props.navigation)}
          >
            <Text style={styles.btnText}>Log in with Gmail</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnGuess} onPress={this._signInAsync}>
            <Text style={styles.btnText}>Log in as a Guess</Text>
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover' // or 'stretch'
  },
  containerDiv: {
    width: '70%'
  },
  titleDiv: {
    height: '55%',
    display: 'flex',
    alignContent: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 45,
    fontWeight: '500',
    textShadowColor: '#000',
    textShadowRadius: 40
  },
  btnGmail: {
    backgroundColor: 'red',
    paddingVertical: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  btnGuess: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  btnText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center'
  }
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
