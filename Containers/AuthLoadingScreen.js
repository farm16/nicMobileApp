import React from 'react';
import { connect } from 'react-redux';
import { loginEmail, registerGoogle } from '../Redux/actions/actions';
import { bindActionCreators } from 'redux';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Linking,
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
    // this.state = {};
  }
  componentDidMount() {
    // if (this.props.auth.isAuthenticated === false)
    //   this.props.navigation.navigate('Auth');
    // else {
    // Add event listener to handle OAuthLogin:// URLs
    // if (!this.props.auth.isAuthenticated)
    //   this.props.navigation.navigate('Auth');
    // else {
    console.log('START listenning');
    if (Platform.OS === 'android') {
      Linking.getInitialURL()
        .then(url => {
          console.log('url is', url);
          if (url === null) this.props.navigation.navigate('Auth');
          else this.handleOpenURL({ url });
        })
        .catch(err => {
          console.log('error is ' + err);
        });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
    // }
  }

  // Linking.getInitialURL().then(url => {
  //   if (url) {
  //     console.log('url: ' + url);
  //     this.handleOpenURL({ url });
  //   } else console.log('no response from url');
  // });
  // if (this.props.auth.isAuthenticated) {
  //   console.log('STOP listenning');
  //   Linking.removeEventListener('url', this.handleOpenURL);
  //   this.props.navigation.navigate('App');
  // }

  componentWillUnmount() {
    // Remove event listener
    console.log('STOP listenning');
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  // setUser = data => this.props.loginEmail(data);
  handleOpenURL = ({ url }) => {
    // Extract stringified user string out of the URL
    const [, user_string] = url.match(/user=([^#]+)/);
    const data = JSON.parse(decodeURI(user_string));
    console.log(data);
    this.props.loginEmail(data);
    // const userToken = await AsyncStorage.getItem('jwtToken');
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');

    // await AsyncStorage.setItem('jwtToken', JSON.stringify(data));
    this.props.navigation.navigate('App');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // console.log("from login" + user)
    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };
  // Fetch the token from storage then navigate to our appropriate place

  // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  //   _bootstrapAsync = async () => {
  //     const userToken = await AsyncStorage.getItem('jwtToken');

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     console.log('from AuthLoadingScreen : ' + userToken);
  //     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  //   };

  // Render any loading content that you like here
  render() {
    console.log(
      'from AUTHLOADING ' + this.props.auth.isAuthenticated,
    );

    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoadingScreen);
