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
//const url = 'http://192.168.43.72:3000/';
const url = 'http://192.168.0.2:3000/';

const menu = [{"id":"SelectPages","name":"Ćwiczenia"},{"id":"","name":"coś tam będzie"},{"id":"","name":"coś tam będzie"},{"id":"","name":"coś tam będzie"},{"id":"","name":"coś tam będzie"},
    {"id":"","name":"coś tam będzie"},{"id":"","name":"coś tam będzie"},{"id":"","name":"coś tam będzie"},];

const {width} = Dimensions.get('window');

export default class Home extends Component {
    constructor() {
        super()
        this.state = {
            wynik: [],
        }


    }

    async componentDidMount() {
        this.downloadData();

    }

    downloadData = () => {
        fetch(url+'exercises')
            .then(response => response.json())
            .then(data => {
                this.setState({wynik: data});
                this.addToDatabase(data);
                this.downloadExercises();
            })
            .catch(error => console.log(error));

    };

    addToDatabase = (data) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM exercisesDetails');
            tx.executeSql('DELETE FROM cwiczenia');
            console.log(data)
            data.map((item, k) => (
                tx.executeSql(`INSERT INTO exercisesDetails (id,name,description,level,numberOfExercises) VALUES
                  ('${data[k].id}','${data[k].name}','${data[k].description}','${data[k].level}',${data[k].numberOfExercises});`)
            ));
        });
    };

    downloadExercises = () => {
        this.state.wynik.map((item, k) => (
                fetch(url+item.id)
                    .then(response => response.json())
                    .then(dane => {
                        console.log(dane)
                        db.transaction((tx) => {
                            tx.executeSql(`INSERT INTO cwiczenia (id,name,description,level,exe) VALUES
                             ('${dane.id}','${dane.name}','${dane.description}','${dane.level}','${JSON.stringify(dane.exercises)}');`)
                            console.log('Query complete')
                        })
                    })
                    .catch(error => console.log(error))
        ))
    };

    goToScreen = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
            }
        })
    };


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
                    <Image style={{width: width, height: 160,marginTop: 20}}
                           source={require('./images/B01.png')}/>
                        <ScrollView>
                            {
                                menu.map((item,k)=>(
                                    <TouchableOpacity key={k} style={styles.buttons} onPress={()=>this.goToScreen(item.id)}>
                                        <Text>{item.name}</Text>
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
    title: {
        marginHorizontal: 10,
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 0.5,
        width: width - 20,
        borderColor: '#e5e5e5'
    },
    linearGradient: {
        flex: 1,
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
    textColor: {
        color: '#FFFFFF',
    }



});
