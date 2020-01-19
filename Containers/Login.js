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
  TouchableOpacity,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import config from '../config';
//console.log('api link => ' + config.API_URL);

console.log("Using API's URL => " + config.API_URL);
// this.openURL('http://192.168.1.2:3001/api/nicapp/auth/google');

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
  }
  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated)
  //     this.props.navigation.navigate('App');
  // }
  loginWithGoogle = async () => {
    let url = 'https://c-fajardo.com/api/nicapp/auth/google';

    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url).catch(err =>
            console.error('An error occurred', err),
          );
        }
      })
      .catch(err => console.error('An error occurred', err));
    // Launched from an external URL

    // const urlData = await Linking.getInitialURL();
    // if (urlData) {
    //   console.log('url: ' + urlData);
    //   // this.handleOpenURL({ url });
    // } else console.log('no response');
  };

  // openURL = url => {
  //   // Open URL in a browser - Use SafariView on iOS
  //   if (Platform.OS === 'ios') {
  //     SafariView.show({
  //       url: url,
  //       fromBottom: true,
  //     });
  //   }
  //   // Or Linking.openURL on Android
  //   else {
  //     Linking.openURL(url);
  //   }
  // };
  // render() {
  //   // const { user } = this.props.auth;
  //   console.log(
  //     'props fromo LOGIN PAGE ' + this.props.auth.isAuthenticated,
  //   );

  render() {
    const { user } = this.props.auth;
    console.log('from LOGIN-PAGE ' + this.props.auth.isAuthenticated);
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
          >
            <Text style={styles.btnText}>Log in with Gmail</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.btnGuess} onPress={this._signInAsync}>
            <Text style={styles.btnText}>Log in as a Guess</Text>
          </TouchableOpacity>    
          
          <Text style={styles.rocketDevs}>
            Powered by RocketDevs.com{' '}
          </Text> */}
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
    resizeMode: 'cover', // or 'stretch'
  },
  containerDiv: {
    width: '70%',
  },
  titleDiv: {
    height: '55%',
    display: 'flex',
    alignContent: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 45,
    fontWeight: '500',
    textShadowColor: '#000',
    textShadowRadius: 40,
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
    elevation: 5,
  },
  btnGuess: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
