/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
import {Header} from "react-native-elements";

var db = SQLite.openDatabase({name: 'Trening.db', createFromLocation: '1'});

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class Home extends Component<Props> {
    constructor(){
        super();
        this.state = {
            dane:[],
        }
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM test',[],(tx,results)=>{
                console.log("Query completed");

                var tab=[];
                var len = results.rows.length;
                for (let i =0; i<len;i++) {
                    tab[i] = results.rows.item(i);
                    console.log(results.rows.item(i));
                }
                this.setState({dane:tab});

            })
        })
    }
    render() {
        return (

            <LinearGradient colors={['#414867', '#2b324f',]} style={styles.linearGradient}>
                <View style={styles.container}>
                    <Header
                        leftComponent={{
                            icon: 'menu',
                            color: '#D4D4D4',
                        }}
                        centerComponent={{
                            text: 'Home Page',
                            style: { color: '#FFFFFF',fontSize:30}
                        }}
                        rightComponent={{
                            icon:'menu',
                            color: '#D4D4D4',
                        }}
                        backgroundColor='#414867'
                    />
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                    <Text style={styles.instructions}>{instructions}</Text>
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
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});
