import { getStatusBarHeight } from 'react-native-status-bar-height';

module.exports = {
    // btn: {
    //     width: '80%',
    //     height: 50,
    //     backgroundColor: 'white',
    //     borderRadius: 10,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 10,
    //     margin: 10,
    //     marginBottom: 80,
    // },
    hr80: {
        width: '80%',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        marginVertical: 20
    },
    colors: {
        buttons: "#ff8c52",
        grey: "#bebebe",
        grey1: '#43484d',
        grey2: '#5e6977',
        grey3: '#86939e',
        grey4: '#bdc6cf',
        grey5: '#e1e8ee',
        grey6: "#eeeeee",
        grey7: "#F2f9f9",
        grey10: "#d6d6d6",
        CardComment: '#86939e',
        cardbackground: "white",
        statusbar: "#ff8c52",
        heaherText: "white",
        lightgreen: '#66DF48',
        blue: '#286ef0',
        black: "#000000",
        white: "#ffffff",
        darkBlue: "#2d328a",
        pagebackground: "white",
        red: "#fe0000"
    },
    parameters: {
        statusBarHeight: getStatusBarHeight(),
        headerHeight: 70,

        styledButton: {
            backgroundColor: "#ff8c52",
            alignContent: "center",
            justifyContent: "center",
            borderRadius: 12,
            borderWidth: 1,
            borderColor: "#ff8c52",
            height: 50,
            paddingHorizontal: 20,
            width: '100%'
        },

        buttonTitle: {
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -3
        }
    },
    title: {
        color: "#ff8c52",
        fontSize: 20,
        fontWeight: "bold"
    },
    inputContainer: {
        flexDirection: 'row',
        width: '70%',
        marginVertical: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        borderColor: 'grey',
        elevation: 10
    },
    btn: {
        width: '60%',
        height: 70,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        margin: 10,
        marginVertical: 40,
        padding: 20
    },
    text: {
        color: 'white',
        fontSize: 20,
        // fontFamily: 'Inter_900Black'
    },
    btn2: {
        width: '30%',
        height: 50,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        margin: 10,
        marginTop: 20
    },
}