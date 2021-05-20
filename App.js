import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, View, TextInput, Text } from 'react-native';
import { loginUser } from './src/api.js';
import { styles } from './src/styles.js';
import { validEmail, validPassword, validName } from './src/validators.js';

export default function App() {
  var [emailAddr, changeEmail] = React.useState("")
  var [userPass, changePassword] = React.useState("")
  var [userName, changeName] = React.useState("")

  var [loginMessage, changeLogMessage] = React.useState("")

  return (
    <View style={styles.container}>
      <View style={styles.contentMargin}>
        <Text style={{ alignSelf: 'center', fontSize: 30, fontWeight: 'bold' }}>
          Sign Up!
        </Text>
      </View>
      <View style={styles.contentMargin}>
        <TextInput
          style={styles.textInput}
          onChangeText={changeName}
          value={userName}
          placeholder=" Name"
        />
      </View>
      <View style={styles.contentMargin}>
        <TextInput
          style={styles.textInput}
          onChangeText={changeEmail}
          value={emailAddr}
          placeholder=" Email Address"
        />
      </View>
      <View style={styles.contentMargin}>
        <TextInput
          style={styles.textInput}
          onChangeText={changePassword}
          value={userPass}
          placeholder=" Password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.contentMargin}>
        <Button
          title="Sign Up"
          onPress={function () {
            var emailValidate = validEmail(emailAddr)
            var passwordValidate = validPassword(userPass)
            var nameValidate = validName(userName)

            if (nameValidate != "Ok") {
              changeLogMessage(nameValidate)
            }
            else if (emailValidate != "Ok") {
              changeLogMessage(emailValidate);
            }
            else if (passwordValidate != "Ok") {
              changeLogMessage(passwordValidate)
            }
            else {
              loginUser(userName, emailAddr, userPass)
              changeEmail("")
              changePassword("")
              changeName("")
              changeLogMessage("")
            }
          }}
        />
      </View>
      <View style={styles.contentMargin}>
        <Text style={{ alignSelf: 'center', color: "#ff0000"}}>
          {loginMessage}
        </Text>
      </View>
    </View>
  );
}
