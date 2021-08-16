import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { signUpUser } from '../api.js';
import { styles } from '../styles.js';
import { validEmail, validPassword, validName, availName } from '../validators.js';
import { accessGlobalIsLoggedIn } from '../loggedIn';

export function SignUpScreen({ navigation }) {
    var [emailAddr, changeEmail] = React.useState("")
    var [userPass, changePassword] = React.useState("")
    var [userName, changeName] = React.useState("")

    var [errorShown, setErrorShown] = React.useState(false);
    var [loginMessage, changeLogMessage] = React.useState("hahaha")

    const string1 = "Already have an account?"
    const string2 = " Log In"

    return (
        <View style={styles.container}>
            <View style={styles.contentMargin}>
                <Image
                    source={require('../../assets/Redworth6(Current)(Transparent).png')}
                    style={{ width: 115, height: 115, alignSelf: 'center' }} />
            </View>
            <View style={styles.contentMargin}>
                <Text style={{ alignSelf: 'center', fontSize: 48 }}>
                    Sign Up!
                </Text>
            </View>
            <View style={styles.contentMargin}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeName}
                    value={userName}
                    placeholder=" Username"
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
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={async function () {
                        var emailValidate = validEmail(emailAddr)
                        var passwordValidate = validPassword(userPass)
                        var nameValidate = validName(userName)
                        var availValidate = await availName(userName)
                        
                        if (nameValidate != "Ok") {
                            changeLogMessage(nameValidate)
                            setErrorShown(true)
                        }
                        else if (availValidate != "Ok") {
                            changeLogMessage(availValidate)
                            setErrorShown(true)
                        }
                        else if (emailValidate != "Ok") {
                            changeLogMessage(emailValidate)
                            setErrorShown(true)
                        }
                        else if (passwordValidate != "Ok") {
                            changeLogMessage(passwordValidate)
                            setErrorShown(true)
                        }
                        else {
                            signUpUser(userName, emailAddr, userPass)
                            changeEmail("")
                            changePassword("")
                            changeName("")
                            changeLogMessage("")
                            setErrorShown(false)
                            accessGlobalIsLoggedIn().setTrue()
                        }
                    }}
                >
                    <Text style={styles.fillButtonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentMargin, { flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                    {string1}
                </Text>
                <TouchableOpacity onPress={function () { navigation.push('Login') }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, color: "#FE0000" }}>
                        {string2}
                    </Text>
                </TouchableOpacity>
            </View>
            {
                errorShown ? (
                    <View style={styles.contentMargin}>
                        <Text style={{ alignSelf: 'center', color: "#ff0000"}}>
                            {loginMessage}
                        </Text>
                    </View>
                ) : null
            }
        </View>
    );
}
