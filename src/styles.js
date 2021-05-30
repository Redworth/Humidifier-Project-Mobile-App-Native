import { StyleSheet } from 'react-native'

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
        borderRadius: 10
    },
    fillButtonText: {
        color: '#FFFFFF',
        fontWeight: "bold",
        fontSize: 18
    }
});