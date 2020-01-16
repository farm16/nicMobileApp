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
  View
} from 'react-native';

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
    // this.state = {};
  }
  componentWillMount() {
    this.props.navigation.navigate(this.props.aurh ? 'App' : 'Auth');
  }
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
    console.log(this.props.auth);

    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
};
const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
