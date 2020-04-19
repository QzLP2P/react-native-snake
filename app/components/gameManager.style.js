import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    controls: {
        marginTop: 20,
        width: 300,
        height: 300,
    },
    controlRow: {
        flexDirection: 'row',
        width: 300,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    control: {
        backgroundColor: 'green',
        width: 100,
        height: 100,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    }
});

export default styles;