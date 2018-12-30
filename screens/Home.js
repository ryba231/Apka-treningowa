/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
import {Header} from "react-native-elements";
import {Navigation} from "react-native-navigation";

var db = SQLite.openDatabase({name: 'Trening.db', createFromLocation: '1'});

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

const {width} = Dimensions.get('window');

type Props = {};
export default class Home extends Component<Props> {
    constructor() {
        super();
        this.state = {
            dane: [],
        }
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM test', [], (tx, results) => {
                console.log("Query completed");

                var tab = [];
                var len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    tab[i] = results.rows.item(i);
                    console.log(results.rows.item(i));
                }
                this.setState({dane: tab});

            })
        })
    }

    openMenuDrawer = () => {
        Navigation.mergeOptions('menuDrawer', {
            sideMenu: {
                left: {
                    visible: true
                }
            }
        });
    };
    openNotifDrawer = () => {
        Navigation.mergeOptions('notifMenu', {
            sideMenu: {
                right: {
                    visible: true
                }
            }
        });
    };

    render() {
        return (

            <LinearGradient colors={['#414867', '#2b324f',]} style={styles.linearGradient}>
                <View style={styles.container}>
                    <Header
                        leftComponent={{
                            icon: 'menu',
                            color: '#8186A9',
                            onPress: () => this.openMenuDrawer(),
                        }}
                        centerComponent={{
                            text: 'Home Page',
                            style: {color: '#8186A9', fontSize: 30}
                        }}
                        rightComponent={{
                            icon: 'notifications',
                            color: '#8186A9',
                            onPress: () => this.openNotifDrawer(),
                        }}
                        backgroundColor='#414867'
                    />
                    <View style={{alignItems: 'center'}}>
                        <Image style={{width: width, height: 160,}}
                               source={require('./images/deska.png')}/>
                        <Text style={styles.welcome}>Welcome to React Native!</Text>
                        <Text style={styles.instructions}>To get started, edit App.js</Text>
                        <Text style={styles.instructions}>{instructions}</Text>
                    </View>
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
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
