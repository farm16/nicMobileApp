import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../Redux/actions/actions';
import { bindActionCreators } from 'redux';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { H1, Container, Content, Icon as Icon2 } from 'native-base';
import {
  createDrawerNavigator,
  DrawerItems,
} from 'react-navigation-drawer';
import { StackActions, NavigationActions } from 'react-navigation';

import HomeScreen from './HomeScreen';
import Form1 from './Form1';
import Colors from '../assets/Colors';
import Logout from './Logout';
import { Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderNav from './HeaderNav';

// import AppDrawerNavigator from "./Containers/DrawerContainer";

// _signOutAsync = async () => {
//   await AsyncStorage.clear();
//   this.props.navigation.navigate("Auth");
// };
//${props.auth ? props.auth.user.name.split(" ")[0] : ""}`}
const CustomDrawerComponent = props => {
  // console.log("from drawer=> " + JSON.stringify(props.auth))
  // !props.auth.isAuthenticated ? props.navigation.navigate('Auth') : null
  return (
    <SafeAreaView
      style={{
        backgroundColor: `${Colors.mainRed}`,
        flex: 1,
        justifyContent: 'space-evenly',
      }}
    >
      <View
        style={{
          padding: 15,
          height: 150,
          flex: 1,
        }}
      >
        <Text style={styles.titleText}>{'north'.toUpperCase()} </Text>
        <Text style={styles.titleText}>
          {'insurance'.toUpperCase()}
        </Text>
        <Text style={styles.titleText}>
          {'consulting'.toUpperCase()}
        </Text>
        <Text style={styles.greetingText}>
          {`Welcome,\n${
            props.auth.isAuthenticated
              ? props.auth.user.name.split(' ')[0]
              : null
          }`}{' '}
        </Text>
      </View>
      <ScrollView>
        <DrawerItems {...props}></DrawerItems>
      </ScrollView>
    </SafeAreaView>
  );
};
// <Text onPress={props.logoutUser} style={styles.btnText}>Log Out</Text>

// class LogOut extends React.Component {
//   static navigationOptions = {
//     drawerLabel: () => (
//       <Text
//         style={{ color: '#fff', fontSize: 20, marginVertical: 20 }}
//       >
//         Log Out
//       </Text>
//     ),
//     drawerIcon: () => (
//       <Icon
//         style={{
//           color: 'white',
//           fontSize: 25,
//         }}
//         name="arrow-circle-left"
//       />
//     ),
//   };

//   logoutNow = () => {
//     //async await AsyncStorage.clear();
//     this.props.logoutUser();
//     this.props.navigation.navigate('AuthLoading');
//   };
//   render() {
//     const open = () => this.props.navigation.openDrawer();
//     return (
//       <Container>
//         <HeaderNav open={open} navTitle={'Home'} />
//         <View style={styles.content}>
//           <Text style={styles.header}>
//             Are you sure you wan to log out?
//           </Text>
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={this.logoutNow}
//             // onPress={() => this.props.loginEmail(this.props.navigation)}
//           >
//             <Text style={styles.btnText}>Yes</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               this.props.navigation.navigate('Home');
//             }}
//             // onPress={() => this.props.loginEmail(this.props.navigation)}
//           >
//             <Text style={styles.btnText}>No</Text>
//           </TouchableOpacity>
//         </View>
//       </Container>
//     );
//   }
// }

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
});

// const Logout = connect(mapStateToProps, { logoutUser })(LogOut);
const Drawer = connect(mapStateToProps)(CustomDrawerComponent);

export default AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Form1: Form1,
    Logout: Logout,
  },
  {
    contentComponent: Drawer,
    hideStatusBar: true,
  },
);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: `${Colors.mainRed}`,
    paddingVertical: 10,
    width: '70%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    marginHorizontal: 20,
  },
  titleText: {
    fontWeight: '400',
    fontSize: 30,
    color: `${Colors.drawerWhite}`,
  },
  greetingText: {
    fontWeight: '400',
    fontSize: 20,
    color: `${Colors.drawerWhite}`,
    textTransform: 'capitalize',
    marginVertical: 15,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: 20,
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
