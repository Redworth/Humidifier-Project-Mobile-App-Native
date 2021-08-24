import React from 'react';
import { View, TextInput, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { loginUser } from '../api.js';
import { styles } from '../styles.js';
import { validEmail, validPassword } from '../validators.js';
import { accessGlobalIsLoggedIn } from '../loggedIn';
import { CustomText } from '../customText'

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
                <CustomText style={{ alignSelf: 'center', fontSize: 48 }}>
                    Log In
                </CustomText>
            </View>
            <View style={styles.contentMargin}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changeEmail}
                    value={emailAddr}
                    placeholder=" Email Address"
                    placeholderTextColor='#000000'
                />
            </View>
            <View style={styles.contentMargin}>
                <TextInput
                    style={styles.textInput}
                    onChangeText={changePassword}
                    value={userPass}
                    placeholder=" Password"
                    secureCustomTextEntry={true}
                    placeholderTextColor='#000000'
                />
            </View>
            <View style={styles.contentMargin}>
                <TouchableOpacity style={styles.fillButton}
                    onPress={async function () {
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
                            var res = await loginUser(emailAddr, userPass)
                            if (res != "Ok") {
                                changeLogMessage(res)
                                setErrorShown(true)
                            }
                            else {
                                changeEmail("")
                                changePassword("")
                                setErrorShown(false)
                                accessGlobalIsLoggedIn().setTrue()
                            }
                        }
                    }}>
                    <CustomText style={styles.fillButtonText}>Log In</CustomText>
                </TouchableOpacity>
            </View>
            <View style={styles.contentMargin, { flexDirection: 'row', justifyContent: 'center' }}>
                <CustomText style={{ alignSelf: 'center', fontSize: 18 }}>
                    {string1}
                </CustomText>
                <TouchableOpacity onPress={function () {navigation.goBack()}}>
                    <CustomText style={{ alignSelf: 'center', fontSize: 18, color: "#FE0000" }}>
                        {string2}
                    </CustomText>
                </TouchableOpacity>
            </View>
            {
                errorShown ? (
                    <View style={styles.contentMargin}>
                        <CustomText style={{ alignSelf: 'center', color: "#ff0000"}}>
                            {loginMessage}
                        </CustomText>
                    </View>
                ) : null
            }
        </View>
    );
}
