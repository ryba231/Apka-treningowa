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

let db = SQLite.openDatabase({name: 'Trening.db', createFromLocation: '1'});

const {width} = Dimensions.get('window');

export default class selectPages extends Component {
    constructor() {
        super();
        this.state = {
            description:[],
        };
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM exercisesDetails',[],(tx,results)=>{
                console.log("Query completed");
                var tab=[];
                var len = results.rows.length;
                for (let i =0; i<len;i++) {
                    tab[i] = results.rows.item(i);
                }
                this.setState({description:tab});

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
                            text: 'Wybór',
                            style: {color: '#8186A9', fontSize: 30}
                        }}
                        rightComponent={{
                            icon: 'notifications',
                            color: '#8186A9',
                            onPress: () => this.openNotifDrawer(),
                        }}
                        backgroundColor='#414867'
                    />
                        <ScrollView>
                            {
                                this.state.description.map((item, k) => (
                                    <TouchableOpacity key={k} style={styles.title}>
                                        <View style={{margin: 3}}>
                                            <Text>{item.id}</Text>
                                            <Text>{item.name}</Text>
                                            <Text>{item.description}</Text>
                                            <Text>{item.level}</Text>
                                            <Text>{item.numberOfExercises}</Text>
                                        </View>
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
});
