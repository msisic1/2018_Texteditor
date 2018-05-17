import React from 'react';
import { View, Text } from 'react-native';

import { Font } from 'expo';

import { Spinner, Container } from 'native-base'

import { EditText } from './components/EditText';
import { Toolbar } from './components/Toolbar';
import { Actionbar } from './components/Actionbar'
import { CustomDrawer } from './components/CustomDrawer'

//import TreeView from '@zaguini/react-native-tree-view'

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
        };

        var drawerIsOpen = false
    }

    async componentDidMount() {
        await Font.loadAsync({
            'VeraMono': require('./res/fonts/VeraMono.ttf'),
            'Inconsolata': require('./res/fonts/Inconsolata.otf')
        });
        this.setState({loaded:true})
    }

    render() {
        if(!this.state.loaded) {
            return (
                <Spinner
                    style = {{ flex: 1, backgroundColor: '#303030' }}
                    color = 'gray'  />
            );
        }
        
        return (
            <Container>
                <Actionbar
                    onPressMenu = {this.onPressMenu.bind(this)}
                    onPressMore = {this.onPressMore.bind(this)} />

                <CustomDrawer
                    ref={(ref) => this._drawer = ref}
                    content={
                        <View
                            style = {{
                                flex:1,
                                backgroundColor: '#2a2a2a',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text>Drawer</Text>
                        </View>
                    }
                    onOpen = {() => this.drawerIsOpen = true}
                    onClose = {() => this.drawerIsOpen = false}
                >
                    <EditText ref = {(ref) => this._editText = ref} />
                    <Toolbar />
                </CustomDrawer>
            </Container>
        );
    }

    onPressMenu(event) {
        this._editText.blur()
        this.drawerIsOpen ? this._drawer.close() : this._drawer.open()
    }

    onPressMore(event) {
        console.log("More")
    }
    
}