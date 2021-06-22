import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { loginUser } from '../api.js';
import { styles } from '../styles.js';
import { validEmail, validPassword } from '../validators.js';

export function LoginScreen({navigation}) {
    var [emailAddr, changeEmail] = React.useState("")
    var [userPass, changePassword] = React.useState("")
    var [userName, changeName] = React.useState("")

    var [errorShown, setErrorShown] = React.useState(false);
    var [loginMessage, changeLogMessage] = React.useState("")

    const string1 = "Need an account?"
    const string2 = " Sign Up"

    return (
        <View style={styles.container}>
            <View style={styles.contentMargin}>
                <Image
                    source={require('../../assets/Redworth6(Current)(Transparent).png')}
                    style={{ width: 115, height: 115, alignSelf: 'center' }} />
            </View>
            <View style={styles.contentMargin}>
                <Text style={{ alignSelf: 'center', fontSize: 48 }}>
                    Log In
                </Text>
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
                <TouchableOpacity style={styles.fillButton}
                    onPress={function () {
                        var passwordValidate = validPassword(userPass)
                        var emailValidate = validEmail(emailAddr)

                        if (emailValidate != "Ok") {
                            changeLogMessage(emailValidate);
                            setErrorShown(true)
                        }
                        else if (passwordValidate != "Ok") {
                            changeLogMessage(passwordValidate)
                            setErrorShown(true)
                        }
                        else {
                            loginUser(emailAddr, userPass)
                            changeEmail("")
                            changePassword("")
                            setErrorShown(False)
                        }
                    }}>
                    <Text style={styles.fillButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentMargin, { flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                    {string1}
                </Text>
                <TouchableOpacity onPress={function () {navigation.goBack()}}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, color: "#FE0000" }}>
                        {string2}
                    </Text>
                </TouchableOpacity>
            </View>
            {
                errorShown ? (
                    <View style={styles.contentMargin}>
                        <Text style={{ alignSelf: 'center', color: "#ff0000" }}>
                            {loginMessage}
                        </Text>
                    </View>
                ) : null
            }
        </View>
    );
}