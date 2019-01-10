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


export default class Exercises extends Component {
    constructor() {
        super();
        this.numberEx = 0;
        this.exLength = 0;
        this.state = {
            isStart: true,
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

    start() {
        let count = this.state.exercisesTasks[this.numberEx].duration * 6000;
        if (this.state.isStart) {
            setTimeout(() => {
                this.next()
            }, count);
        }
        this.setState({
            isStart: !this.state.isStart
        });
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
        let pictureDir = [];
        switch (this.state.exercises.name) {
            case 'Rozgrzewka':
                pictureDir = [require('./images/R01.png'), require(`./images/R02.png`), require(`./images/R03.png`)];
                break;
            case 'Mięśnie pleców':
                pictureDir = [require('./images/MP01.png'), require(`./images/MP02.png`), require(`./images/MP03.png`)];
                break;
            case 'Triceps':
                pictureDir = [require('./images/T01.png'), require(`./images/T02.png`), require(`./images/T03.png`)];
                break;
            case 'Klatka piersiowa':
                pictureDir = [require('./images/KP01.png'), require(`./images/KP02.png`), require(`./images/KP03.png`)];
                break;
            case 'Barki':
                pictureDir = [require('./images/B01.png'), require(`./images/B02.png`), require(`./images/B03.png`)];
                break;
        }

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
                        <Text style={styles.textOrbitron}>{this.state.exercises.name}</Text>
                        <Image style={{width: width, height: 200, marginHorizontal: 20}}
                               source={pictureDir[this.numberEx]}/>
                        <Text
                            style={[styles.textOrbitron, {fontSize: 20}]}>{this.state.exercisesTasks[this.numberEx].name}</Text>
                        <Text
                            style={[styles.textOrbitron, {fontSize: 14}]}>{this.state.exercisesTasks[this.numberEx].description}</Text>
                        <Text style={[styles.textOrbitron, {fontSize: 14}]}>Ćwiczenie {this.numberEx + 1} z 3</Text>


                        <TouchableOpacity style={[styles.buttons, {width: width}]} onPress={() => this.start()}>
                            {
                                this.state.isStart ? <Text style={styles.textOrbitron}>Start</Text> :
                                    <Text style={styles.textOrbitron}>Stop</Text>
                            }
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                            <TouchableOpacity style={styles.buttons} onPress={() => this.prev()}>
                                <Text style={styles.textOrbitron}>Prev</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttons} onPress={() => this.next()}>
                                <Text style={styles.textOrbitron}>Next</Text>
                            </TouchableOpacity>
                        </View>
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
        width: 180,
        height: 50,
        marginTop: 20,
        borderWidth: 0.5,
        borderRadius: 30,
        borderColor: '#000000',
        backgroundColor: '#896d0d',
        justifyContent: 'center',
        alignItems: 'center',

    },
    textOrbitron: {
        textAlign: 'center',
        fontFamily: 'Orbitron',
        color: '#8186A9',
        fontSize: 30,
    }
});
