import {Navigation} from "react-native-navigation";
import {Dimensions} from 'react-native'
import App from './App';
import Home from './screens/Home';

Navigation.registerComponent('App', () => App);
Navigation.registerComponent('Home', () => Home);


const {width} = Dimensions.get('window');
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait']
        },
        topBar: {
            elevation: 0,
            visible: false,
            drawBehind: true,
            animate: false,
            buttonColor: 'white',
            title: {
                color: 'white',
                alignment: 'center'
            },
            background: {
                color: 'transparent'
            }
        }
    });
    Navigation.setRoot({
        root: {
            sideMenu: {
                left: {
                    component: {
                        id: 'drawerId',
                        name: 'App',
                        fixedWidth: width
                    }
                },
                center: {
                    stack: {
                        id: 'MAIN_STACK',
                        children: [
                            {
                                component: {
                                    name: 'Home',
                                }
                            },
                        ]
                    }
                },
                right: {
                    component: {
                        id: 'drawerId',
                        name: 'App',
                        fixedWidth: width
                    }
                }
            },
        }
    });
});