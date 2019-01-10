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
const menu = [{"id":"Home","name":"Home Page"},{"id":"SelectPages","name":"Ćwiczenia"}];
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
                    <Text style={[styles.textOrbitron,{fontSize:40}]}>Aplikacja Treningowa</Text>
                    <ScrollView style={{padding:20,}}>
                        {
                            menu.map((item,k)=>(
                                <TouchableOpacity key={k} style={styles.buttons} onPress={()=>this.goToScreen(item.id)}>
                                    <Text style={[styles.textOrbitron,{fontSize:20}]}>{item.name}</Text>
                                </TouchableOpacity>
                            ))
                        }

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
        width: width - 105,
        height: 50,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: '#000000',
        backgroundColor: '#896d0d',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textColor: {
        color: '#FFFFFF',
    },
    textOrbitron:{
        textAlign: 'center',
        fontFamily:'Orbitron',
        color:'#8186A9'
    }
});
