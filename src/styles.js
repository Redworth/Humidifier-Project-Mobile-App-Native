import { StyleSheet, Dimensions } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: "#ffffff"
    },
    contentMargin: {
        margin: 15,
        marginLeft: 24,
        marginRight: 24
    },
    textInput: {
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        fontFamily: 'Manrope_400Regular',
        padding: 9
    },
    fillButton: {
        alignItems: 'center',
        backgroundColor: "#FE0000",
        padding: 18,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 4,
        borderRadius: 10,
    },
    fillButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold'
    }
});

export const devicesPageStyles = StyleSheet.create({
    fillButton: {
        padding: 15,
        margin: 10,
        marginRight: 5,
        marginLeft: 5,
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 4
        },
        width: Dimensions.get('window').width / 2.1739130435,
        height: Dimensions.get('window').height / 3.5,
        elevation: 24,
        borderRadius: 25,
    }
})

export const activeDeviceStyles = StyleSheet.create({
    infoView: {
        padding: 15,
        margin: 10,
        marginRight: 10,
        marginLeft: 10,
        shadowRadius: 24,
        shadowOffset: {
            width: 0,
            height: 4
        },
        width: '94.66666667%',
        height: '24.630542%',
        elevation: 24,
        borderRadius: 25,
    },
    offButton: {
        alignSelf: 'center',
        alignItems: 'center',
        padding: 18,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 4,
        borderRadius: 10,
        width: '94.66666667%',
        height: Dimensions.get('window').height / 12.4923076923
    },
    offButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold'
    }
})
