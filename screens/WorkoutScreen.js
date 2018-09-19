import React from 'react';
import {
    ScrollView,
    BackHandler,
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { StackActions, withNavigation } from 'react-navigation'
import leftPad from 'left-pad'
import Nfc from 'react-native-nfc-manager'

class WorkoutScreen extends React.Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props)
        this.backListener = null
        this.state = {
            time: 0
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        const back = StackActions.push({ routeName: 'Home' })
        this.backListener = BackHandler.addEventListener('hardwareBackPress', () => navigation.dispatch(back))
        setInterval(() => {
            const { time } = this.state
            this.setState({ time: time + 1 })
        }, 1000)
        this.startNFC()
    }

    componentWillUnmount() {
        this.backListener.remove()
    }

    handleTag(tag) {
        const { navigation } = this.props
        const toExercise = StackActions.push({ routeName: 'Exercise' })
        navigation.dispatch(toExercise)
    }

    startNFC() {
        Nfc.start()
            .then(() => console.log('NFC loaded successfully!'))
            .then(() => Nfc.registerTagEvent(this.handleTag.bind(this)))
            .catch(err => console.log('NFC failed to load.', err))
    }

    render() {
        const { time } = this.state
        const timeStr = `${ leftPad(Math.floor(time / 60), 2, 0) }:${ leftPad(time % 60, 2, 0) }`
        return (
            <View style={ st.container }>
                <Text style={ st.timer }>
                    { timeStr }
                </Text>
                <Text style={ st.caption }>
                    Tap Flex pin or manually add workout
                </Text>
            </View>
        );
    }
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#F9D400',
    },
    caption: {
        fontStyle: 'italic',
        fontSize: 16,
        textAlign: 'center',
    },
    timer: {
        textAlign: 'center',
        height: 115,
        textAlignVertical: 'center',
        fontSize: 44,
        borderWidth: 2,
        borderColor: '#000'
    }
});

export default withNavigation(WorkoutScreen)
