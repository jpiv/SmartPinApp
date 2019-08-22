import React from 'react';
import { Asset } from 'expo-asset';
import { StackActions, withNavigation } from 'react-navigation'
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    handlePress() {
        const { navigation } = this.props
        const toWorkout = StackActions.push({ routeName: 'Workout' })
        navigation.dispatch(toWorkout)
    }

    render() {
        const imageSrc = Asset.fromModule(require('../assets/images/dumbbell-solid.png')).uri
        return (
            <View style={ st.container }>
                <Text style={ st.title }>
                    FLEXr
                </Text>
                <View style={ st.logoContainer }>
                    <Image style={ st.logo } source={ { uri: imageSrc } } width={ 180 } height={ 180 } />
                </View>
                <View style={ st.begin }>
                    <Button
                        style={ st.beginText }
                        onPress={ this.handlePress.bind(this) }
                        color="#000"
                        title="Begin Workout"></Button>
                </View>
          </View>
        );
    }

}

const st = StyleSheet.create({
    container: {
        backgroundColor: '#F9D400',
        flex: 1,
        alignItems: 'center',
    },
    title: {
        marginTop: 80,
        fontWeight: 'bold',
        flex: 0,
        textAlign: 'center',
        fontSize: 75,
    },
    logoContainer: {
        marginTop: 55,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    begin: {
        flex: 1,
        marginTop: 90
    },
    beginText: {
        fontSize: 18,
        backgroundColor: '#000',
        color: '#fff'
    }
});

export default withNavigation(HomeScreen)
