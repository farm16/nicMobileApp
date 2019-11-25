import React from 'react';

import config from './config';
console.log(config.API_URL);
console.log(config.ANALYTICS_KEY);

// import {AsyncStorage, ActivityIndicator, StyleSheet, View} from "react-native";

import {Provider} from 'react-redux';
import store from './Redux/store/store';
import AppNavigation from './Navigation/AppNavigation';

const prefix = 'nicapp://';

export default class App extends React.Component {
  render() {
    // if (!this.state.isReady) {
    //   return <AppLoading />;
    // }
    return (
      <Provider store={store}>
        <AppNavigation uriPrefix={prefix} />
      </Provider>
    );
  }
}

// class AuthLoadingScreen extends React.Component {
//   constructor() {
//     super();
//     this._bootstrapAsync();
//   }
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem("userToken");
//     this.props.navigation.navigate(userToken ? "App" : "Auth");
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
