/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text,TouchableOpacity,TextInput,Picker,PushController, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import * as AppState from "react-native";
import * as PushNotification from "react-native-push-notification";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);

       // this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.state = {
            seconds: 5,
        };
    }

    /*componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange(appState) {
        if (appState === 'background') {
            let date = new Date(Date.now() + (this.state.seconds * 1000));

            if (Platform.OS === 'ios') {
                date = date.toISOString();
            }

            PushNotification.localNotificationSchedule({
                message: "My Notification Message",
                date,
            });
        }
    }*/
    render() {
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(3, 'days')  // total 4 days enabled
        }];
        let datesBlacklist = [ moment().add(-1, 'days') ];
        return (

                <LinearGradient colors={['#414867', '#2b324f',]} style={styles.linearGradient}>
                    <View style={styles.container}>
                        <CalendarStrip
                            daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                            style={{height:150, paddingTop: 20, paddingBottom: 10}}
                            disabledDateNameStyle={{color: '#8186A9'}}
                            disabledDateNumberStyle={{color: '#8186A9'}}
                            datesWhitelist={datesWhitelist}
                            datesBlacklist={datesBlacklist}

                        />
                        <Text style={styles.welcome}>
                            Choose your notification time in seconds.
                        </Text>
                        <Picker
                            style={styles.picker}
                            selectedValue={this.state.seconds}
                            onValueChange={(seconds) => this.setState({ seconds })}
                        >
                            <Picker.Item label="5" value={5} />
                            <Picker.Item label="10" value={10} />
                            <Picker.Item label="15" value={15} />
                        </Picker>

                    </View>
                </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#8186A9'
    },
    instructions: {
        textAlign: 'center',
        color: '#8186A9',
        marginBottom: 5,

    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    buttons: {
        height: 50,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: '#000000',
        backgroundColor: '#366d47',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    textInput:{
        backgroundColor:'#8186A9'
    }
});
