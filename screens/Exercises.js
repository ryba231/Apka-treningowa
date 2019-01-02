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

let db = SQLite.openDatabase({name: 'Trening.db', createFromLocation: '~www/Trening.db'});

const {width} = Dimensions.get('window');
const id = 'c05d1';


export default class Exercises extends Component {
    constructor() {
        super();
        this.numberEx = 0;
        this.exLength = 0;
        this.state = {
            refreshing: false,
            exercises: [],
            exercisesTasks: [{
                name: '',
                description: '',
                duration: 0,
                nameImages: '',
            }],
            description: [],
        };
    }

    componentDidMount() {
        this.downloadFromTheDatabase()

    }

    downloadFromTheDatabase = () => {

        db.transaction((tx) => {
            tx.executeSql(`SELECT *
                           FROM cwiczenia
                           WHERE id = ?`, [this.props.exeId], (tx, results) => {
                this.setState({exercises: results.rows.item(0)});
                this.setState({exercisesTasks: JSON.parse(results.rows.item(0).exe)});
                this.exLength = JSON.parse(results.rows.item(0).exe).length;

            })

        });

    };

    next() {
        this.setState({refreshing: true});
        if (this.numberEx < this.exLength - 1) {
            this.numberEx++
        } else {
            Navigation.push('MAIN_STACK', {
                component: {
                    name: 'SelectPages',
                }
            })
        }
        this.setState({refreshing: false});
    }

    prev() {
        this.setState({refreshing: true});
        if (this.numberEx > 0) {
            this.numberEx--
        } else {
        }
        this.setState({refreshing: false});
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
        let count = this.state.exercisesTasks[this.numberEx].duration * 60000;
        return (
           /* setTimeout(()=>{
               this.next()
            },count),*/
            <LinearGradient colors={['#414867', '#2b324f',]} style={styles.linearGradient}>
                <View style={styles.container}>
                    <Header
                        leftComponent={{
                            icon: 'menu',
                            color: '#8186A9',
                            onPress: () => this.openMenuDrawer(),
                        }}
                        centerComponent={{
                            text: 'Ćwiczenia',
                            style: {color: '#8186A9', fontSize: 30}
                        }}
                        rightComponent={{
                            icon: 'notifications',
                            color: '#8186A9',
                            onPress: () => this.openNotifDrawer(),
                        }}
                        backgroundColor='#414867'
                    />
                    <View style={{alignItems: 'center', marginBottom: 20}}>
                        <Text>{this.numberEx}</Text>
                        <Text>{this.state.exercises.name}</Text>
                        <Text>{this.state.exercisesTasks[this.numberEx].name}</Text>
                        <Text>{this.state.exercisesTasks[this.numberEx].description}</Text>
                        <Text>{this.state.exercisesTasks[this.numberEx].duration}</Text>
                        <Text>{this.state.exercisesTasks[this.numberEx].nameImages}</Text>
                        <Text>{count}</Text>
                        <TouchableOpacity style={styles.buttons} onPress={() => this.next()}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={() => this.prev()}>
                            <Text>Prev</Text>
                        </TouchableOpacity>
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
        width: width,
        height: 50,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: '#000000',
        backgroundColor: '#366d47',
        justifyContent: 'center',
        alignItems: 'center',

    },
});
