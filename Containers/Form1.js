import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { H1, Container, Content } from "native-base";
import HeaderNav from "./HeaderNav";
import Colors from "../assets/Colors";
import Icon from 'react-native-vector-icons/FontAwesome';

import t from "tcomb-form-native"; // 0.6.9
/*  
https://github.com/gcanti/tcomb-form-native#api
https://github.com/gcanti/tcomb-form-native/blob/master/lib/stylesheets/bootstrap.js
https://github.com/gcanti/tcomb-form-native/blob/master/docs/STYLESHEETS.md

// t.form.Form.i18n = {
//   optional: "",
//   required: " (required)" // inverting the behaviour: adding a postfix to the required fields
// };

*/
const Form = t.form.Form;

const User = t.struct({
  firstName: t.String,
  lastName: t.String,
  medicaid: t.String,
  phone: t.String,
  medicare: t.Boolean,
  homecare: t.Boolean,
  transportation: t.Boolean
});
var _ = require("lodash");

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.fieldset.width = "100%";
stylesheet.formGroup.normal.flexDirection = "row";
// stylesheet.formGroup.error.flexDirection = "row";
stylesheet.textboxView.normal.flex = 2;
// stylesheet.textboxView.error.flex = 2;
stylesheet.controlLabel.normal.flex = 1;
// stylesheet.controlLabel.error.flex = 1;
stylesheet.controlLabel.normal.textTransform = "capitalize";
stylesheet.controlLabel.error.textTransform = "capitalize";
stylesheet.formGroup.normal.marginBottom = 20;
stylesheet.formGroup.error.marginBottom = 20;

const options = {
  stylesheet: stylesheet,
  fields: {
    email: {
      // you can use strings or JSX
      error: "Insert a valid email"
    },
    firstName: { error: "Required field!", placeholder: "Required" },
    lastName: { error: "Required field!", placeholder: "Required" },
    medicaid: { error: "Required field!", placeholder: "Required" },
    phone: { error: "Required field!", placeholder: "Required" },
    medicare: { placeholder: "Optional" },
    homeCare: { placeholder: "Optional" },
    transportation: { placeholder: "Optional" }
  }
};
export default class Form1 extends Component {
  static navigationOptions = {
    drawerLabel: () => (
      <Text style={{ color: "#fff", fontSize: 20, marginVertical: 20 }}>Forms</Text>
    ),
    drawerIcon: () => (
      <Icon
        style={
          {
            color: "white",
            fontSize: 25
          }
        }
        name="file-text-o"

      />
    ),
  };
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log("value: ", value);
  };
  render() {
    const open = () => this.props.navigation.openDrawer();
    return (
      <Container>
        <HeaderNav open={open} navTitle={"Referral Form"} />
        <Content>
          <View style={styles.container}>
            <H1 style={styles.h1}>Please complete the form.</H1>
            <Form ref={(c) => (this._form = c)} type={User} options={options} />
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={this.handleSubmit}
            >
              <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  h1: {
    marginVertical: 20
  },
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff"
  },
  btnSubmit: {
    backgroundColor: Colors.mainRed,
    paddingVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  btnText: {
    fontSize: 17,
    fontWeight: "400",
    color: "#fff",
    textAlign: "center"
  }
});
