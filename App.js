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
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';

let db = SQLite.openDatabase({name: 'Trening.db', createFromLocation: '1'});

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
    constructor(){
        super();
        this.exeDay='';
        this.exeMonth='';
        this.exeYear='';
        this.state={
            wynik:[],
        }
        db.transaction((tx)=>{
            tx.executeSql('SELECT * FROM exeDate',[],(tx,results)=>{
                console.log("Query completed");
                var tab=[];
                var len = results.rows.length;
                for (let i =0; i<len;i++) {
                    tab[i] = results.rows.item(i);
                }
                this.exeDay= tab.exeDay;
                this.exeMonth=tab.exeMonth;
                this.exeYear=tab.exeYear;
                this.setState({wynik:tab});

            })
        })
}
    render() {
        let exeData = this.exeDay+'-'+this.exeMonth+'-'+this.exeYear;
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
                        <Text style={styles.welcome}>Welcome to React Native!</Text>
                        <Text style={styles.instructions}>To get started, edit App.js</Text>
                        <Text style={styles.instructions}>{instructions}</Text>

                        {
                            this.state.wynik.map((item,k)=>(
                                <View key={k}>
                                    <Text>{exeData}</Text>
                                    <Text>{item.exeDay}</Text>
                                    <Text>{item.exeMonth}</Text>
                                    <Text>{item.exeYear}</Text>
                                </View>
                            ))
                        }
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
