import React from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { signUpUser } from '../api.js';
import { styles } from '../styles.js';
import { validEmail, validPassword, validName } from '../validators.js';

export function VerifyScreen({ navigation }) {
    var [emailAddr, changeEmail] = React.useState("")
    var [userPass, changePassword] = React.useState("")
    var [userName, changeName] = React.useState("")

    var [errorShown, setErrorShown] = React.useState(false);
    var [loginMessage, changeLogMessage] = React.useState("hahaha")

    const string1 = "Didn't recieve a code?"
    const string2 = " Resend"

    return (
        <View style={styles.container}>
            <View style={styles.contentMargin}>
                <Image
                    source={require('../../assets/Redworth6(Current)(Transparent).png')}
                    style={{ width: 115, height: 115, alignSelf: 'center' }} />
            </View>
            <View style={styles.contentMargin}>
                <Text style={{ alignSelf: 'center', fontSize: 48 }}>
                    Verify your
                </Text>
                <Text style={{ alignSelf: 'center', fontSize: 48 }}>
                    email.
                </Text>
            </View>
            <View style={styles.contentMargin}>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                    Enter the 6-digit code sent to your
                </Text>
                <Text style={{ alignSelf: 'center', fontSize: 18 }}>
                    email.
                </Text>
            </View>
            <View style={{flexDirection: "row" }}>
                <View style={{marginLeft: 12, marginTop: 15, marginBottom: 15, marginRight: 6}}>
                    <TextInput style={{ borderWidth: 1, width: 48, height: 80, borderRadius: 10 }} />
                </View>
                <View style={{marginLeft: 6, marginTop: 15, marginBottom: 15, marginRight: 6}}>
                    <TextInput style={{ borderWidth: 1, width: 48, height: 80, borderRadius: 10 }} />
                </View>
            </View>
            <View style={styles.contentMargin}>
                <TouchableOpacity
                    style={styles.fillButton}
                    onPress={function () {
                        var emailValidate = validEmail(emailAddr)
                        var passwordValidate = validPassword(userPass)
                        var nameValidate = validName(userName)

                        if (nameValidate != "Ok") {
                            changeLogMessage(nameValidate)
                            setErrorShown(true)
                        }
                        else if (emailValidate != "Ok") {
                            changeLogMessage(emailValidate);
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
                        }
                    }}
                >
                    <Text style={styles.fillButtonText}>Verify</Text>
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
                        <Text style={{ alignSelf: 'center', color: "#ff0000" }}>
                            {loginMessage}
                        </Text>
                    </View>
                ) : null
            }
        </View>
    );
}
