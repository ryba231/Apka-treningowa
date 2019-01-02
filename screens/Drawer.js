/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SQLite from 'react-native-sqlite-storage';
import {Header} from "react-native-elements";
import {Navigation} from "react-native-navigation";

const {width} = Dimensions.get('window');

export default class Drawer extends Component {
    goToScreen = (screenName, id) => {
        Navigation.setStackRoot('MAIN_STACK', {
            component: {
                name: screenName,
                passProps: {
                    testId: id,
                },
            }
        }),
            Navigation.mergeOptions('menuDrawer', {
                sideMenu: {
                    left: {
                        visible: false
                    }
                }
            });
    };


    render() {
        return (

            <LinearGradient colors={['#414867', '#2b324f',]} style={styles.linearGradient}>
                <View style={styles.container}>
                    <ScrollView style={{padding:20,}}>
                        <TouchableOpacity style={styles.buttons} onPress={() => this.goToScreen
                        ('Home')}><Text style={styles.textColor}>Home Page</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => this.goToScreen
                        ('SelectPages')}><Text style={styles.textColor}>Wybór</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.buttons}><Text style={styles.textColor}>Ćwiczenia</Text></TouchableOpacity>

                    </ScrollView>
                </View>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    linearGradient: {
        flex: 1,
    },
    title: {
        marginHorizontal: 10,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        width: width - 20,
        borderColor: '#e5e5e5'
    },
    buttons: {
        width: width - 80,
        height: 50,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: '#000000',
        backgroundColor: '#366d47',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textColor: {
        color: '#FFFFFF',
    }
});
