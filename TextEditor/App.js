import React from 'react';
import { createStackNavigator  } from 'react-navigation';

import { MainScreen } from './screens/MainScreen'
import { HelpScreen } from './screens/HelpScreen'

const StackNavigator = createStackNavigator(
    {
        Main: MainScreen,
        Help: HelpScreen
    },
    {
        initialRouteName: 'Main',
        headerMode: 'none',
    }
);

export default class App extends React.Component {
    render() {
        return <StackNavigator />
    }
}