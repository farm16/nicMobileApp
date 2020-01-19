import React from 'react';
// import {
//   AsyncStorage,
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   StatusBar,
//   Platform
// } from "react-native";
import { connect } from 'react-redux';
// import { loginEmail, registerGoogle } from '../Redux/actions/actions';
// import { bindActionCreators } from 'redux';

import {
  Image,
  AsyncStorage,
  Linking,
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import { H1, Container, Content, Icon as Icon2 } from 'native-base';
import HeaderNav from './HeaderNav';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  // _bootstrapAsync = async () => {
  //   const userToken = await AsyncStorage.getItem('jwtToken');
  //   console.log(' home here' + userToken);
  // };
  //componentDidMount() {
  //   this.props.navigation.navigate(
  //     this.props.auth.isAuthenticated ? 'App' : 'AuthLoading',
  //   );
  // }

  static navigationOptions = {
    drawerLabel: () => (
      <Text
        style={{ color: '#fff', fontSize: 20, marginVertical: 20 }}
      >
        Home
      </Text>
    ),
    drawerIcon: () => (
      <Icon
        style={{
          color: 'white',
          fontSize: 25,
        }}
        name="home"
      />
    ),
  };
  render() {
    console.log('from HOME PAGE ' + this.props.auth.isAuthenticated);
    const { user } = this.props.auth;
    const open = () => this.props.navigation.openDrawer();
    return (
      <Container>
        <HeaderNav open={open} navTitle={'Home'} />

        <View style={styles.content}>
          <Text style={styles.header}>
            Welcome,{'\n'}{' '}
            {this.props.auth.isAuthenticated ? user.name : null}!
          </Text>
          <View style={styles.avatar}>
            <Image
              source={{ uri: user.avatar }}
              style={styles.avatarImage}
            />
          </View>
          <Text
            style={{
              marginHorizontal: 20,
              fontSize: 15,
              lineHeight: 30,
            }}
          >
            <Text style={{ fontWeight: 'bold' }}>
              INSTRUCTIONS:{'\n'}
            </Text>
            If you want to submit a form, please click on the upper
            button
            {'  '}
            <Icon2 name="menu" />
            {'  '}
            and select "Forms". Also don't forget to fill out the
            required fields.
          </Text>
        </View>
      </Container>
    );
  }
}

const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  avatar: {
    alignItems: 'center',
    margin: 20,
  },
  avatarImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    textTransform: 'capitalize',
  },
  text: {
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  buttons: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
    marginBottom: 30,
  },
  h1: {
    marginVertical: 20,
  },
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  btnSubmit: {
    backgroundColor: Colors.mainRed,
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

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ loginEmail, registerGoogle }, dispatch);
// };

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});

export default connect(mapStateToProps)(HomeScreen);
